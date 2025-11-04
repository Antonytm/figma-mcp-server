import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { config } from "node:process";
import z from "zod";
import type { Config } from "./config.js";
import * as fs from "fs";
import * as path from "path";

export async function getServer(config: Config): Promise<McpServer> {
    const server = new McpServer({
        name: `MCP Server for Figma`,
        description: "Model Context Protocol Server for Figma",
        version: "0.1.0",
    });

    return server;
}