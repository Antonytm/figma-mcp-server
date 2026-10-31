import { z } from "zod";

export const SetTextStyleParamsSchema = z.object({
    id: z.string().describe("Text node id (page:node)"),
    fontSize: z.number().optional().describe("Font size in px"),
    fontName: z.string().optional().describe("Font family, e.g. Nunito"),
    fontWeight: z.number().optional().describe("Font weight (400 Regular, 500 Medium, 700 Bold)"),
    fontColor: z.string().regex(/^#([0-9a-fA-F]{8})$/).optional().describe("RGBA hex colour, e.g. #1A1A1AFF"),
    textAlignHorizontal: z.enum(["LEFT", "CENTER", "RIGHT", "JUSTIFIED"]).optional(),
    textAlignVertical: z.enum(["TOP", "CENTER", "BOTTOM"]).optional(),
    textAutoResize: z.enum(["NONE", "WIDTH_AND_HEIGHT", "HEIGHT", "TRUNCATE"]).optional(),
    lineHeightPx: z.number().optional().describe("Line height in px"),
    letterSpacingPx: z.number().optional().describe("Letter spacing in px"),
});

export type SetTextStyleParams = z.infer<typeof SetTextStyleParamsSchema>;
