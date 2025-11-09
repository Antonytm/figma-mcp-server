import { serializeSceneNode } from "./serialize-scene-node";

export function serializeFrame(frame: FrameNode): string {
    return serializeSceneNode(frame);
}