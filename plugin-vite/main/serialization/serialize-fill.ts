import { convertToHex } from "utils/color-conversion";

export function serializeFill(fill: Paint[]  | typeof figma.mixed): string {
    if (!Array.isArray(fill)) {
        return "";
    }
    const result = fill.map((item) => {
        if (item.type === 'SOLID') {
            return {
                type: 'SOLID',
                color: convertToHex(item.color),
            };
        }
        // TODO: Add other fill types
        return JSON.stringify(item);
    });
    return JSON.stringify(result);
}