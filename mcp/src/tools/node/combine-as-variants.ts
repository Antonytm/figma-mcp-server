import type { CombineAsVariantsParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { CombineAsVariantsParamsSchema } from "../../shared/types/index.js";

export function combineAsVariants(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "combine-as-variants",
        "Combine two or more COMPONENT nodes into a single variant set (component set). Name each component 'Prop=Value' beforehand, e.g. 'Active=Robots', so the variant property is created correctly.",
        CombineAsVariantsParamsSchema.shape,
        async (params: CombineAsVariantsParams) => {
            return await safeToolProcessor<CombineAsVariantsParams>(
                taskManager.runTask("combine-as-variants", params)
            );
        }
    );
}
