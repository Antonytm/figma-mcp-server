import { ToolResult } from "tools/tool-result";
import { CombineAsVariantsParams } from "@shared/types";

export async function combineAsVariants(args: CombineAsVariantsParams): Promise<ToolResult> {
    const components: ComponentNode[] = [];
    for (const id of args.nodeIds) {
        const node = await figma.getNodeByIdAsync(id);
        if (!node) return { isError: true, content: "Node not found: " + id };
        if (node.type !== "COMPONENT") {
            return { isError: true, content: "Node " + id + " is a " + node.type + "; combine-as-variants needs COMPONENT nodes." };
        }
        components.push(node as ComponentNode);
    }

    let parent: BaseNode & ChildrenMixin = figma.currentPage;
    if (args.parentId) {
        const found = await figma.getNodeByIdAsync(args.parentId);
        if (!found) return { isError: true, content: "Parent node not found: " + args.parentId };
        parent = found as BaseNode & ChildrenMixin;
    }

    let set: ComponentSetNode;
    try {
        set = figma.combineAsVariants(components, parent as any);
    } catch (error) {
        return {
            isError: true,
            content: "Could not combine as variants: " + (error instanceof Error ? error.message : JSON.stringify(error)),
        };
    }

    set.name = args.name;
    return {
        isError: false,
        content: {
            id: set.id,
            key: set.key,
            name: set.name,
            type: set.type,
            variants: set.children.map((c) => ({ id: c.id, name: c.name })),
        },
    };
}
