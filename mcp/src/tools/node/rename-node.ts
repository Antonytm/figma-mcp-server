import type { RenameNodeParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { RenameNodeParamsSchema } from "../../shared/types/index.js";

export function renameNode(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "rename-node",
        "Rename any node (change its layer name).",
        RenameNodeParamsSchema.shape,
        async (params: RenameNodeParams) => {
            return await safeToolProcessor<RenameNodeParams>(
                taskManager.runTask("rename-node", params)
            );
        }
    );
}
