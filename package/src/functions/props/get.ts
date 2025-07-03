import type { ComponentProps } from "#/@types/component";
import type { Plugin } from "#/@types/options";

import { mergeClassNames } from "#/functions/classname";

type GetComponentPropsName =
    | "provider"
    | "container"
    | "content"
    | "trackX"
    | "trackY"
    | "thumbX"
    | "thumbY";

type GetComponentPropsOptions<P> = {
    name: GetComponentPropsName;
    props: P;
    plugins: Plugin[];
};

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

        const newResult: ComponentProps<"div"> = plugin.props[name](result);

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
