export function serializeInstance(instance: InstanceNode): string {
    const properties = instance.componentProperties;
    return JSON.stringify({
        id: instance.id,
        name: instance.name,
        x: instance.x,
        y: instance.y,
        parentId: instance.parent ? `${instance.parent.id}` : undefined,
        properties: properties,
    });
}