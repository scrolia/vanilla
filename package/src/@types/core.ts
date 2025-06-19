import type { Signal } from "@preact/signals-core";
import type { Format } from "ts-vista";

import type {
    CompleteOptionsBase,
    IndividualOptionsBase,
    SharedIndividualOptions,
} from "#/@types/options";

type CoreStatesOptions = Format<
    SharedIndividualOptions & Partial<IndividualOptionsBase>
>;

type CoreStates = {
    options: CoreStatesOptions;
    hvTrack: Signal<boolean>;
    hvThumb: Signal<boolean>;
    timeout: Signal<number | null>;
    total: Signal<number>;
    view: Signal<number>;
    viewOffset: Signal<number>;
    scrollbarLength: Signal<number>;
    scrollbarOffset: Signal<number>;
    isActive: Signal<boolean>;
};

type CoreOptions = CompleteOptionsBase;

type Core = {
    options: CoreOptions;
    content: Signal<HTMLElement | null>;
    x: CoreStates;
    y: CoreStates;
};

export type { CoreStatesOptions, CoreStates, CoreOptions, Core };
