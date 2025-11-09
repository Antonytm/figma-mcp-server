import { convertToHex } from "utils/color-conversion";
import { serializeFill } from "./serialize-fill";

export function serializeText(text: TextNode): string {
    return JSON.stringify({
        x: text.x,
        y: text.y,
        width: text.width,
        height: text.height,
        name: text.name,
        fontSize: text.fontSize,
        fontName: text.fontName,
        fontColor: serializeFill(text.fills),
        parentId: text.parent ? `${text.parent.id}:${text.parent.type}` : undefined
    });
}