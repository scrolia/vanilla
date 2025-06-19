import type { Core } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";

import { effect } from "@preact/signals-core";

type CreateTrackYOptions = {
    core: Core;
};

/** Result of the `createTrackY` function. */
type CreateTrackY = CreateComponent;

const createTrackY = (options: CreateTrackYOptions): CreateTrackY => {
    const {
        options: { disabled, headless, page },
        y,
    } = options.core;

    const attach = (el: HTMLElement): (() => void) => {
        if (disabled) return () => void 0;

        let cleanups: (() => void)[] = [];

        y.hvTrack.value = true;

        if (!headless) {
            el.classList.add("sla-track", "sla-y");
            !page && el.classList.add("sla-child");
        }

        cleanups.push((): void => {
            if (!headless) {
                el.classList.remove("sla-track", "sla-y");
                !page && el.classList.remove("sla-child");
            }
        });

        // for headless customization
        const cleanupClassEffect = effect((): void => {
            const {
                options: { activeTrackClassName },
            } = y;

            if (!headless || activeTrackClassName === false) return void 0;

            if (y.isActive.value) {
                el.classList.add(activeTrackClassName);
            } else {
                el.classList.remove(activeTrackClassName);
            }
        });

        cleanups.push(cleanupClassEffect);

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
