import { z } from "zod";

export const CreateVariableCollectionParamsSchema = z.object({
    name: z.string().describe("Collection name, e.g. 'QuickRPA Tokens'"),
    modes: z.array(z.string()).optional().describe("Optional mode names, e.g. ['Light','Dark']. The first renames the default mode; the rest are added."),
});

export type CreateVariableCollectionParams = z.infer<typeof CreateVariableCollectionParamsSchema>;
