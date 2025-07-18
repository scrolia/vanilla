import type { ComponentProps } from "#/@types/component";
import type { Plugin } from "#/@types/options";

import { mergeClassNames } from "#/functions/classname";
import { tryPlugin } from "#/functions/plugin";

/** Component name. */
type GetComponentPropsName =
    | "provider"
    | "container"
    | "content"
    | "trackX"
    | "trackY"
    | "thumbX"
    | "thumbY";

/** Options for the `getComponentProps` function. */
type GetComponentPropsOptions<P> = {
    name: GetComponentPropsName;
    props: P;
    plugins: Plugin[];
};

/** Get component props. */
const getComponentProps = <P extends object>(
    options: GetComponentPropsOptions<P>,
): P => {
    const { name, props, plugins } = options;

    let result: P = {
        ...props,
        className: (props as any).class ?? (props as any).className,
    };

    for (const plugin of plugins) {
        if (!plugin.props?.[name]) continue;

        const newResult: ComponentProps<"div"> = tryPlugin(
            plugin,
            plugin.props[name],
            result,
        );

        result = {
            ...result,
            ...newResult,
            ...(newResult.id
                ? {
                      id: mergeClassNames(newResult.id),
                  }
                : {}),
            ...(newResult.className
                ? {
                      className: mergeClassNames(newResult.className),
                  }
                : {}),
        };
    }

    return result;
};

export type { GetComponentPropsName, GetComponentPropsOptions };
export { getComponentProps };
