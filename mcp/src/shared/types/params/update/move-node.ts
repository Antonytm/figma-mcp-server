import z from "zod";

export const MoveNodeParamsSchema = z.object({
    id: z.string().describe("Node id"),
    x: z.number().describe("X coordinate"),
    y: z.number().describe("Y coordinate"),
});

export type MoveNodeParams = z.infer<typeof MoveNodeParamsSchema>;