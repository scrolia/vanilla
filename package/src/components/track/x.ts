import type { ScrollCore } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";

/** Options for the `createTrackX` function. */
type CreateTrackXOptions = {
    core: ScrollCore;
};

/** Result of the `createTrackX` function. */
type CreateTrackX = CreateComponent;

/** Creates a horizontal track. */
const createTrackX = (options: CreateTrackXOptions): CreateTrackX => {
    const {
        options: { disabled },
        x: { hvTrack },
    } = options.core;

    const attach = (_: HTMLElement): (() => void) => {
        if (disabled) return () => void 0;

        let cleanups: (() => void)[] = [];

        hvTrack.value = true;

        return (): void => {
            for (const cleanup of cleanups) cleanup();
            cleanups = [];
        };
    };

    return {
        attach,
    };
};

export type { CreateTrackXOptions, CreateTrackX };
export { createTrackX };
