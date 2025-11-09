import type { CreateTextParams } from "../../shared/types/params/create/create-text.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { CreateTextParamsSchema } from "../../shared/types/params/create/create-text.js";

export function createText(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-text",
        "Create a text.",
        CreateTextParamsSchema.shape,
        async (params: CreateTextParams) => {
            return await safeToolProcessor<CreateTextParams>(
                taskManager.runTask("create-text", params)
            );
        }
    );
}   