import type * as DOM from "atomico/types/dom";

import type { ComponentTypes } from "#/@types/component";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";
import { useComponentPropsSetter } from "#/hooks/props";
import { useThumbXHandler } from "#/hooks/thumb/x";

const _ThumbX = () => {
    const elRef: Required<Atom.Ref<DOM.AtomicoThis>> = Atom.useHost();

    const {
        options: { disabled },
        x: { setHvThumb, scrollbarLength, scrollbarOffset },
    } = useScrollCore();

    Atom.useEffect((): void => {
        setHvThumb(true);
    });

    const { onPointerDown } = useThumbXHandler();

    Atom.useEffect((): (() => void) => {
        elRef.current.addEventListener("pointerdown", onPointerDown);

        return (): void => {
            elRef.current.removeEventListener("pointerdown", onPointerDown);
        };
    }, [
        onPointerDown,
    ]);

    useComponentPropsSetter("thumbX");

    Atom.useEffect((): void => {
        if (disabled) return void 0;

        const length: number = Number.isNaN(scrollbarLength)
            ? 0
            : scrollbarLength;

        const offset: number = Number.isNaN(scrollbarOffset)
            ? 0
            : scrollbarOffset;

        elRef.current.style.width = `${length}px`;
        elRef.current.style.left = `${offset}px`;
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

/** Scrollbar thumb X type. */
type ThumbXElement = ComponentTypes<typeof _ThumbX>;

const ThumbX = Atom.c(_ThumbX);

export type { ThumbXElement };
export { ThumbX };
