import { AddPrototypeLinkParams } from "@shared/types";
import { ToolResult } from "../tool-result";

export async function addPrototypeLink(args: AddPrototypeLinkParams): Promise<ToolResult> {
    var sourceNode = await figma.getNodeByIdAsync(args.nodeId);
    if (!sourceNode) {
        return { isError: true, content: "Source node not found" };
    }

    var destinationNode = await figma.getNodeByIdAsync(args.destinationId);
    if (!destinationNode) {
        return { isError: true, content: "Destination node not found" };
    }

    if (!("reactions" in sourceNode)) {
        return { isError: true, content: "Source node does not support reactions" };
    }

    var sceneNode = sourceNode as SceneNode;

    // Build transition - match exact Figma format
    var transition: any = null;
    if (args.transition !== "INSTANT") {
        var directional = ["MOVE_IN", "MOVE_OUT", "PUSH", "SLIDE_IN", "SLIDE_OUT"];
        if (directional.indexOf(args.transition) >= 0) {
            transition = {
                type: args.transition,
                direction: "LEFT",
                matchLayers: false,
                duration: args.duration / 1000,
                easing: { type: "EASE_IN_AND_OUT" }
            };
        } else {
            transition = {
                type: args.transition,
                duration: args.duration / 1000,
                easing: { type: "EASE_IN_AND_OUT" }
            };
        }
    }

    // Match exact Figma reaction format - both action and actions
    var actionObj: any = {
        type: "NODE",
        destinationId: args.destinationId,
        navigation: args.navigation,
        transition: transition,
        resetVideoPosition: false
    };

    var reaction: any = {
        action: actionObj,
        actions: [actionObj],
        trigger: { type: args.trigger }
    };

    const existing = sceneNode.reactions || [];
    const existingReactions: any[] = [...existing, reaction];

    await sceneNode.setReactionsAsync(existingReactions);

    return {
        isError: false,
        content: "Prototype link added: " + sceneNode.name + " -> " + destinationNode.name
    };
}
