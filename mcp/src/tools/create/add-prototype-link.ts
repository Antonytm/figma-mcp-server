import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { AddPrototypeLinkParamsSchema, type AddPrototypeLinkParams } from "../../shared/types/index.js";

export function addPrototypeLink(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "add-prototype-link",
        "Add a prototype interaction (click to navigate) between two nodes.",
        AddPrototypeLinkParamsSchema.shape,
        async (params: AddPrototypeLinkParams) => {
            return await safeToolProcessor<AddPrototypeLinkParams>(
                taskManager.runTask("add-prototype-link", params)
            );
        }
    );
}
