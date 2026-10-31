import { ToolResult } from "tools/tool-result";
import { CreateSvgParams } from "@shared/types";
import { getSolidHEXColorPaint } from "utils/get-solid-color-paint";

export async function createSvg(args: CreateSvgParams): Promise<ToolResult> {
    let frame: FrameNode;
    try {
        frame = figma.createNodeFromSvg(args.svg);
    } catch (error) {
        return {
            isError: true,
            content: "Could not parse SVG: " + (error instanceof Error ? error.message : JSON.stringify(error)),
        };
    }

    frame.name = args.name;
    frame.x = args.x;
    frame.y = args.y;

    if (args.width !== undefined && args.height !== undefined) {
        frame.resize(args.width, args.height);
    }

    // createNodeFromSvg keeps the source fills; recolouring every vector inside
    // is what you almost always want for a monochrome icon.
    if (args.fillColor !== undefined) {
        const paint = getSolidHEXColorPaint(args.fillColor);
        const vectors = frame.findAll((n) => "fills" in n);
        for (const vector of vectors) {
            const target = vector as GeometryMixin & SceneNode;
            if (target.fills !== figma.mixed && Array.isArray(target.fills) && target.fills.length > 0) {
                target.fills = [paint];
            }
            if ("strokes" in target && Array.isArray((target as any).strokes) && (target as any).strokes.length > 0) {
                (target as any).strokes = [paint];
            }
        }
    }

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (!parent) return { isError: true, content: "Parent node not found: " + args.parentId };
        (parent as FrameNode).appendChild(frame);
    }

    return {
        isError: false,
        content: { id: frame.id, name: frame.name, type: frame.type, x: frame.x, y: frame.y, width: frame.width, height: frame.height, children: frame.children.length },
    };
}
