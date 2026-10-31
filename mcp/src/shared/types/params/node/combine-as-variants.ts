import { z } from "zod";

export const CombineAsVariantsParamsSchema = z.object({
    nodeIds: z.array(z.string()).min(2).describe("Ids of two or more COMPONENT nodes to combine into one variant set. Name each component 'Prop=Value' first, e.g. 'Active=Robots'."),
    name: z.string().describe("Name for the resulting component set"),
    parentId: z.string().regex(/^\d*:\d*$/).optional(),
});

export type CombineAsVariantsParams = z.infer<typeof CombineAsVariantsParamsSchema>;
