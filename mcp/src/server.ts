import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { config } from "node:process";
import z from "zod";
import type { Config } from "./config.js";
import * as fs from "fs";
import * as path from "path";
import { TaskManager } from "./task-manager.js";
import type { Server, Socket } from "socket.io";
import { SocketManager } from "./socket-manager.js";
import { Orchestrator } from "./orchestrator.js";
import { getSelection } from "./tools/read/get-selection.js";
import { getNodeInfo } from "./tools/read/get-node-info.js";
import { createRectangle } from "./tools/create/create-rectangle.js";
import { moveNode } from "./tools/update/move-node.js";
import { resizeNode } from "./tools/update/resize-node.js";
import { deleteNode } from "./tools/delete/delete-node.js";
import { cloneNode } from "./tools/create/clone-node.js";
import { createFrame } from "./tools/create/create-frame.js";
import { createText } from "./tools/create/create-text.js";

export async function getServer(server: Server): Promise<McpServer> {

    const taskManager = new TaskManager();
    const socketManager = new SocketManager(server);
    const orchestrator = new Orchestrator(socketManager, taskManager);

    const mcpServer = new McpServer({
        name: `MCP Server for Figma`,
        description: "Model Context Protocol Server for Figma",
        version: "0.1.1",
    });

    // Register tools

    // Create tools
    createRectangle(mcpServer, taskManager);
    cloneNode(mcpServer, taskManager);
    createFrame(mcpServer, taskManager);
    createText(mcpServer, taskManager);
    // Read tools
    getSelection(mcpServer, taskManager);
    getNodeInfo(mcpServer, taskManager);

    // Update tools
    moveNode(mcpServer, taskManager);
    resizeNode(mcpServer, taskManager);

    // Delete tools
    deleteNode(mcpServer, taskManager);

    return mcpServer;
}
