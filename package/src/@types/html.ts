type PartialStyle<T> = {
    [K in keyof T]: K extends "style" ? Partial<CSSStyleDeclaration> : T[K];
};

type HTMLAttributes<T extends keyof HTMLElementTagNameMap> = {
    [K in keyof PartialStyle<HTMLElementTagNameMap[T]>]?: PartialStyle<
        HTMLElementTagNameMap[T]
    >[K];
};

type CreateComponent = {
    /**
     * Attaches scrollbar component function into the element.
     */
    attach: (el: HTMLElement) => () => void;
};

export type { PartialStyle, HTMLAttributes, CreateComponent };
