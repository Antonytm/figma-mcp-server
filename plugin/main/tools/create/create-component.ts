import { CreateComponentParams } from "@shared/types";
import { serializeComponent } from "serialization/serialize-component";
import { ToolResult } from "tools/tool-result";

export async function createComponent(args: CreateComponentParams): Promise<ToolResult> {
    const component = figma.createComponent();
    component.name = args.name;

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (parent) {
            (parent as FrameNode).appendChild(component);
        }
        else {
            return { isError: true, content: "Parent node not found" };
        }
    }
    return { isError: false, content: serializeComponent(component) };
}