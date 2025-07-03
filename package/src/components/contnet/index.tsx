import type { ComponentTypes } from "#/@types/component";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";
import { useComponentPropsSetter } from "#/hooks/props";

const _Content = () => {
    const { contentRef } = useScrollCore();

    useComponentPropsSetter("content");

    return (
        <host
            shadowDom
            ref={contentRef}
        >
            <slot />
        </host>
    );
};

/** Scrollbar content type. */
type ContentElement = ComponentTypes<typeof _Content>;

const Content = Atom.c(_Content);

export type { ContentElement };
export { Content };
