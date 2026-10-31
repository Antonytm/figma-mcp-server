import { z } from "zod";

export const SetTextCharactersParamsSchema = z.object({
    id: z.string().describe("Text node id (page:node)"),
    characters: z.string().describe("New text content. Replaces the node's existing text in place, keeping its id, position and styling."),
});

export type SetTextCharactersParams = z.infer<typeof SetTextCharactersParamsSchema>;
