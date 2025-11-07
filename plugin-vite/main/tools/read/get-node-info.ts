import type { GetNodeInfoParams } from "@shared/types";
import { serializeNode } from "../../serialization/serialization";
import { ToolResult } from "../tool-result";

export function getNodeInfo(args: GetNodeInfoParams): ToolResult {
    const node = figma.getNodeById(args.id);
    if (node) {
        const serializedNode = serializeNode(node as SceneNode);
        return {
            isError: false,
            content: serializedNode
        };
    }
    return {
        isError: true,
        content: "Node not found"
    };
}