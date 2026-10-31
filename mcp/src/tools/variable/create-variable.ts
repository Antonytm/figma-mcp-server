import type { CreateVariableParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { CreateVariableParamsSchema } from "../../shared/types/index.js";

export function createVariable(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-variable",
        "Create a design token (variable) in a collection and set its value per mode. COLOR values take RGBA hex strings; modes may be referenced by name or id.",
        CreateVariableParamsSchema.shape,
        async (params: CreateVariableParams) => {
            return await safeToolProcessor<CreateVariableParams>(
                taskManager.runTask("create-variable", params)
            );
        }
    );
}
