import { CloneNodeParams } from "@shared/types";
import { ToolResult } from "tools/tool-result";
import { serializeNode } from "serialization/serialization";

export async function cloneNode(args: CloneNodeParams): Promise<ToolResult> {
    const node = figma.getNodeById(args.id);
    if (!node) {
        return { isError: true, content: "Node not found" };
    }
    const sceneNode = node as SceneNode;
    const clonedNode = sceneNode.clone();
    clonedNode.name = sceneNode.name;
    return { isError: false, content: serializeNode(clonedNode) };
}