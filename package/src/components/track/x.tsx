import type { ComponentTypes } from "#/@types/component";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";
import { useComponentPropsSetter } from "#/hooks/props";

const _TrackX = (): Atom.JSX => {
    const {
        x: { setHvTrack },
    } = useScrollCore();

    Atom.useEffect((): void => {
        setHvTrack(true);
    });

    useComponentPropsSetter("trackX");

    return (
        <host shadowDom>
            <slot />
        </host>
    );
};

/** Scrollbar track X type. */
type TrackXElement = ComponentTypes;

const TrackX = Atom.c(_TrackX);

export type { TrackXElement };
export { TrackX };
