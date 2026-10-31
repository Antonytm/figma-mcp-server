import { ToolResult } from "tools/tool-result";
import { SetNodeStyleParams } from "@shared/types";
import { getSolidHEXColorPaint } from "utils/get-solid-color-paint";

export async function setNodeStyle(args: SetNodeStyleParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.id);
    if (!node) return { isError: true, content: "Node not found: " + args.id };
    const target = node as any;
    const applied: string[] = [];

    if (args.fillColor !== undefined && "fills" in target) {
        target.fills = [getSolidHEXColorPaint(args.fillColor)];
        applied.push("fill");
    }
    if (args.strokeColor !== undefined && "strokes" in target) {
        target.strokes = [getSolidHEXColorPaint(args.strokeColor)];
        applied.push("stroke");
    }
    if (args.strokeWeight !== undefined && "strokeWeight" in target) {
        target.strokeWeight = args.strokeWeight;
        applied.push("strokeWeight");
    }
    if (args.cornerRadius !== undefined && "cornerRadius" in target) {
        target.cornerRadius = args.cornerRadius;
        applied.push("cornerRadius");
    }
    if (args.opacity !== undefined && "opacity" in target) {
        target.opacity = args.opacity;
        applied.push("opacity");
    }
    if (args.visible !== undefined) {
        target.visible = args.visible;
        applied.push("visible");
    }

    return { isError: false, content: { id: node.id, name: node.name, type: node.type, applied: applied } };
}
