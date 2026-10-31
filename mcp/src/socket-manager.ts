import type { FromPluginMessage } from "@shared/types";
import type { Server, Socket } from "socket.io";

type SocketMessage = "start-task" | "task-finished" | "task-failed";

// Socket manager is the abstraction layer on the top of the socket.io library.
// It receives messages from the Figma plugin and raises events for the orchestrator to handle.
// It also send messages to the Figma plugin.
export class SocketManager {
    constructor(server: Server) {
        this.server = server;

        // Attach to sockets that are ALREADY connected as well as future ones.
        //
        // Each MCP session builds its own SocketManager. Previously the
        // task-finished/task-failed listeners were only registered from inside
        // server.on('connection'), which fires exclusively for sockets that
        // connect *after* construction. If the Figma plugin was already
        // connected when a new MCP session started, that session broadcast
        // start-task (server.emit reaches every socket) but never listened for
        // the reply, so the task promise hung forever. Binding existing sockets
        // here makes the plugin/server/client startup order irrelevant.
        this.server.sockets.sockets.forEach((socket) => this.bind(socket));
        this.server.on('connection', (socket) => this.bind(socket));
    }

    private bind(socket: Socket) {
        socket.on('task-finished', (data: FromPluginMessage) => {
            try {
                if (this._onTaskFinishedCallback) {
                    this._onTaskFinishedCallback(data);
                }
            } catch (error) {
                console.error('Error in task-finished handler:', error);
            }
        });

        socket.on('task-failed', (data: FromPluginMessage) => {
            try {
                if (this._onTaskErrorCallback) {
                    this._onTaskErrorCallback(data);
                }
            } catch (error) {
                console.error('Error in task-failed handler:', error);
            }
        });
    }

    public sendMessage(message: SocketMessage, data: any) {
        this.server.emit(message, data);
    }

    private server: Server;

    // Events

    private _onTaskFinishedCallback?: (task: FromPluginMessage) => void;

    public onTaskFinished(callback: (task: FromPluginMessage) => void) {
        this._onTaskFinishedCallback = callback;
    }

    private _onTaskErrorCallback?: (task: FromPluginMessage) => void;
    public onTaskError(callback: (task: FromPluginMessage) => void) {
        this._onTaskErrorCallback = callback;
    }

}
