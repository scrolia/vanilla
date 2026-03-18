import type { Context } from "atomico/types/context";

import type { CompleteOptions } from "#/@types/options";

import * as Atom from "atomico";

/** Options for the `ScrollCore` context. */
type ScrollCoreOptions = CompleteOptions;

/** States for the `ScrollCore` context. */
type ScrollCoreStates = {
    hvTrack: boolean;
    setHvTrack: Atom.SetState<boolean>;
    hvThumb: boolean;
    setHvThumb: Atom.SetState<boolean>;
    total: Atom.Ref<number>;
    view: Atom.Ref<number>;
    viewOffset: Atom.Ref<number>;
    scrollbarLength: number;
    setScrollbarLength: Atom.SetState<number>;
    scrollbarOffset: number;
    setScrollbarOffset: Atom.SetState<number>;
};

const useScrollCoreStates = (): ScrollCoreStates => {
    const [hvTrack, setHvTrack] = Atom.useState<boolean>(false);
    const [hvThumb, setHvThumb] = Atom.useState<boolean>(false);

    const total: Atom.Ref<number> = Atom.useRef<number>(0);

    const view: Atom.Ref<number> = Atom.useRef<number>(0);

    const viewOffset: Atom.Ref<number> = Atom.useRef<number>(0);

    const [scrollbarLength, setScrollbarLength] = Atom.useState<number>(0);

    const [scrollbarOffset, setScrollbarOffset] = Atom.useState<number>(0);

    return {
        hvTrack,
        setHvTrack,
        hvThumb,
        setHvThumb,
        total,
        view,
        viewOffset,
        scrollbarLength,
        setScrollbarLength,
        scrollbarOffset,
        setScrollbarOffset,
    };
};

/** Core for internal logic. */
type ScrollCore = {
    options: ScrollCoreOptions;
    contentRef: Atom.Ref<HTMLElement | null>;
    x: ScrollCoreStates;
    y: ScrollCoreStates;
};

/** `ScrollCore` context. */
const ScrollCoreContext: Context<ScrollCore | null> =
    Atom.createContext<ScrollCore | null>(null);

/** Hook for using the `ScrollCore` context. */
const useScrollCore = (): ScrollCore => {
    const core: ScrollCore | null = Atom.useContext(ScrollCoreContext);

    if (core === null) {
        throw new Error("useScrollCore must be used within a provider");
    }

    return core;
};

export type { ScrollCore, ScrollCoreOptions, ScrollCoreStates };
export { ScrollCoreContext, useScrollCore, useScrollCoreStates };
