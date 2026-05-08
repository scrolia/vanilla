import type { ComponentTypes } from "#/@types/component";

import * as Atom from "atomico";

import { useLengthHandler } from "#/hooks/length";
import { useComponentPropsSetter } from "#/hooks/props";
import { useScrollHandler } from "#/hooks/scroll";

const _Container = (): Atom.JSX => {
    useLengthHandler();
    useScrollHandler();
    useComponentPropsSetter("container");

    return (
        <host shadowDom>
            <slot />
        </host>
    );
};

/** Scrollbar container type. */
type ContainerElement = ComponentTypes;

const Container = Atom.c(_Container);

export type { ContainerElement };
export { Container };
