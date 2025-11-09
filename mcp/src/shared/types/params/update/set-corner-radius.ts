import z from "zod";

export const SetCornerRadiusParamsSchema = z.object({
    id: z.string().describe("Node id"),
    cornerRadius: z.number().describe("Corner radius"),
    topLeftRadius: z.number().optional().describe("Top left corner radius"),
    topRightRadius: z.number().optional().describe("Top right corner radius"),
    bottomLeftRadius: z.number().optional().describe("Bottom left corner radius"),
    bottomRightRadius: z.number().optional().describe("Bottom right corner radius"),
});

export type SetCornerRadiusParams = z.infer<typeof SetCornerRadiusParamsSchema>;