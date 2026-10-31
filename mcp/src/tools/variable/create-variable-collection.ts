import type { CreateVariableCollectionParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { CreateVariableCollectionParamsSchema } from "../../shared/types/index.js";

export function createVariableCollection(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-variable-collection",
        "Create a variable collection (a design-token set), optionally with named modes such as Light and Dark.",
        CreateVariableCollectionParamsSchema.shape,
        async (params: CreateVariableCollectionParams) => {
            return await safeToolProcessor<CreateVariableCollectionParams>(
                taskManager.runTask("create-variable-collection", params)
            );
        }
    );
}
