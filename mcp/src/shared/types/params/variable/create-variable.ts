import { z } from "zod";

export const CreateVariableParamsSchema = z.object({
    collectionId: z.string().describe("Variable collection id from create-variable-collection or get-variables"),
    name: z.string().describe("Variable name; use slashes for groups, e.g. 'color/brand'"),
    type: z.enum(["COLOR", "FLOAT", "STRING", "BOOLEAN"]).describe("Resolved type"),
    valuesByMode: z.record(z.string(), z.any()).describe("Map of modeId (or mode NAME) to value. COLOR takes an RGBA hex string like '#E52D27FF'; FLOAT a number; STRING a string; BOOLEAN a boolean."),
    scopes: z.array(z.string()).optional().describe("Optional variable scopes, e.g. ['FRAME_FILL','SHAPE_FILL'] or ['TEXT_FILL']"),
});

export type CreateVariableParams = z.infer<typeof CreateVariableParamsSchema>;
