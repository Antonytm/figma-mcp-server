import type { FromPluginMessage } from "@shared/types";
import type { Server } from "socket.io";

type SocketMessage = "start-task" | "task-finished" | "task-failed";

// Socket manager is the abstraction layer on the top of the socket.io library.
// It receives messages from the Figma plugin and raises events for the orchestrator to handle.
// It also send messages to the Figma plugin.
export class SocketManager {
    constructor(server: Server) {
        this.server = server;

        this.server.on('connection', (socket) => {
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
