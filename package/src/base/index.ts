import type { Core, CoreOptions, CoreStatesOptions } from "#/@types/core";
import type { Options } from "#/@types/options";
import type { CreateContainer } from "#/base/components/container";
import type { CreateContent } from "#/base/components/content";
import type { CreateThumbX } from "#/base/components/thumb/x";
import type { CreateThumbY } from "#/base/components/thumb/y";
import type { CreateTrackX } from "#/base/components/track/x";
import type { CreateTrackY } from "#/base/components/track/y";

import { signal } from "@preact/signals-core";

import { createContainer } from "#/base/components/container";
import { createContent } from "#/base/components/content";
import { createThumbX } from "#/base/components/thumb/x";
import { createThumbY } from "#/base/components/thumb/y";
import { createTrackX } from "#/base/components/track/x";
import { createTrackY } from "#/base/components/track/y";
import { MARGIN } from "#/configs";

/** Result of the `createScrollbar` function. */
type CreateScrollbar = {
    /**
     * Attaches complete scrollbar function into the element.
     */
    attach: (el: HTMLElement) => () => void;
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

const defaultIndivOptions: CoreStatesOptions = {
    setScrollbarLength: (length: number): number => {
        return Math.max(10, length - MARGIN);
    },
    activeTrackClassName: false,
    activeThumbClassName: false,
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
    const o: CoreOptions = {
        disabled: options?.disabled ?? false,
        page: options?.page ?? false,
        headless: options?.headless ?? false,
    };

    // individual options X
    const ioX: CoreStatesOptions = {
        ...options?.x,
        setScrollbarLength:
            options?.x?.setScrollbarLength ??
            options?.setScrollbarLength ??
            defaultIndivOptions.setScrollbarLength,
        activeTrackClassName:
            options?.x?.activeTrackClassName ??
            options?.activeTrackClassName ??
            defaultIndivOptions.activeTrackClassName,
        activeThumbClassName:
            options?.x?.activeThumbClassName ??
            options?.activeThumbClassName ??
            defaultIndivOptions.activeThumbClassName,
    };

    // individual options Y
    const ioY: CoreStatesOptions = {
        ...options?.y,
        setScrollbarLength:
            options?.y?.setScrollbarLength ??
            options?.setScrollbarLength ??
            defaultIndivOptions.setScrollbarLength,
        activeTrackClassName:
            options?.y?.activeTrackClassName ??
            options?.activeTrackClassName ??
            defaultIndivOptions.activeTrackClassName,
        activeThumbClassName:
            options?.y?.activeThumbClassName ??
            options?.activeThumbClassName ??
            defaultIndivOptions.activeThumbClassName,
    };

    const core: Core = {
        options: o,
        content: signal(null),
        x: {
            options: ioX,
            hvTrack: signal(false),
            hvThumb: signal(false),
            timeout: signal(null),
            total: signal(0),
            view: signal(0),
            viewOffset: signal(0),
            scrollbarLength: signal(0),
            scrollbarOffset: signal(0),
            isActive: signal(false),
        },
        y: {
            options: ioY,
            hvTrack: signal(false),
            hvThumb: signal(false),
            timeout: signal(null),
            total: signal(0),
            view: signal(0),
            viewOffset: signal(0),
            scrollbarLength: signal(0),
            scrollbarOffset: signal(0),
            isActive: signal(false),
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

    const attach = (el: HTMLElement): (() => void) => {
        let cleanups: (() => void)[] = [];

        const elContent: HTMLElement = document.createElement("div");
        const elTrackX: HTMLElement = document.createElement("div");
        const elTrackY: HTMLElement = document.createElement("div");
        const elThumbX: HTMLElement = document.createElement("div");
        const elThumbY: HTMLElement = document.createElement("div");

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

export type { CreateScrollbar };
export { createScrollbar };
