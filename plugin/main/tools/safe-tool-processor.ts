import { ToolResult } from "./tool-result";

export function safeToolProcessor<T>(tool: (args: T) => Promise<ToolResult> ) {
    return async (args: T) => {
        try {
            return await tool(args);
        } catch (error) {
            console.error(error);
            return {
                isError: true,
                content: error instanceof Error ? error.message : JSON.stringify(error)
            };
        }
    }
}