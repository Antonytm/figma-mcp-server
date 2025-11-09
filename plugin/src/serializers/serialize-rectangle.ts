import { serializeNode } from "./serialization";

export function serializeRectangle(rectangle: RectangleNode): string {
    return serializeNode(rectangle);
}