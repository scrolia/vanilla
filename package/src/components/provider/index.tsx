import type * as DOM from "atomico/types/dom";
import type * as Schema from "atomico/types/schema";

import type { ComponentProps, ComponentTypes } from "#/@types/component";
import type { Plugin } from "#/@types/options";

import * as Atom from "atomico";

import { ScrollCoreContext } from "#/contexts/scrollcore";
import { getPropsFromAttributes } from "#/functions/attribute";
import { getComponentProps } from "#/functions/props/get";
import { setComponentProps } from "#/functions/props/set";

const _Provider = (): Atom.Host<any> => {
    const elRef: Required<Atom.Ref<DOM.AtomicoThis>> = Atom.useHost();

    const [disabled] = Atom.useProp<boolean>("disabled");
    const [page] = Atom.useProp<boolean>("page");
    const [plugins] = Atom.useProp<Plugin[]>("plugins");

    const contentRef = Atom.useRef<HTMLElement | null>();

    const [hvTrackX, setHvTrackX] = Atom.useState<boolean>(false);
    const [hvThumbX, setHvThumbX] = Atom.useState<boolean>(false);
    const [hvTrackY, setHvTrackY] = Atom.useState<boolean>(false);
    const [hvThumbY, setHvThumbY] = Atom.useState<boolean>(false);

    const totalX: Atom.Ref<number> = Atom.useRef<number>(0);
    const totalY: Atom.Ref<number> = Atom.useRef<number>(0);

    const viewX: Atom.Ref<number> = Atom.useRef<number>(0);
    const viewY: Atom.Ref<number> = Atom.useRef<number>(0);

    const viewOffsetX: Atom.Ref<number> = Atom.useRef<number>(0);
    const viewOffsetY: Atom.Ref<number> = Atom.useRef<number>(0);

    const [scrollbarLengthX, setScrollbarLengthX] = Atom.useState<number>(0);
    const [scrollbarLengthY, setScrollbarLengthY] = Atom.useState<number>(0);

    const [scrollbarOffsetX, setScrollbarOffsetX] = Atom.useState<number>(0);
    const [scrollbarOffsetY, setScrollbarOffsetY] = Atom.useState<number>(0);

    Atom.useProvider(ScrollCoreContext, {
        options: {
            disabled: disabled ?? false,
            page: page ?? false,
            plugins: plugins ?? [],
        },
        contentRef,
        x: {
            hvTrack: hvTrackX,
            setHvTrack: setHvTrackX,
            hvThumb: hvThumbX,
            setHvThumb: setHvThumbX,
            total: totalX,
            view: viewX,
            viewOffset: viewOffsetX,
            scrollbarLength: scrollbarLengthX,
            setScrollbarLength: setScrollbarLengthX,
            scrollbarOffset: scrollbarOffsetX,
            setScrollbarOffset: setScrollbarOffsetX,
        },
        y: {
            hvTrack: hvTrackY,
            setHvTrack: setHvTrackY,
            hvThumb: hvThumbY,
            setHvThumb: setHvThumbY,
            total: totalY,
            view: viewY,
            viewOffset: viewOffsetY,
            scrollbarLength: scrollbarLengthY,
            setScrollbarLength: setScrollbarLengthY,
            scrollbarOffset: scrollbarOffsetY,
            setScrollbarOffset: setScrollbarOffsetY,
        },
    });

    Atom.useEffect((): void => {
        const props: ComponentProps<"div"> = getPropsFromAttributes(
            elRef.current.attributes,
        );

        const newProps: ComponentProps<"div"> = getComponentProps({
            name: "provider",
            props,
            plugins: plugins ?? [],
        });

        setComponentProps(elRef.current, newProps);
    }, [
        plugins,
    ]);

    return (
        <host shadowDom>
            <slot />
        </host>
    );
};

_Provider.props = {
    disabled: {
        type: Boolean,
        reflect: true,
        attr: "disabled",
        value: false as boolean,
    },
    page: {
        type: Boolean,
        reflect: true,
        attr: "page",
        value: false as boolean,
    },
    plugins: {
        type: Array as Atom.Type<Plugin[]>,
        reflect: false,
        attr: "plugins",
        value: [] as Plugin[],
    },
} satisfies Schema.SchemaProps;

/** Scrollbar provider type. */
type ProviderElement = ComponentTypes<typeof _Provider>;

const Provider = Atom.c(_Provider);

export type { ProviderElement };
export { Provider };
