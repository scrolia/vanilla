import type * as DOM from "atomico/types/dom";
import type * as Schema from "atomico/types/schema";

import type { ComponentProps, ComponentTypes } from "#/@types/component";
import type { Plugin } from "#/@types/options";
import type { ScrollCoreStates } from "#/contexts/scrollcore";

import * as Atom from "atomico";

import { ScrollCoreContext, useScrollCoreStates } from "#/contexts/scrollcore";
import { getPropsFromAttributes } from "#/functions/attribute";
import { getComponentProps } from "#/functions/props/get";
import { setComponentProps } from "#/functions/props/set";

const providerProps = {
    disabled: {
        type: Boolean,
        reflect: true,
    },
    page: {
        type: Boolean,
        reflect: true,
    },
    plugins: {
        type: Array,
        reflect: true,
    },
} as const satisfies Schema.PropTypes;

type ProviderProps = typeof providerProps;

function _Provider(
    props: Schema.InferProps<ProviderProps>,
): Atom.JSX<ProviderProps> {
    const elRef: Required<Atom.Ref<DOM.AtomicoThis>> = Atom.useHost();

    const [disabled] = Atom.useState<boolean>(props.disabled ?? false);
    const [page] = Atom.useState<boolean>(props.page ?? false);
    const [plugins] = Atom.useState<Plugin[]>(
        (props.plugins as Plugin[]) ?? [],
    );

    const contentRef = Atom.useRef<HTMLElement | null>();

    const x: ScrollCoreStates = useScrollCoreStates();
    const y: ScrollCoreStates = useScrollCoreStates();

    Atom.useProvider(ScrollCoreContext, {
        options: {
            disabled,
            page,
            plugins,
        },
        contentRef,
        x,
        y,
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
}

/** Scrollbar provider type. */
type ProviderElement = ComponentTypes<ProviderProps>;

const Provider = Atom.c(_Provider, {
    props: providerProps,
});

export type { ProviderElement };
export { Provider };
