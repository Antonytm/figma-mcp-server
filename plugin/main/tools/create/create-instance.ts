import { serializeInstance } from "serialization/serialize-instanse";
import { CreateInstanceParams } from "@shared/types";
import { ToolResult } from "../tool-result";

export async function createInstance(args: CreateInstanceParams): Promise<ToolResult> {
    const component = await figma.getNodeByIdAsync(args.componentId) as ComponentNode;
    if (!component) {
        return {
            isError: true,
            content: "Component not found"
        }
    }

    const instance = component.createInstance();
    instance.name = args.name;
    instance.x = args.x;
    instance.y = args.y;

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId) as FrameNode;
        if (!parent) {
            return {
                isError: true,
                content: "Parent node not found"
            }
        }
    }
    else {
        figma.currentPage.appendChild(instance);
    }

    return {
        isError: false,
        content: serializeInstance(instance)
    }

}