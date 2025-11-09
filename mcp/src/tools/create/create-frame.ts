import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateFrameParamsSchema, type CreateFrameParams } from "../../shared/types/index.js";

export function createFrame(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-frame",
        "Create a frame.",
        CreateFrameParamsSchema.shape,
        async (params: CreateFrameParams) => {
            return await safeToolProcessor<CreateFrameParams>(
                taskManager.runTask("create-frame", params)
            );
        }
    );
}