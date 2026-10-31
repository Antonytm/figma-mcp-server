import { ToolResult } from "tools/tool-result";
import { CreateVariableParams } from "@shared/types";

// "#E52D27FF" -> {r,g,b,a} in Figma's 0-1 range.
function hexToRgba(hex: string): RGBA {
    const clean = hex.replace("#", "");
    return {
        r: parseInt(clean.substring(0, 2), 16) / 255,
        g: parseInt(clean.substring(2, 4), 16) / 255,
        b: parseInt(clean.substring(4, 6), 16) / 255,
        a: clean.length >= 8 ? parseInt(clean.substring(6, 8), 16) / 255 : 1,
    };
}

export async function createVariable(args: CreateVariableParams): Promise<ToolResult> {
    const collection = await figma.variables.getVariableCollectionByIdAsync(args.collectionId);
    if (!collection) return { isError: true, content: "Variable collection not found: " + args.collectionId };

    const variable = figma.variables.createVariable(args.name, collection, args.type);

    const applied: any = {};
    for (const key of Object.keys(args.valuesByMode)) {
        // Accept either a real modeId or a human mode name, so callers don't
        // have to look ids up first.
        let modeId = key;
        const byName = collection.modes.find((m) => m.name === key);
        if (byName) modeId = byName.modeId;
        if (!collection.modes.some((m) => m.modeId === modeId)) {
            return {
                isError: true,
                content: "Unknown mode '" + key + "'. Available: " + collection.modes.map((m) => m.name + " (" + m.modeId + ")").join(", "),
            };
        }

        const raw = args.valuesByMode[key];
        let value: any = raw;
        if (args.type === "COLOR" && typeof raw === "string") {
            value = hexToRgba(raw);
        }

        try {
            variable.setValueForMode(modeId, value);
            applied[modeId] = value;
        } catch (error) {
            return {
                isError: true,
                content: "Could not set value for mode '" + key + "': " + (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }

    if (args.scopes && args.scopes.length > 0) {
        try {
            variable.scopes = args.scopes as VariableScope[];
        } catch (error) {
            // Non-fatal: an unrecognised scope shouldn't discard the variable.
        }
    }

    return {
        isError: false,
        content: { id: variable.id, key: variable.key, name: variable.name, type: variable.resolvedType, collectionId: variable.variableCollectionId, valuesByMode: applied },
    };
}
