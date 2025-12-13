export function serializeNode(node: SceneNode, visited: Set<string> = new Set()): any {

    /*
    // ToDo: Investigate if it is possible to serialize the node with using the exportAsync method, but skipping the children and other properties that are not needed.
    const json = node.exportAsync(
        { format: 'JSON_REST_V1' })
        .then((result: any) => {
            return result;
        });
        */

    // Avoid circular references
    if (visited.has(node.id)) {
        return { id: node.id, _circular: true };
    }
    visited.add(node.id);

    const result: any = {};

    // Get all property names from the node and its prototype chain
    let current: any = node;
    const allProps = new Set<string>();

    while (current && current !== Object.prototype) {
        Object.getOwnPropertyNames(current).forEach(prop => {
            if (!prop.startsWith('__')) {
                allProps.add(prop);
            }
        });
        current = Object.getPrototypeOf(current);
    }


    allProps.forEach(prop => {
        //console.log(prop);
        //console.log(typeof (node as any)[prop]);
        // Skip functions and internal properties
        if (prop === 'parent'
            || prop === 'removed'
            || prop === 'instances'
            || prop === 'mainComponent'
            || prop === 'masterComponent'
            || typeof (node as any)[prop] === 'function'
            ) {
            return;
        }

        if (prop === 'children') {
            // serialize only ids, names and types
            result[prop] = (node as any)[prop].map((child: any) => {
                return {
                    id: child.id,
                    name: child.name,
                    type: child.type,
                };
            });
            return;
        }

        try {
            const value = (node as any)[prop];

            if (value === undefined || value === null) {
                return;
            }

            //if figma.mixed, ignore property
            if (value === figma.mixed) {
                return;
            }

            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    result[prop] = value.map((item: any) => {
                        if (item && typeof item === 'object' && 'id' in item) {
                            return serializeNode(item, visited);
                        }
                        return item;
                    });
                } else if ('id' in value && typeof value.id === 'string') {
                    // It's another node, serialize it but avoid deep circular refs
                    result[prop] = { id: value.id };
                } else {
                    // Regular object, try to serialize it
                    try {
                        result[prop] = JSON.parse(JSON.stringify(value));
                    } catch (error) {
                        result[prop] = String(value);
                    }
                }
            } else {
                result[prop] = value;
            }
        } catch (error) {
            // Skip properties that cause errors
            void error; // Prevent optimization of catch parameter
        }
    });

    return result;
}