import { z } from "zod";

export const CreateSvgParamsSchema = z.object({
    svg: z.string().describe("Raw SVG markup, e.g. '<svg viewBox=\"0 0 24 24\"><path d=\"...\"/></svg>'. Imported as real vector layers."),
    x: z.number().default(0),
    y: z.number().default(0),
    name: z.string().default("Icon"),
    width: z.number().optional().describe("Optional width to resize the imported vector to"),
    height: z.number().optional().describe("Optional height to resize the imported vector to"),
    fillColor: z.string().regex(/^#([0-9a-fA-F]{8})$/).optional().describe("Optional RGBA hex applied to every vector inside"),
    parentId: z.string().regex(/^\d*:\d*$/).optional(),
});

export type CreateSvgParams = z.infer<typeof CreateSvgParamsSchema>;
