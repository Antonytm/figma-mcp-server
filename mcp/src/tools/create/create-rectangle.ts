import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateRectangleParamsSchema, type CreateRectangleParams } from "../../shared/types/index.js";

export function createRectangle(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-rectangle",
        "Create a rectangle.",
        CreateRectangleParamsSchema.shape,
        async (params: CreateRectangleParams) => {
            return await safeToolProcessor<CreateRectangleParams>(
                taskManager.runTask("create-rectangle", params)
            );
        }
    )
}