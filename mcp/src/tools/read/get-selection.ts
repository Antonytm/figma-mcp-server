import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { TaskManager } from "../../task-manager.js";
import { generateUUID } from "../../utils.js";

export function getSelection(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "get-selection",
        "Get the current selection in Figma.",
        {},
        async () => {
            const result = await taskManager.runTask("get-selection", {});
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result)
                }],
                isError: false
            }  as CallToolResult;
        }
    );
}