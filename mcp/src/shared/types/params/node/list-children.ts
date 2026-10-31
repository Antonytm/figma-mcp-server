import { z } from "zod";

export const ListChildrenParamsSchema = z.object({
    id: z.string().describe("Container node id (page:node). Use '0:1' for the page itself."),
    depth: z.number().optional().default(1).describe("How many levels deep to walk. 1 = direct children only."),
});

export type ListChildrenParams = z.infer<typeof ListChildrenParamsSchema>;
