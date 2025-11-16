import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateInstanceParamsSchema, type CreateInstanceParams } from "../../shared/types/index.js";

export function createInstance(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-instance",
        "Create a instance.",
        CreateInstanceParamsSchema.shape,
        async (params: CreateInstanceParams) => {
            return await safeToolProcessor<CreateInstanceParams>(
                taskManager.runTask("create-instance", params)
            );
        }
    );
}