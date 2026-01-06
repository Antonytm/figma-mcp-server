import { z } from "zod";

export const SetLayoutParamsSchema = z.object({
    id: z.string().describe("Node id"),
    mode: z.enum(["NONE", "HORIZONTAL", "VERTICAL"]).describe("Layout mode"),
    wrap: z.boolean().optional().describe("Layer should use wrapping auto-layout"),
    clip: z.boolean().optional().describe("Clip content"),
    itemSpacing: z.number().optional().describe("Distance between children"),
    primaryAxisAlignItems: z.enum(["MIN", "MAX", "CENTER", "SPACE_BETWEEN"]).optional().describe("Primary axis align content"),
    counterAxisAlignItems: z.enum(["MIN", "MAX", "CENTER", "SPACE_BETWEEN"]).optional().describe("Counter axis align content"),
    paddingLeft: z.number().optional().describe("Left padding"),
    paddingRight: z.number().optional().describe("Right padding"),
    paddingTop: z.number().optional().describe("Top padding"),
    paddingBottom: z.number().optional().describe("Bottom padding"),
    layoutSizingVertical: z.enum(["FIXED", "HUG", "FILL"]).optional().describe("Vertical layout sizing"),
    layoutSizingHorizontal: z.enum(["FIXED", "HUG", "FILL"]).optional().describe("Horizontal layout sizing"),
});

export type SetLayoutParams = z.infer<typeof SetLayoutParamsSchema>;