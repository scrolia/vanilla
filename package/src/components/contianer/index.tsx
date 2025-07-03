import type { ComponentTypes } from "#/@types/component";

import * as Atom from "atomico";

import { useLengthHandler } from "#/hooks/length";
import { useComponentPropsSetter } from "#/hooks/props";
import { useScrollHandler } from "#/hooks/scroll";

const _Container = () => {
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
type ContainerElement = ComponentTypes<typeof _Container>;

const Container = Atom.c(_Container);

export type { ContainerElement };
export { Container };
