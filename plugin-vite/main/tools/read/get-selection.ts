import { serializeNode } from "../../serialization/serialization";
import { ToolResult } from "../tool-result";

export async function getSelection(args: void): Promise<ToolResult> {
    const selection = figma.currentPage.selection;
    if (selection) {
        const serializedSelection = selection.map(node => serializeNode(node));
        return {
            isError: false,
            content: serializedSelection
        };
    }
    return { isError: true, content: "Selection not found" };
}