import type * as DOM from "atomico/types/dom";

import type { ComponentProps } from "#/@types/component";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";
import { getPropsFromAttributes } from "#/functions/attribute";
import {
    type GetComponentPropsName,
    getComponentProps,
} from "#/functions/props/get";
import { setComponentProps } from "#/functions/props/set";

/** Hook to set component props automatically. */
const useComponentPropsSetter = (name: GetComponentPropsName): void => {
    const elRef: Required<Atom.Ref<DOM.AtomicoThis>> = Atom.useHost();

    const {
        options: { plugins },
    } = useScrollCore();

    const props: ComponentProps<"div"> = getPropsFromAttributes(
        elRef.current.attributes,
    );

    const newProps: ComponentProps<"div"> = getComponentProps({
        name,
        props,
        plugins,
    });

    setComponentProps(elRef.current, newProps);
};

export { useComponentPropsSetter };
