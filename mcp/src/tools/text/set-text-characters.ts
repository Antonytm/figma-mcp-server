import type { SetTextCharactersParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { SetTextCharactersParamsSchema } from "../../shared/types/index.js";

export function setTextCharacters(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "set-text-characters",
        "Replace the text content of an existing TEXT node in place, keeping its id, position, size and styling. Loads the node's fonts automatically. Use this instead of deleting and recreating text.",
        SetTextCharactersParamsSchema.shape,
        async (params: SetTextCharactersParams) => {
            return await safeToolProcessor<SetTextCharactersParams>(
                taskManager.runTask("set-text-characters", params)
            );
        }
    );
}
