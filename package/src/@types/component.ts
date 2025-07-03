import type * as Atom from "atomico";
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

/** Component types. */
type ComponentTypes<Component> = DOM.AtomicoThis<Atom.Props<Component>>;

export type { CSSProperties, ComponentProps, ComponentTypes };
