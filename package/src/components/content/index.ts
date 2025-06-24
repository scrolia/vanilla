import type { ScrollCore } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";

/** Options for the `createContent` function. */
type CreateContentOptions = {
    core: ScrollCore;
};

/** Result of the `createContainer` function. */
type CreateContent = CreateComponent;

/** Function to create the content. */
const createContent = (options: CreateContentOptions): CreateContent => {
    const { content } = options.core;

    const attach = (el: HTMLElement): (() => void) => {
        let cleanups: (() => void)[] = [];

        content.value = el;

        return (): void => {
            for (const cleanup of cleanups) cleanup();
            cleanups = [];
        };
    };

    return {
        attach,
    };
};

export type { CreateContentOptions, CreateContent };
export { createContent };
