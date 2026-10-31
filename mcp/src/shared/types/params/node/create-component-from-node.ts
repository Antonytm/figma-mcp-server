import { z } from "zod";

export const CreateComponentFromNodeParamsSchema = z.object({
    id: z.string().describe("Node id (page:node) to convert into a component in place"),
    name: z.string().optional().describe("Optional new component name"),
    description: z.string().optional().describe("Optional component description"),
});

export type CreateComponentFromNodeParams = z.infer<typeof CreateComponentFromNodeParamsSchema>;
