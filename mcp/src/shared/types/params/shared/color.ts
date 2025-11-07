import z from "zod";

export const ColorSchema = z.object({
    r: z.number().min(0).max(1).describe("Red component (0-1)"),
    g: z.number().min(0).max(1).describe("Green component (0-1)"),
    b: z.number().min(0).max(1).describe("Blue component (0-1)"),
    a: z
        .number()
        .min(0)
        .max(1)
        .optional()
        .describe("Alpha component (0-1)"),
});

export type Color = z.infer<typeof ColorSchema>;