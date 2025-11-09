import { ToolResult } from "tools/tool-result";
import { CreateTextParams } from "@shared/types";
import { getFontStyle } from "utils/get-font-style";
import { getSolidHEXColorPaint } from "utils/get-solid-color-paint";
import { serializeText } from "serialization/serialize-text";

export async function createText(args: CreateTextParams): Promise<ToolResult> {
    const text = figma.createText();
    text.x = args.x;
    text.y = args.y;

    try {
        console.log("Setting font color", args.fontColor);
        console.log("getSolidHEXColorPaint", getSolidHEXColorPaint(args.fontColor));
        text.fills = [getSolidHEXColorPaint(args.fontColor)];
    } catch (error) {
        return {
            isError: true,
            content: `Error setting font color: ${error instanceof Error ? error.message : JSON.stringify(error)}`
        }
    }

    try {
        await figma.loadFontAsync({
            family: args.fontName,
            style: getFontStyle(args.fontWeight),
        });
        text.fontName = { family: args.fontName, style: getFontStyle(args.fontWeight) };
    } catch (error) {
        return {
            isError: true,
            content: `Error loading font "${args.fontName}" with style "${getFontStyle(args.fontWeight)}": ${error instanceof Error ? error.message : JSON.stringify(error)}`
        }
    }

    text.fontSize = args.fontSize;

    text.name = args.name;
    text.characters = args.text;

    if (args.parentId) {
        const parent = figma.getNodeById(args.parentId);
        if (parent) {
            (parent as FrameNode).appendChild(text);
        }
        else {
            return { isError: true, content: "Parent node not found" };
        }
    }

    return { isError: false, content: serializeText(text) };
}