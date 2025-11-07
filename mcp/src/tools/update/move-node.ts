import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { MoveNodeParamsSchema, type MoveNodeParams } from "../../shared/types/index.js";

export function moveNode(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "move-node",
        "Move a node.",
        MoveNodeParamsSchema.shape,
        async (params: MoveNodeParams) => {
            return await safeToolProcessor<MoveNodeParams>(
                taskManager.runTask("move-node", params)
            );
        }
    );
}