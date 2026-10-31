import { z } from "zod";

export const RenameNodeParamsSchema = z.object({
    id: z.string().describe("Node id (page:node)"),
    name: z.string().describe("New layer name"),
});

export type RenameNodeParams = z.infer<typeof RenameNodeParamsSchema>;
