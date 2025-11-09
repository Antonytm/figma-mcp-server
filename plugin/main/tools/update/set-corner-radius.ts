import { SetCornerRadiusParams } from "@shared/types/params/update/set-corner-radius";
import { ToolResult } from "../tool-result";
import { serializeNode } from "serialization/serialization";

export async function setCornerRadius(args: SetCornerRadiusParams): Promise<ToolResult> {
    const node = figma.getNodeById(args.id);
    if (!node) {
        return { isError: true, content: "Node not found" };
    }

    try {

        if("cornerRadius" in node) {
            (node as unknown as { cornerRadius: number }).cornerRadius = args.cornerRadius;
        }

        if("topLeftRadius" in node && args.topLeftRadius) {
            (node as unknown as { topLeftRadius: number }).topLeftRadius = args.topLeftRadius!;
        }
        if("topRightRadius" in node && args.topRightRadius) {
            (node as unknown as { topRightRadius: number }).topRightRadius = args.topRightRadius!;
        }
        if("bottomLeftRadius" in node && args.bottomLeftRadius) {
            (node as unknown as { bottomLeftRadius: number }).bottomLeftRadius = args.bottomLeftRadius!;
        }
        if("bottomRightRadius" in node && args.bottomRightRadius) {
            (node as unknown as { bottomRightRadius: number }).bottomRightRadius = args.bottomRightRadius;
        }
    }
    catch (error) {
        return { isError: true, content: `Error setting corner radius: ${error instanceof Error ? error.message : JSON.stringify(error)}` };
    }
    const sceneNode = node as SceneNode;
    return { isError: false, content: serializeNode(sceneNode) };
}