import type { BindVariableParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { BindVariableParamsSchema } from "../../shared/types/index.js";

export function bindVariable(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "bind-variable",
        "Bind a node property to a variable so it follows the token. Use field 'fills' or 'strokes' for colour, or a numeric field such as cornerRadius, itemSpacing or paddingLeft.",
        BindVariableParamsSchema.shape,
        async (params: BindVariableParams) => {
            return await safeToolProcessor<BindVariableParams>(
                taskManager.runTask("bind-variable", params)
            );
        }
    );
}
