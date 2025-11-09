export function serializeSceneNode(sceneNode: SceneNode): string {
    return JSON.stringify({
        x: sceneNode.x,
        y: sceneNode.y,
        width: sceneNode.width,
        height: sceneNode.height,
        name: sceneNode.name,
        parentId: sceneNode.parent
            ? `${sceneNode.parent.id}:${sceneNode.parent.type}`
            : undefined
    });
}