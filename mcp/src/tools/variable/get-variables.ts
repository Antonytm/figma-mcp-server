import type { GetVariablesParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { GetVariablesParamsSchema } from "../../shared/types/index.js";

export function getVariables(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "get-variables",
        "List all local variable collections and variables in the file, with their ids, modes and values.",
        GetVariablesParamsSchema.shape,
        async (params: GetVariablesParams) => {
            return await safeToolProcessor<GetVariablesParams>(
                taskManager.runTask("get-variables", params)
            );
        }
    );
}
