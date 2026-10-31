import type { SetNodeStyleParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { SetNodeStyleParamsSchema } from "../../shared/types/index.js";

export function setNodeStyle(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "set-node-style",
        "Set fill, stroke, stroke weight, corner radius, opacity or visibility on a node and return a compact result. Prefer this over set-fill-color/set-stroke-color/set-corner-radius, which each return the node's full geometry.",
        SetNodeStyleParamsSchema.shape,
        async (params: SetNodeStyleParams) => {
            return await safeToolProcessor<SetNodeStyleParams>(
                taskManager.runTask("set-node-style", params)
            );
        }
    );
}
