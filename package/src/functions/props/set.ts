import type { ComponentProps } from "#/@types/component";

/** Set component props. */
function setComponentProps(
    element: HTMLElement,
    props: ComponentProps<"div">,
): HTMLElement;

/** Set component props. */
function setComponentProps<T extends keyof HTMLElementTagNameMap>(
    element: HTMLElementTagNameMap[T],
    props: ComponentProps<T>,
): HTMLElementTagNameMap[T];

function setComponentProps<T extends keyof HTMLElementTagNameMap>(
    element: HTMLElement | HTMLElementTagNameMap[T],
    props: ComponentProps<T>,
): HTMLElement | HTMLElementTagNameMap[T] {
    // set attributes
    for (const [key, value] of Object.entries(props)) {
        // null / undefined
        if (value == null) continue;

        // style object
        if (key === "style" && typeof value === "object") {
            for (const [k, v] of Object.entries(value))
                element.style.setProperty(k, String(v));
            continue;
        }

        // boolean
        if (typeof value === "boolean") {
            if (value) element.setAttribute(key, "");
            else element.removeAttribute(key);
            continue;
        }

        // known properties
        if (key in element) {
            (element as unknown as Record<string, unknown>)[key] = value;
            continue;
        }

        // fallback
        element.setAttribute(key as string, String(value));
    }

    return element;
}

export { setComponentProps };
