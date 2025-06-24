import type { Format, Partial } from "ts-vista";

import type { ScrollCore, ScrollCoreOptions } from "#/@types/core";
import type { Options } from "#/@types/options";
import type { CreateContainer } from "#/components/container";
import type { CreateContent } from "#/components/content";
import type { CreateThumbX } from "#/components/thumb/x";
import type { CreateThumbY } from "#/components/thumb/y";
import type { CreateTrackX } from "#/components/track/x";
import type { CreateTrackY } from "#/components/track/y";

import { signal } from "@preact/signals-core";

import { createContainer } from "#/components/container";
import { createContent } from "#/components/content";
import { createThumbX } from "#/components/thumb/x";
import { createThumbY } from "#/components/thumb/y";
import { createTrackX } from "#/components/track/x";
import { createTrackY } from "#/components/track/y";

type CompleteAttachOptions = {
    content: HTMLElement;
    trackX: HTMLElement;
    trackY: HTMLElement;
    thumbX: HTMLElement;
    thumbY: HTMLElement;
};

/** Options for the `attach` function. */
type AttachOptions = Format<Partial<CompleteAttachOptions>>;

/** Result of the `createScrollbar` function. */
type CreateScrollbar = {
    /**
     * Attaches complete scrollbar function into the element.
     */
    attach: (el: HTMLElement, options?: AttachOptions) => () => void;
    /**
     * Container functions.
     */
    container: CreateContainer;
    /**
     * Content functions.
     */
    content: CreateContent;
    /**
     * Horizontal track functions.
     */
    trackX: CreateTrackX;
    /**
     * Vertical track functions.
     */
    trackY: CreateTrackY;
    /**
     * Horizontal thumb functions.
     */
    thumbX: CreateThumbX;
    /**
     * Vertical thumb functions.
     */
    thumbY: CreateThumbY;
};

/**
 * Function to create the scrollbar.
 *
 * ### Example
 *
 * ```ts
 * import type { CreateScrollbar } from "@scrolia/vanilla";
 *
 * import { createScrollbar } from "@scrolia/vanilla";
 *
 * const el: HTMLElement = document.getElementById("container");
 *
 * const scrollbar: CreateScrollbar = createScrollbar();
 *
 * scrollbar.attach(el);
 * ```
 */
const createScrollbar = (options?: Options): CreateScrollbar => {
    // options
    const o: ScrollCoreOptions = {
        ...options,
        disabled: options?.disabled ?? false,
        page: options?.page ?? false,
    };

    const core: ScrollCore = {
        options: o,
        content: signal(null),
        x: {
            hvTrack: signal(false),
            hvThumb: signal(false),
            total: signal(0),
            view: signal(0),
            viewOffset: signal(0),
            scrollbarLength: signal(0),
            scrollbarOffset: signal(0),
        },
        y: {
            hvTrack: signal(false),
            hvThumb: signal(false),
            total: signal(0),
            view: signal(0),
            viewOffset: signal(0),
            scrollbarLength: signal(0),
            scrollbarOffset: signal(0),
        },
    };

    const container: CreateContainer = createContainer({
        core,
    });
    const content: CreateContent = createContent({
        core,
    });
    const trackX: CreateTrackX = createTrackX({
        core,
    });
    const trackY: CreateTrackY = createTrackY({
        core,
    });
    const thumbX: CreateThumbX = createThumbX({
        core,
    });
    const thumbY: CreateThumbY = createThumbY({
        core,
    });

    const attach = (el: HTMLElement, options?: AttachOptions): (() => void) => {
        let cleanups: (() => void)[] = [];

        const elContent: HTMLElement =
            options?.content ?? document.createElement("div");
        const elTrackX: HTMLElement =
            options?.trackX ?? document.createElement("div");
        const elTrackY: HTMLElement =
            options?.trackY ?? document.createElement("div");
        const elThumbX: HTMLElement =
            options?.thumbX ?? document.createElement("div");
        const elThumbY: HTMLElement =
            options?.thumbY ?? document.createElement("div");

        // move children
        const fragment: DocumentFragment = document.createDocumentFragment();
        while (el.firstChild) fragment.appendChild(el.firstChild);
        elContent.appendChild(fragment);

        // append
        el.appendChild(elContent);

        // attach
        const destroyContainer: () => void = container.attach(el);
        const destroyContent: () => void = content.attach(elContent);

        // push cleanup
        cleanups.push(destroyContainer);
        cleanups.push(destroyContent);
        cleanups.push((): void => {
            // move children
            const fm: DocumentFragment = document.createDocumentFragment();
            while (elContent.firstChild) fm.appendChild(elContent.firstChild);
            el.appendChild(fm);

            // remove content
            elContent.remove();
        });

        // disabled
        if (o.disabled)
            return (): void => {
                for (const cleanup of cleanups) cleanup();
                cleanups = [];
            };

        // append
        elTrackX.appendChild(elThumbX);
        elTrackY.appendChild(elThumbY);
        el.appendChild(elTrackX);
        el.appendChild(elTrackY);

        // attach
        const destroyThumbX: () => void = thumbX.attach(elThumbX);
        const destroyThumbY: () => void = thumbY.attach(elThumbY);
        const destroyTrackX: () => void = trackX.attach(elTrackX);
        const destroyTrackY: () => void = trackY.attach(elTrackY);

        // push cleanup
        cleanups.push(destroyThumbX);
        cleanups.push(destroyThumbY);
        cleanups.push(destroyTrackX);
        cleanups.push(destroyTrackY);
        cleanups.push((): void => {
            // remove tracks and thumbs
            elTrackX.remove();
            elTrackY.remove();
        });

        return (): void => {
            for (const cleanup of cleanups) cleanup();
            cleanups = [];
        };
    };

    return {
        attach,
        container,
        content,
        trackX,
        trackY,
        thumbX,
        thumbY,
    };
};

export type { AttachOptions, CreateScrollbar };
export { createScrollbar };
