import z from "zod";

export const ComponentPropertySchema = z.object({
    name: z.string().describe("Property name"),
    type: z.enum(['BOOLEAN', 'TEXT', 'INSTANCE_SWAP', 'VARIANT']).describe("Property type"),
    defaultValue: z.union([z.string(), z.boolean()]).describe("Property value"),
});

export type ComponentProperty = z.infer<typeof ComponentPropertySchema>;