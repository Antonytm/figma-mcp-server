import { ToolResult } from "tools/tool-result";
import { BindVariableParams } from "@shared/types";

export async function bindVariable(args: BindVariableParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.nodeId);
    if (!node) return { isError: true, content: "Node not found: " + args.nodeId };

    const variable = await figma.variables.getVariableByIdAsync(args.variableId);
    if (!variable) return { isError: true, content: "Variable not found: " + args.variableId };

    const target = node as any;

    try {
        if (args.field === "fills" || args.field === "strokes") {
            // Paint arrays are immutable and setBoundVariableForPaint returns a
            // NEW paint, so the array has to be cloned and reassigned.
            const existing = target[args.field];
            const base =
                Array.isArray(existing) && existing.length > 0 && existing[0].type === "SOLID"
                    ? existing[0]
                    : { type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 1 };
            const bound = figma.variables.setBoundVariableForPaint(base as SolidPaint, "color", variable);
            target[args.field] = [bound];
        } else {
            target.setBoundVariable(args.field, variable);
        }
    } catch (error) {
        return {
            isError: true,
            content:
                "Could not bind '" + args.field + "' on " + node.type + " node: " +
                (error instanceof Error ? error.message : JSON.stringify(error)),
        };
    }

    return {
        isError: false,
        content: { id: node.id, name: node.name, type: node.type, field: args.field, variableId: variable.id, variableName: variable.name },
    };
}
