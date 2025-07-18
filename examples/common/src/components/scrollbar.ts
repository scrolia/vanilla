import type {
    ContainerElement,
    ContentElement,
    Options,
    ProviderElement,
    ThumbXElement,
    ThumbYElement,
    TrackXElement,
    TrackYElement,
} from "@scrolia/vanilla";

type AttachScrollbarOptions = Pick<Options, "disabled" | "page">;

const attachScrollbar = (el: HTMLElement, options?: AttachScrollbarOptions) => {
    const { disabled, page } = options ?? {};

    const provider: ProviderElement =
        document.createElement("scrollbar-provider");
    provider.classList.add("sla", "sla-provider");

    if (disabled) provider.disabled = disabled;
    if (page) provider.page = page;

    const container: ContainerElement = document.createElement(
        "scrollbar-container",
    );
    container.classList.add("sla-container");

    const content: ContentElement = document.createElement("scrollbar-content");
    content.classList.add("sla-nsb", "sla-content");
    !page && content.classList.add("sla-child");

    const trackX: TrackXElement = document.createElement("scrollbar-track-x");
    trackX.classList.add("sla-track", "sla-x");
    !page && trackX.classList.add("sla-child");

    const trackY: TrackYElement = document.createElement("scrollbar-track-y");
    trackY.classList.add("sla-track", "sla-y");
    !page && trackY.classList.add("sla-child");

    const thumbX: ThumbXElement = document.createElement("scrollbar-thumb-x");
    thumbX.classList.add("sla-thumb", "sla-x");

    const thumbY: ThumbYElement = document.createElement("scrollbar-thumb-y");
    thumbY.classList.add("sla-thumb", "sla-y");

    const fragment: DocumentFragment = document.createDocumentFragment();
    while (el.firstChild) fragment.appendChild(el.firstChild);
    content.appendChild(fragment);

    trackX.appendChild(thumbX);
    trackY.appendChild(thumbY);

    container.appendChild(content);
    container.appendChild(trackX);
    container.appendChild(trackY);

    provider.appendChild(container);

    el.appendChild(provider);
};

export type { AttachScrollbarOptions };
export { attachScrollbar };
