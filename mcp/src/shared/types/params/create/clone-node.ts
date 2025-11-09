import z from "zod";

export const CloneNodeParamsSchema = z.object({
    id: z.string().regex(/^\d*:\d*$/).describe("Node id (page:node)")
});

export type CloneNodeParams = z.infer<typeof CloneNodeParamsSchema>;