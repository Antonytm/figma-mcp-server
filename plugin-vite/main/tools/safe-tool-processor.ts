import { ToolResult } from "./tool-result";

export function safeToolProcessor<T>(tool: (args: T) => ToolResult) {
    return async (args: T) => {
        try {
            return await tool(args);
        } catch (error) {
            return {
                isError: true,
                content: error
            };
        }
    }
}