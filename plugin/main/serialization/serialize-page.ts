import { serializeNode } from "./serialization";

export function serializePage(page: PageNode): string {
    return JSON.stringify({
        id: page.id,
        name: page.name,
        nodes: page.children.map((node) => serializeNode(node)),
    });
}