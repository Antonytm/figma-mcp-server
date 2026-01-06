import { SetLayoutParams } from "@shared/types/params/update/set-layout";
import { serializeNode } from "serialization/serialization";
import { ToolResult } from "tools/tool-result";

export async function setLayout(args: SetLayoutParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.id);

    if (!node) {
        return { isError: true, content: "Node not found" };
    }

    let errorMessage = "";

    // Set layout mode first
    if (args.mode) {
        if ("layoutMode" in node) {
            (node as unknown as { layoutMode: string }).layoutMode = args.mode;
        }
        else {
            errorMessage += "Node does not have a layoutMode property\n";
        }
    }

    if (args.wrap) {
        if ("layoutWrap" in node) {
            (node as unknown as { layoutWrap: string }).layoutWrap = args.wrap ? "WRAP" : "NO_WRAP";
        }
        else {
            errorMessage += "Node does not have a layoutWrap property\n";
        }
    }
    if (args.clip) {
        if ("clipContent" in node) {
            (node as unknown as { clipContent: boolean }).clipContent = args.clip;
        }
        else {
            errorMessage += "Node does not have a clipContent property\n";
        }
    }

    if (args.mode === "HORIZONTAL" || args.mode === "VERTICAL") {
        if (args.itemSpacing) {
            if ("itemSpacing" in node) {
                (node as unknown as { itemSpacing: number }).itemSpacing = args.itemSpacing;
            }
            else {
                errorMessage += "Node does not have a itemSpacing property\n";
            }
        }
        if (args.primaryAxisAlignItems) {
            if ("primaryAxisAlignItems" in node) {
                (node as unknown as { primaryAxisAlignItems: string }).primaryAxisAlignItems = args.primaryAxisAlignItems;
            }
            else {
                errorMessage += "Node does not have a primaryAxisAlignItems property\n";
            }
        }
        if (args.counterAxisAlignItems) {
            if ("counterAxisAlignItems" in node) {
                (node as unknown as { counterAxisAlignItems: string }).counterAxisAlignItems = args.counterAxisAlignItems;
            }
            else {
                errorMessage += "Node does not have a counterAxisAlignItems property\n";
            }
        }
    }

    if (args.paddingLeft) {
        if ("paddingLeft" in node) {
            (node as unknown as { paddingLeft: number }).paddingLeft = args.paddingLeft;
        }
        else {
            errorMessage += "Node does not have a paddingLeft property\n";
        }
    }
    if (args.paddingRight) {
        if ("paddingRight" in node) {
            (node as unknown as { paddingRight: number }).paddingRight = args.paddingRight;
        }
        else {
            errorMessage += "Node does not have a paddingRight property\n";
        }
    }
    if (args.paddingTop) {
        if ("paddingTop" in node) {
            (node as unknown as { paddingTop: number }).paddingTop = args.paddingTop;
        }
        else {
            errorMessage += "Node does not have a paddingTop property\n";
        }
    }
    if (args.paddingBottom) {
        if ("paddingBottom" in node) {
            (node as unknown as { paddingBottom: number }).paddingBottom = args.paddingBottom;
        }
        else {
            errorMessage += "Node does not have a paddingBottom property\n";
        }
    }

    if (args.layoutSizingVertical) {
        if ("layoutSizingVertical" in node) {
            (node as unknown as { layoutSizingVertical: string }).layoutSizingVertical = args.layoutSizingVertical;
        }
        else {
            errorMessage += "Node does not have a layoutSizingVertical property\n";
        }
    }
    if (args.layoutSizingHorizontal) {
        if ("layoutSizingHorizontal" in node) {
            (node as unknown as { layoutSizingHorizontal: string }).layoutSizingHorizontal = args.layoutSizingHorizontal;
        }
        else {
            errorMessage += "Node does not have a layoutSizingHorizontal property\n";
        }
    }

    if (errorMessage.length > 0) {
        return { isError: true, content: errorMessage };
    }

    return {
        isError: false,
        content: serializeNode(node as SceneNode)
    }
}