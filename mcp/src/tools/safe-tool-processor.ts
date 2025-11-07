import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { TaskResult } from "src/task-manager";

export async function safeToolProcessor<T>(task: Promise<TaskResult>): Promise<CallToolResult> {
    try {
        const result = await task;
        return {
            content: [{
                type: "text",
                text: JSON.stringify(result.content)
            }],
            isError: result.isError
        } as CallToolResult;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        return {
            content: [{
                type: "text",
                text: errorMessage
            }],
            isError: true
        } as CallToolResult;
    }

}