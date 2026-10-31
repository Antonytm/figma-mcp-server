import { z } from "zod";

export const DeleteVariableParamsSchema = z.object({
    variableId: z.string().optional().describe("Variable id to delete"),
    collectionId: z.string().optional().describe("Variable collection id to delete (removes all its variables)"),
});

export type DeleteVariableParams = z.infer<typeof DeleteVariableParamsSchema>;
