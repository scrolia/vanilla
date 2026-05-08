import type * as DOM from "atomico/types/dom";
import type * as CSS from "csstype";
import type { Omit, Partial } from "ts-vista";

/** CSS properties. */
type CSSProperties = CSS.Properties<string | number>;

/** Component properties. */
type ComponentProps<T extends keyof HTMLElementTagNameMap> = Partial<
    Omit<HTMLElementTagNameMap[T], "style"> & {
        style: CSSProperties;
    }
>;

type Writable<T> = {
    -readonly [K in keyof T]: T[K];
};

type InferPropType<T> = T extends BooleanConstructor
    ? boolean
    : T extends StringConstructor
      ? string
      : T extends NumberConstructor
        ? number
        : T extends ArrayConstructor
          ? unknown[]
          : T extends ObjectConstructor
            ? Record<string, unknown>
            : T;

type ExtractTypes<
    T extends Record<
        PropertyKey,
        {
            type: unknown;
        }
    >,
> = Writable<{
    [K in keyof T]: InferPropType<T[K]["type"]>;
}>;

/** Component types. */
type ComponentTypes<
    Props extends Record<
        PropertyKey,
        {
            type: unknown;
        }
    > = Record<
        PropertyKey,
        {
            type: unknown;
        }
    >,
> = DOM.AtomicoThis<ExtractTypes<Props>>;

export type { ComponentProps, ComponentTypes, CSSProperties };
