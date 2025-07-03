import type { ComponentTypes } from "#/@types/component";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";
import { useComponentPropsSetter } from "#/hooks/props";

const _TrackX = () => {
    const {
        options: { disabled },
        x: { setHvTrack },
    } = useScrollCore();

    Atom.useEffect((): void => {
        setHvTrack(true);
    });

    useComponentPropsSetter("trackX");

    if (disabled) return <host>{}</host>;

    return (
        <host shadowDom>
            <slot />
        </host>
    );
};

/** Scrollbar track X type. */
type TrackXElement = ComponentTypes<typeof _TrackX>;

const TrackX = Atom.c(_TrackX);

export type { TrackXElement };
export { TrackX };
