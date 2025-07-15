import type { ComponentTypes } from "#/@types/component";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";
import { useComponentPropsSetter } from "#/hooks/props";

const _TrackY = () => {
    const {
        y: { setHvTrack },
    } = useScrollCore();

    Atom.useEffect((): void => {
        setHvTrack(true);
    });

    useComponentPropsSetter("trackY");

    return (
        <host shadowDom>
            <slot />
        </host>
    );
};

/** Scrollbar track Y type. */
type TrackYElement = ComponentTypes<typeof _TrackY>;

const TrackY = Atom.c(_TrackY);

export type { TrackYElement };
export { TrackY };
