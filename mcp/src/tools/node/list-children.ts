import type { ListChildrenParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { ListChildrenParamsSchema } from "../../shared/types/index.js";

export function listChildren(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "list-children",
        "List a container's children compactly (id, name, type, position, size, and text content). Far cheaper than get-node-info, which returns full vector path geometry. Use '0:1' as the id to list the page's top-level frames.",
        ListChildrenParamsSchema.shape,
        async (params: ListChildrenParams) => {
            return await safeToolProcessor<ListChildrenParams>(
                taskManager.runTask("list-children", params)
            );
        }
    );
}
