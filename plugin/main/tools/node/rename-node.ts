import { ToolResult } from "tools/tool-result";
import { RenameNodeParams } from "@shared/types";

export async function renameNode(args: RenameNodeParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.id);
    if (!node) return { isError: true, content: "Node not found: " + args.id };

    const previous = node.name;
    node.name = args.name;
    return { isError: false, content: { id: node.id, type: node.type, previousName: previous, name: node.name } };
}
