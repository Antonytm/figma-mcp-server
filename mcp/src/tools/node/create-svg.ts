import type { CreateSvgParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { CreateSvgParamsSchema } from "../../shared/types/index.js";

export function createSvg(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-svg",
        "Import raw SVG markup as real vector layers. Use this for icons. Optionally resize and recolour every vector inside in one call.",
        CreateSvgParamsSchema.shape,
        async (params: CreateSvgParams) => {
            return await safeToolProcessor<CreateSvgParams>(
                taskManager.runTask("create-svg", params)
            );
        }
    );
}
