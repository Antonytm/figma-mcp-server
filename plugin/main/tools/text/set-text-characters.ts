import { ToolResult } from "tools/tool-result";
import { SetTextCharactersParams } from "@shared/types";
import { serializeText } from "serialization/serialize-text";

// Loads every font already used by the node before mutating `characters`.
// Figma throws "Cannot write to node with unloaded font" otherwise, and the
// node may use several fonts across ranges.
async function loadFontsFor(text: TextNode) {
    if (text.characters.length > 0) {
        const fonts = text.getRangeAllFontNames(0, text.characters.length);
        for (const font of fonts) {
            await figma.loadFontAsync(font);
        }
        return;
    }
    const single = text.fontName;
    if (single !== figma.mixed) {
        await figma.loadFontAsync(single as FontName);
    }
}

export async function setTextCharacters(args: SetTextCharactersParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.id);
    if (!node) return { isError: true, content: "Node not found: " + args.id };
    if (node.type !== "TEXT") {
        return { isError: true, content: "Node " + args.id + " is a " + node.type + ", not a TEXT node." };
    }

    const text = node as TextNode;
    try {
        await loadFontsFor(text);
    } catch (error) {
        return {
            isError: true,
            content: "Could not load the node's fonts: " + (error instanceof Error ? error.message : JSON.stringify(error)),
        };
    }

    text.characters = args.characters;
    return { isError: false, content: serializeText(text) };
}
