import { CreateRectangleParams, MoveNodeParams, ResizeNodeParams } from "@shared/types";
import { serializeNode } from "serialization/serialization";
import { ToolResult } from "tools/tool-result";

export async function resizeNode(args: ResizeNodeParams): Promise<ToolResult> {
    const node = figma.getNodeById(args.id);

    if (!node) {
        return { isError: true, content: "Node not found" };
    }

    (node as SceneNode & { resize: (width: number, height: number) => void }).resize(args.width, args.height);
    return { isError: false, content: serializeNode(node as SceneNode) };
}