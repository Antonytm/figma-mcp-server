import { CreateFrameParams } from "@shared/types";
import { ToolResult } from "../tool-result";
import { serializeFrame } from "../../serialization/serialize-frame";

export async function createFrame(args: CreateFrameParams): Promise<ToolResult> {
    const frame = figma.createFrame();
    frame.x = args.x;
    frame.y = args.y;
    frame.resize(args.width, args.height);
    frame.name = args.name;

    if (args.parentId) {
        const parent = figma.getNodeById(args.parentId);
        if (parent) {
            (parent as FrameNode).appendChild(frame);
        }
        else {
            return {
                isError: true,
                content: "Parent node not found"
            }
        }
    }
    else {
        figma.currentPage.appendChild(frame);
    }

    return {
        isError: false,
        content: serializeFrame(frame)
    }
}