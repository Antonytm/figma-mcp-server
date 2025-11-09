import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import type { SetCornerRadiusParams } from "../../shared/types/index.js";
import { SetCornerRadiusParamsSchema } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function setCornerRadius(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "set-corner-radius",
        "Set the corner radius of a node.",
        SetCornerRadiusParamsSchema.shape,
        async (params: SetCornerRadiusParams) => {
            return await safeToolProcessor<SetCornerRadiusParams>(
                taskManager.runTask("set-corner-radius", params)
            );
        }
    );
}