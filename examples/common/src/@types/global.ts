import type {
    ContainerElement,
    ContentElement,
    ProviderElement,
    ThumbXElement,
    ThumbYElement,
    TrackXElement,
    TrackYElement,
} from "@scrolia/vanilla";

declare global {
    interface HTMLElementTagNameMap {
        "scrollbar-provider": ProviderElement;
        "scrollbar-container": ContainerElement;
        "scrollbar-content": ContentElement;
        "scrollbar-track-x": TrackXElement;
        "scrollbar-track-y": TrackYElement;
        "scrollbar-thumb-x": ThumbXElement;
        "scrollbar-thumb-y": ThumbYElement;
    }
}

// biome-ignore lint/complexity/noUselessEmptyExport: dts
export {};
