import { safeToolProcessor } from "../safe-tool-processor.js";
import { DeleteNodeParamsSchema, type DeleteNodeParams } from "../../shared/types/index.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";

export function deleteNode(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "delete-node",
        "Delete a node.",
        DeleteNodeParamsSchema.shape,
        async (params: DeleteNodeParams) => {
            return await safeToolProcessor<DeleteNodeParams>(
                taskManager.runTask("delete-node", params)
            );
        }
    );
}   