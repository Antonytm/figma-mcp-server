import { ToolResult } from "tools/tool-result";

export async function getVariables(): Promise<ToolResult> {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const variables = await figma.variables.getLocalVariablesAsync();

    return {
        isError: false,
        content: {
            collections: collections.map((c) => ({
                id: c.id,
                name: c.name,
                modes: c.modes.map((m) => ({ modeId: m.modeId, name: m.name })),
                variableIds: c.variableIds,
            })),
            variables: variables.map((v) => ({
                id: v.id,
                name: v.name,
                type: v.resolvedType,
                collectionId: v.variableCollectionId,
                valuesByMode: v.valuesByMode,
            })),
        },
    };
}
