import { ToolResult } from "tools/tool-result";
import { CreateComponentFromNodeParams } from "@shared/types";

export async function createComponentFromNode(args: CreateComponentFromNodeParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.id);
    if (!node) return { isError: true, content: "Node not found: " + args.id };
    if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
        return { isError: true, content: "Node " + args.id + " is already a " + node.type + "." };
    }

    let component: ComponentNode;
    try {
        component = figma.createComponentFromNode(node as SceneNode);
    } catch (error) {
        return {
            isError: true,
            content: "Could not convert to component: " + (error instanceof Error ? error.message : JSON.stringify(error)),
        };
    }

    if (args.name !== undefined) component.name = args.name;
    if (args.description !== undefined) component.description = args.description;

    return {
        isError: false,
        content: { id: component.id, key: component.key, name: component.name, type: component.type, width: component.width, height: component.height },
    };
}
