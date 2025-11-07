import { CreateRectangleParams } from "@shared/types";
import { ToolResult } from "../tool-result";
import { serializeRectangle } from "src/serializers/serialize-rectangle";

export function createRectangle(args: CreateRectangleParams): ToolResult {
    const rectangle = figma.createRectangle();
    rectangle.x = args.x;
    rectangle.y = args.y;
    rectangle.resize(args.width, args.height);
    rectangle.name = args.name;

    if (args.parentId) {
        const parent = figma.getNodeById(args.parentId);
        if (parent) {
            (parent as FrameNode).appendChild(rectangle);
        }
        else {
            return {
                isError: true,
                content: "Parent node not found"
            }
        }
    }
    else {
        figma.currentPage.appendChild(rectangle);
    }

    return {
        isError: false,
        content: serializeRectangle(rectangle)
    }
}