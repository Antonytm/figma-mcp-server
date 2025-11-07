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

    // Read tools
    getSelection(mcpServer, taskManager);
    getNodeInfo(mcpServer, taskManager);

    return mcpServer;
}