import { Container } from "#/components/contianer";
import { Content } from "#/components/contnet";
import { Provider } from "#/components/provider";
import { ThumbX } from "#/components/thumb/x";
import { ThumbY } from "#/components/thumb/y";
import { TrackX } from "#/components/track/x";
import { TrackY } from "#/components/track/y";

/** Scrollbar components. */
const Scrollbar = {
    Container,
    Content,
    Provider,
    ThumbX,
    ThumbY,
    TrackX,
    TrackY,
};

export type { ComponentProps, CSSProperties } from "#/@types/component";
export type {
    Axis,
    OnDragEndOptions,
    OnDragMoveOptions,
    OnDragMoveResult,
    OnDragStartOptions,
    OnScrollOptions,
    OnScrollResult,
    OnSetLengthOptions,
    OnSetLengthResult,
    Options,
    Plugin,
    PluginProps,
    PluginPropsFunction,
} from "#/@types/options";
export type { ContainerElement } from "#/components/contianer";
export type { ContentElement } from "#/components/contnet";
export type { ProviderElement } from "#/components/provider";
export type { ThumbXElement } from "#/components/thumb/x";
export type { ThumbYElement } from "#/components/thumb/y";
export type { TrackXElement } from "#/components/track/x";
export type { TrackYElement } from "#/components/track/y";

export { Scrollbar };
