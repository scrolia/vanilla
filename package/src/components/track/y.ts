import type { ScrollCore } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";

/** Options for the `createTrackY` function. */
type CreateTrackYOptions = {
    core: ScrollCore;
};

/** Result of the `createTracky` function. */
type CreateTrackY = CreateComponent;

/** Creates a vertical track. */
const createTrackY = (options: CreateTrackYOptions): CreateTrackY => {
    const {
        options: { disabled },
        y: { hvTrack },
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

export type { CreateTrackYOptions, CreateTrackY };
export { createTrackY };
