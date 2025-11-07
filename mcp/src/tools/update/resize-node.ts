import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { ResizeNodeParamsSchema, type ResizeNodeParams } from "../../shared/types/index.js";

export function resizeNode(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "resize-node",
        "Resize a node.",
        ResizeNodeParamsSchema.shape,
        async (params: ResizeNodeParams) => {
            return await safeToolProcessor<ResizeNodeParams>(
                taskManager.runTask("resize-node", params)
            );
        }
    );
}