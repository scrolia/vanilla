import type * as CSS from "csstype";
import type { Omit, Partial } from "ts-vista";

/** CSS properties. */
type CSSProperties = CSS.Properties<string | number>;

/** Element properties. */
type ElementProps<T extends keyof HTMLElementTagNameMap> = Partial<
    Omit<HTMLElementTagNameMap[T], "style"> & {
        style: CSSProperties;
    }
>;

type CreateComponent = {
    /**
     * Attaches scrollbar component function into the element.
     */
    attach: (el: HTMLElement) => () => void;
};

export type { CSSProperties, ElementProps, CreateComponent };
