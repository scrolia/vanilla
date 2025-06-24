import type { Signal } from "@preact/signals-core";
import type { Format } from "ts-vista";

import type { CompleteOptions } from "#/@types/options";

/** Options for the `ScrollCore` context. */
type ScrollCoreOptions = Format<
    Pick<CompleteOptions, "disabled" | "page"> & Partial<CompleteOptions>
>;

type ScrollCoreStates = {
    hvTrack: Signal<boolean>;
    hvThumb: Signal<boolean>;
    total: Signal<number>;
    view: Signal<number>;
    viewOffset: Signal<number>;
    scrollbarLength: Signal<number>;
    scrollbarOffset: Signal<number>;
};

type ScrollCore = {
    options: ScrollCoreOptions;
    content: Signal<HTMLElement | null>;
    x: ScrollCoreStates;
    y: ScrollCoreStates;
};

export type { ScrollCoreOptions, ScrollCoreStates, ScrollCore };
