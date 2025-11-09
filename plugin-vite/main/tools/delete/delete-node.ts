import { DeleteNodeParams } from "@shared/types";
import { ToolResult } from "tools/tool-result";

export async function deleteNode(args: DeleteNodeParams): Promise<ToolResult> {
    const node = figma.getNodeById(args.id);
    if (!node) {
        return { isError: true, content: "Node not found" };
    }
    const name = node.name;
    node.remove();
    return { isError: false, content: `Node "${name}" (${args.id}) deleted successfully` };
}