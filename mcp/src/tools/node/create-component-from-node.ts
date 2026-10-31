import type { CreateComponentFromNodeParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { CreateComponentFromNodeParamsSchema } from "../../shared/types/index.js";

export function createComponentFromNode(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-component-from-node",
        "Convert an existing node (typically a frame) into a reusable component in place, preserving its children. Returns the component id and key for create-instance.",
        CreateComponentFromNodeParamsSchema.shape,
        async (params: CreateComponentFromNodeParams) => {
            return await safeToolProcessor<CreateComponentFromNodeParams>(
                taskManager.runTask("create-component-from-node", params)
            );
        }
    );
}
