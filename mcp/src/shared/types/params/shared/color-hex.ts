import z from "zod";

export const ColorHexSchema = z.string()
    .regex(/^#([0-9a-fA-F]{8})$/)
    .describe("RGBA hex color (e.g. #000000FF)");

export type ColorHex = z.infer<typeof ColorHexSchema>;