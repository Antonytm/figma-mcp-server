import { ToolResult } from "tools/tool-result";
import { SetTextStyleParams } from "@shared/types";
import { getFontStyle } from "utils/get-font-style";
import { getSolidHEXColorPaint } from "utils/get-solid-color-paint";
import { serializeText } from "serialization/serialize-text";

export async function setTextStyle(args: SetTextStyleParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.id);
    if (!node) return { isError: true, content: "Node not found: " + args.id };
    if (node.type !== "TEXT") {
        return { isError: true, content: "Node " + args.id + " is a " + node.type + ", not a TEXT node." };
    }
    const text = node as TextNode;

    // Any mutation on a text node needs its current fonts loaded first.
    try {
        if (text.characters.length > 0) {
            for (const font of text.getRangeAllFontNames(0, text.characters.length)) {
                await figma.loadFontAsync(font);
            }
        } else if (text.fontName !== figma.mixed) {
            await figma.loadFontAsync(text.fontName as FontName);
        }
    } catch (error) {
        return { isError: true, content: "Could not load current fonts: " + (error instanceof Error ? error.message : JSON.stringify(error)) };
    }

    // Changing family/weight requires loading the *target* face too.
    if (args.fontName !== undefined || args.fontWeight !== undefined) {
        const current = text.fontName !== figma.mixed ? (text.fontName as FontName) : { family: "Inter", style: "Regular" };
        const family = args.fontName !== undefined ? args.fontName : current.family;
        const style = args.fontWeight !== undefined ? getFontStyle(args.fontWeight) : current.style;
        try {
            await figma.loadFontAsync({ family: family, style: style });
            text.fontName = { family: family, style: style };
        } catch (error) {
            return {
                isError: true,
                content: 'Could not load font "' + family + '" style "' + style + '": ' + (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }

    if (args.fontSize !== undefined) text.fontSize = args.fontSize;
    if (args.fontColor !== undefined) text.fills = [getSolidHEXColorPaint(args.fontColor)];
    if (args.textAlignHorizontal !== undefined) text.textAlignHorizontal = args.textAlignHorizontal;
    if (args.textAlignVertical !== undefined) text.textAlignVertical = args.textAlignVertical;
    if (args.textAutoResize !== undefined) text.textAutoResize = args.textAutoResize;
    if (args.lineHeightPx !== undefined) text.lineHeight = { unit: "PIXELS", value: args.lineHeightPx };
    if (args.letterSpacingPx !== undefined) text.letterSpacing = { unit: "PIXELS", value: args.letterSpacingPx };

    return { isError: false, content: serializeText(text) };
}
