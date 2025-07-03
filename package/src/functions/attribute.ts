const getPropsFromAttributes = (
    attributes: NamedNodeMap,
): Record<string, string> => {
    const props: Record<string, string> = {};

    for (const attribute of attributes) {
        props[attribute.name] = attribute.value;
    }

    return props;
};

export { getPropsFromAttributes };
