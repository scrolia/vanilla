import type * as DOM from "atomico/types/dom";

import type { ComponentTypes } from "#/@types/component";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";
import { useComponentPropsSetter } from "#/hooks/props";
import { useThumbYHandler } from "#/hooks/thumb";

const _ThumbY = (): Atom.Host<any> => {
    const elRef: Required<Atom.Ref<DOM.AtomicoThis>> = Atom.useHost();

    const {
        options: { disabled },
        y: { setHvThumb, scrollbarLength, scrollbarOffset },
    } = useScrollCore();

    Atom.useEffect((): void => {
        setHvThumb(true);
    });

    const { onPointerDown } = useThumbYHandler();

    Atom.useEffect((): (() => void) => {
        elRef.current.addEventListener("pointerdown", onPointerDown);

        return (): void => {
            elRef.current.removeEventListener("pointerdown", onPointerDown);
        };
    }, [
        onPointerDown,
    ]);

    useComponentPropsSetter("thumbY");

    Atom.useEffect((): void => {
        if (disabled) return void 0;

        const length: number = Number.isNaN(scrollbarLength)
            ? 0
            : scrollbarLength;

        const offset: number = Number.isNaN(scrollbarOffset)
            ? 0
            : scrollbarOffset;

        elRef.current.style.height = `${length}px`;
        elRef.current.style.top = `${offset}px`;
    }, [
        disabled,
        scrollbarLength,
        scrollbarOffset,
    ]);

    return (
        <host shadowDom>
            <slot />
        </host>
    );
};

/** Scrollbar thumb Y type. */
type ThumbYElement = ComponentTypes<typeof _ThumbY>;

const ThumbY = Atom.c(_ThumbY);

export type { ThumbYElement };
export { ThumbY };
