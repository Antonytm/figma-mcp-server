import { ToolResult } from "tools/tool-result";
import { CreateVariableCollectionParams } from "@shared/types";

export async function createVariableCollection(args: CreateVariableCollectionParams): Promise<ToolResult> {
    const collection = figma.variables.createVariableCollection(args.name);

    if (args.modes && args.modes.length > 0) {
        // A new collection always starts with exactly one mode; rename it
        // rather than adding a duplicate, then append the rest.
        collection.renameMode(collection.modes[0].modeId, args.modes[0]);
        for (let i = 1; i < args.modes.length; i++) {
            collection.addMode(args.modes[i]);
        }
    }

    return {
        isError: false,
        content: {
            id: collection.id,
            name: collection.name,
            modes: collection.modes.map((m) => ({ modeId: m.modeId, name: m.name })),
        },
    };
}
