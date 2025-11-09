import z from "zod";

export const CreateRectangleParamsSchema = z.object({
    x: z.number().describe("X coordinate"),
    y: z.number().describe("Y coordinate"),
    width: z.number().describe("Width"),
    height: z.number().describe("Height"),
    name: z.string().optional().default("Rectangle").describe("Name"),
    parentId: z.string().regex(/^\d*:\d*$/).optional().describe("Parent node id (page:node)"),
});

export type CreateRectangleParams = z.infer<typeof CreateRectangleParamsSchema>;