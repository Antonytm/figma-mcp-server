import z from "zod";

export const DeleteNodeParamsSchema = z.object({
    id: z.string().regex(/^\d*:\d*$/).describe("Node id (page:node)"),
});

export type DeleteNodeParams = z.infer<typeof DeleteNodeParamsSchema>;