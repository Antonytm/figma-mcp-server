import z from "zod";

export const CreateRectangleParamsSchema = z.object({
    x: z.number().describe("x coordinate of the rectangle"),
    y: z.number().describe("y coordinate of the rectangle"),
    width: z.number().describe("Width of the rectangle"),
    height: z.number().describe("Height of the rectangle"),
    name: z.string().optional().default("Rectangle").describe("Name of the rectangle"),
    parentId: z.string().regex(/^\d+:\d+$/).optional().describe("Parent node id (page:node)"),
});

export type CreateRectangleParams = z.infer<typeof CreateRectangleParamsSchema>;