const mergeClassNames = (...classNames: string[]): string => {
    const allClasses: string[] = classNames.flatMap((name: string): string[] =>
        name.split(/\s+/).filter(Boolean),
    );

    const uniqueCLasses: Set<string> = new Set(allClasses);

    return Array.from(uniqueCLasses).join(" ");
};

export { mergeClassNames };
