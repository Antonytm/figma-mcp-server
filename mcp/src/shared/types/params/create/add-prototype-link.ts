import z from "zod";

export const AddPrototypeLinkParamsSchema = z.object({
    nodeId: z.string().regex(/^\d+:\d+$/).describe("Source node id to add the click action to (page:node)"),
    destinationId: z.string().regex(/^\d+:\d+$/).describe("Target node id to navigate to (page:node)"),
    trigger: z.enum(["ON_CLICK", "ON_HOVER", "ON_PRESS", "ON_DRAG"]).optional().default("ON_CLICK").describe("Trigger type"),
    navigation: z.enum(["NAVIGATE", "OVERLAY", "SWAP", "CHANGE_TO"]).optional().default("NAVIGATE").describe("Navigation type"),
    transition: z.enum(["DISSOLVE", "SMART_ANIMATE", "MOVE_IN", "MOVE_OUT", "PUSH", "SLIDE_IN", "SLIDE_OUT", "INSTANT"]).optional().default("DISSOLVE").describe("Transition type"),
    duration: z.number().optional().default(300).describe("Transition duration in ms"),
});

export type AddPrototypeLinkParams = z.infer<typeof AddPrototypeLinkParamsSchema>;
