import z from "zod";
import { ColorSchema } from "../shared/color.js";

export const CreateFrameParamsSchema = z.object({
    x: z.number().describe("X coordinate"),
    y: z.number().describe("Y coordinate"),
    width: z.number().describe("Width"),
    height: z.number().describe("Height"),
    name: z.string().optional().default("Frame").describe("Name"),
    parentId: z.string().regex(/^\d*:\d*$/).optional().describe("Parent node id (page:node)"),
});

export type CreateFrameParams = z.infer<typeof CreateFrameParamsSchema>;