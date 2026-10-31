import type { DeleteVariableParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { DeleteVariableParamsSchema } from "../../shared/types/index.js";

export function deleteVariable(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "delete-variable",
        "Delete a variable by id, or an entire variable collection by id.",
        DeleteVariableParamsSchema.shape,
        async (params: DeleteVariableParams) => {
            return await safeToolProcessor<DeleteVariableParams>(
                taskManager.runTask("delete-variable", params)
            );
        }
    );
}
