import type { Core } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";

type CreateContainerOptions = {
    core: Core;
};

/** Result of the `createContainer` function. */
type CreateContainer = CreateComponent;

const createContainer = (options: CreateContainerOptions): CreateContainer => {
    const {
        options: { headless },
    } = options.core;

    const attach = (el: HTMLElement): (() => void) => {
        let cleanups: (() => void)[] = [];

        if (!headless) el.classList.add("sla", "sla-container");

        cleanups.push((): void => {
            if (!headless) el.classList.remove("sla", "sla-container");
        });

        return (): void => {
            for (const cleanup of cleanups) cleanup();
            cleanups = [];
        };
    };

    return {
        attach,
    };
};

export type { CreateContainerOptions, CreateContainer };
export { createContainer };
