import type { Format, Partial } from "ts-vista";

type SharedIndividualOptions = {
    /**
     * Set the length of the scrollbar.
     *
     * By default, it match with the default style.
     */
    setScrollbarLength: (length: number) => number;
    /**
     * The class name for track active state in headless mode.
     *
     * By default, it is disabled with `false`.
     */
    activeTrackClassName: string | false;
    /**
     * The class name for thumb active state in headless mode.
     *
     * By default, it is disabled with `false`.
     */
    activeThumbClassName: string | false;
};

/** Options for the `onActive` function. */
type OnActiveOptions = {
    /**
     * Whether the scrollbar is active or not.
     */
    isActive: boolean;
};

type IndividualOptionsBase = {
    /**
     * Triggered on scrollbar active state change.
     */
    onActive: (options: OnActiveOptions) => void;
};

type CompleteIndividualOptions = SharedIndividualOptions &
    IndividualOptionsBase;

/** Individual options for each axis. */
type IndividualOptions = Format<Partial<CompleteIndividualOptions>>;

type CompleteOptionsBase = {
    /**
     * Whether disable the scrollbar.
     *
     * By default, it is `false`.
     */
    disabled: boolean;
    /**
     * Whether the scrollbar serve for a page.
     *
     * By default, it is `false`.
     */
    page: boolean;
    /**
     * Whether enable headless mode.
     *
     * By default, it is `false`.
     */
    headless: boolean;
};

type CompleteOptions = Format<
    CompleteOptionsBase &
        SharedIndividualOptions & {
            /**
             * Individual options for horizontal scrollbar.
             */
            x: CompleteIndividualOptions;
            /**
             * Individual options for vertical scrollbar.
             */
            y: CompleteIndividualOptions;
        }
>;

/** Scrollbar options. */
type Options = Format<
    Partial<CompleteOptionsBase> &
        Partial<SharedIndividualOptions> &
        Partial<{
            /**
             * Individual options for horizontal scrollbar.
             */
            x: IndividualOptions;
            /**
             * Individual options for vertical scrollbar.
             */
            y: IndividualOptions;
        }>
>;

export type {
    SharedIndividualOptions,
    OnActiveOptions,
    IndividualOptionsBase,
    CompleteIndividualOptions,
    IndividualOptions,
    CompleteOptionsBase,
    CompleteOptions,
    Options,
};
