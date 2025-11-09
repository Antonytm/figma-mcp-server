import { CreateRectangleParams, MoveNodeParams } from "@shared/types";
import { ToolResult } from "../tool-result";
import { serializeNode } from "serialization/serialization";

export async function moveNode(args: MoveNodeParams): Promise<ToolResult> {
    const node = figma.getNodeById(args.id);

    if (!node) {
        return { isError: true, content: "Node not found" };
    }

    const sceneNode = node as SceneNode;
    sceneNode.x = args.x;
    sceneNode.y = args.y;   
    return { isError: false, content: serializeNode(sceneNode) };
}