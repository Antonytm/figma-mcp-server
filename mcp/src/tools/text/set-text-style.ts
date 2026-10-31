import type { SetTextStyleParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { SetTextStyleParamsSchema } from "../../shared/types/index.js";

export function setTextStyle(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "set-text-style",
        "Update the styling of an existing TEXT node: font size, family, weight, colour, horizontal/vertical alignment, auto-resize, line height and letter spacing. Only the fields you pass are changed.",
        SetTextStyleParamsSchema.shape,
        async (params: SetTextStyleParams) => {
            return await safeToolProcessor<SetTextStyleParams>(
                taskManager.runTask("set-text-style", params)
            );
        }
    );
}
