import type { CreateScrollbar, Options } from "@scrolia/vanilla";

import { createScrollbar } from "@scrolia/vanilla";

type AttachScrollbarOptions = Pick<Options, "disabled" | "page">;

const attachScrollbar = (el: HTMLElement, options?: AttachScrollbarOptions) => {
    const { disabled, page } = options ?? {};

    const scrollbar: CreateScrollbar = createScrollbar({
        disabled,
        page,
    });

    el.classList.add("sla", "sla-container");

    const content: HTMLElement = document.createElement("div");
    content.classList.add("sla-nsb", "sla-content");

    const trackX: HTMLElement = document.createElement("div");
    trackX.classList.add("sla-track", "sla-x");
    !page && trackX.classList.add("sla-child");

    const trackY: HTMLElement = document.createElement("div");
    trackY.classList.add("sla-track", "sla-y");
    !page && trackY.classList.add("sla-child");

    const thumbX: HTMLElement = document.createElement("div");
    thumbX.classList.add("sla-thumb", "sla-x");

    const thumbY: HTMLElement = document.createElement("div");
    thumbY.classList.add("sla-thumb", "sla-y");

    const destroyScrollbar: () => void = scrollbar.attach(el, {
        content,
        trackX,
        trackY,
        thumbX,
        thumbY,
    });

    window.addEventListener("unload", destroyScrollbar);
};

export type { AttachScrollbarOptions };
export { attachScrollbar };
