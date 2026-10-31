import { ToolResult } from "tools/tool-result";
import { ListChildrenParams } from "@shared/types";

// Deliberately compact: id/name/type/geometry only, plus `characters` for text.
// get-node-info returns full vector path geometry and costs ~10x more per call.
function summarise(node: any, depth: number): any {
    const out: any = { id: node.id, name: node.name, type: node.type };
    if (typeof node.x === "number") { out.x = node.x; out.y = node.y; }
    if (typeof node.width === "number") { out.width = node.width; out.height = node.height; }
    if (typeof node.characters === "string") out.characters = node.characters;

    if (depth > 0 && Array.isArray(node.children) && node.children.length > 0) {
        out.children = node.children.map((c: any) => summarise(c, depth - 1));
    } else if (Array.isArray(node.children) && node.children.length > 0) {
        out.childCount = node.children.length;
    }
    return out;
}

export async function listChildren(args: ListChildrenParams): Promise<ToolResult> {
    let node: any;
    if (args.id === "0:1" || args.id === figma.currentPage.id) {
        node = figma.currentPage;
    } else {
        node = await figma.getNodeByIdAsync(args.id);
    }
    if (!node) return { isError: true, content: "Node not found: " + args.id };
    if (!Array.isArray(node.children)) {
        return { isError: true, content: "Node " + args.id + " (" + node.type + ") has no children." };
    }

    const depth = args.depth === undefined ? 1 : args.depth;
    return {
        isError: false,
        content: {
            id: node.id,
            name: node.name,
            type: node.type,
            count: node.children.length,
            children: node.children.map((c: any) => summarise(c, depth - 1)),
        },
    };
}
