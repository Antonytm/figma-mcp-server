import { z } from "zod";

export const SetNodeComponentPropertyReferencesParamsSchema = z.object({
    id: z.string().regex(/^\d*:\d*$/).describe("Node id (page:node)"),
    componentPropertyReferences: z.partialRecord(z.enum(['characters', 'visible', 'mainComponent']), z.string()).describe("Component property references"),
});

export type SetNodeComponentPropertyReferencesParams = z.infer<typeof SetNodeComponentPropertyReferencesParamsSchema>;