import { z } from "zod";

export const SetNodeStyleParamsSchema = z.object({
    id: z.string().describe("Node id (page:node)"),
    fillColor: z.string().regex(/^#([0-9a-fA-F]{8})$/).optional().describe("RGBA hex fill"),
    strokeColor: z.string().regex(/^#([0-9a-fA-F]{8})$/).optional().describe("RGBA hex stroke"),
    strokeWeight: z.number().optional(),
    cornerRadius: z.number().optional(),
    opacity: z.number().optional(),
    visible: z.boolean().optional(),
});

export type SetNodeStyleParams = z.infer<typeof SetNodeStyleParamsSchema>;
