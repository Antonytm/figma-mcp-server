import type { TaskManager } from "src/task-manager";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { GetPagesParamsSchema, type GetPagesParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function getPages(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "get-pages",
        "Get all pages in the current file.",
        GetPagesParamsSchema.shape,
        async (params: GetPagesParams) => {
            return await safeToolProcessor<GetPagesParams>(
                taskManager.runTask("get-pages", params)
            );
        }
    )
}