import { z } from "zod";

export const BindVariableParamsSchema = z.object({
    nodeId: z.string().describe("Node id (page:node)"),
    variableId: z.string().describe("Variable id from create-variable or get-variables"),
    field: z.string().describe("Property to bind: 'fills' or 'strokes' for colour, or a numeric field such as cornerRadius, itemSpacing, paddingLeft, width, height, opacity. For TEXT nodes 'fills' binds the text colour."),
});

export type BindVariableParams = z.infer<typeof BindVariableParamsSchema>;
