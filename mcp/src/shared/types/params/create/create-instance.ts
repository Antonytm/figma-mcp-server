import z from "zod";

export const CreateInstanceParamsSchema = z.object({
    componentId: z.string().describe("Component id"),
    name: z.string().optional().default("Instance").describe("Name"),
    parentId: z.string().regex(/^\d*:\d*$/).optional().describe("Parent node id (page:node)"),
    x: z.number().optional().default(0).describe("X coordinate"),
    y: z.number().optional().default(0).describe("Y coordinate")
});

export type CreateInstanceParams = z.infer<typeof CreateInstanceParamsSchema>;