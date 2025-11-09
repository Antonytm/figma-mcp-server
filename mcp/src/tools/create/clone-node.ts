import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CloneNodeParamsSchema, type CloneNodeParams } from "../../shared/types/index.js";

export function cloneNode(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "clone-node",
        "Clone a node.",
        CloneNodeParamsSchema.shape,
        async (params: CloneNodeParams) => {
            return await safeToolProcessor<CloneNodeParams>(
                taskManager.runTask("clone-node", params)
            );
        }
    );
}