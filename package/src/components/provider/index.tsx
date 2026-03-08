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

function _Provider(props: Atom.Props<typeof _Provider>): Atom.Host<any> {
    const elRef: Required<Atom.Ref<DOM.AtomicoThis>> = Atom.useHost();

    const [disabled] = Atom.useState<boolean>(props.disabled ?? false);
    const [page] = Atom.useState<boolean>(props.page ?? false);
    const [plugins] = Atom.useState<Plugin[]>(props.plugins ?? []);

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

_Provider.props = {
    disabled: {
        type: Boolean,
        reflect: true,
        attr: "disabled",
    },
    page: {
        type: Boolean,
        reflect: true,
        attr: "page",
    },
    plugins: {
        type: Array as Atom.Type<Plugin[]>,
        reflect: true,
        attr: "plugins",
    },
} satisfies Schema.SchemaProps;

/** Scrollbar provider type. */
type ProviderElement = ComponentTypes<typeof _Provider>;

const Provider = Atom.c(_Provider);

export type { ProviderElement };
export { Provider };
