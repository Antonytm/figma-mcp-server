import { ToolResult } from "tools/tool-result";
import { DeleteVariableParams } from "@shared/types";

export async function deleteVariable(args: DeleteVariableParams): Promise<ToolResult> {
    if (!args.variableId && !args.collectionId) {
        return { isError: true, content: "Pass either variableId or collectionId." };
    }

    if (args.collectionId) {
        const collection = await figma.variables.getVariableCollectionByIdAsync(args.collectionId);
        if (!collection) return { isError: true, content: "Collection not found: " + args.collectionId };
        const name = collection.name;
        const count = collection.variableIds.length;
        collection.remove();
        return { isError: false, content: { deletedCollection: name, variablesRemoved: count } };
    }

    const variable = await figma.variables.getVariableByIdAsync(args.variableId as string);
    if (!variable) return { isError: true, content: "Variable not found: " + args.variableId };
    const name = variable.name;
    variable.remove();
    return { isError: false, content: { deletedVariable: name } };
}
