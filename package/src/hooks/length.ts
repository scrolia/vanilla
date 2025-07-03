import type { OnSetLengthResult } from "#/@types/options";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";

/** Hook for setting the length of the scrollbar. */
const useLengthHandler = (): void => {
    const {
        options: { disabled, page, plugins },
        contentRef,
        x,
        y,
    } = useScrollCore();

    const isDefinedX: boolean = x.hvTrack && x.hvThumb;
    const isDefinedY: boolean = y.hvTrack && y.hvThumb;

    Atom.useEffect((): (() => void) => {
        const setLength = (): void => {
            const fnX = (): void => {
                let total: number = 0;
                let view: number = 0;

                if (page) {
                    total = document.body.scrollWidth;
                    view = window.innerWidth;
                } else if (contentRef.current) {
                    total = contentRef.current.scrollWidth;
                    view = contentRef.current.clientWidth;
                }

                if (x.total.current === total && x.view.current === view)
                    return void 0;

                x.total.current = total;
                x.view.current = view;

                const scrollbarLengthNext: number = (view / total) * view;

                let result: OnSetLengthResult | undefined;

                for (const plugin of plugins) {
                    result = plugin.onSetLength?.({
                        position: "x",
                        isDisabled: disabled,
                        isPage: page,
                        isDefined: isDefinedX,
                        total,
                        view,
                        viewOffset: x.viewOffset.current,
                        scrollbarLengthPrev: x.scrollbarLength,
                        scrollbarLengthNext:
                            result?.scrollbarLength ?? scrollbarLengthNext,
                    });
                }

                let length: number;

                if (result?.scrollbarLength) {
                    length = result.scrollbarLength;
                } else {
                    length = scrollbarLengthNext;
                }

                // functions
                if (view >= total) {
                    x.setScrollbarLength(0);
                } else {
                    x.setScrollbarLength(length);
                }
            };
            const fnY = (): void => {
                let total: number = 0;
                let view: number = 0;

                if (page) {
                    total = document.body.scrollHeight;
                    view = window.innerHeight;
                } else if (contentRef.current) {
                    total = contentRef.current.scrollHeight;
                    view = contentRef.current.clientHeight;
                }

                if (y.total.current === total && y.view.current === view)
                    return void 0;

                y.total.current = total;
                y.view.current = view;

                const scrollbarLengthNext: number = (view / total) * view;

                let result: OnSetLengthResult | undefined;

                for (const plugin of plugins) {
                    result = plugin.onSetLength?.({
                        position: "y",
                        isDisabled: disabled,
                        isPage: page,
                        isDefined: isDefinedY,
                        total,
                        view,
                        viewOffset: y.viewOffset.current,
                        scrollbarLengthPrev: y.scrollbarLength,
                        scrollbarLengthNext:
                            result?.scrollbarLength ?? scrollbarLengthNext,
                    });
                }

                let length: number;

                if (result?.scrollbarLength) {
                    length = result.scrollbarLength;
                } else {
                    length = scrollbarLengthNext;
                }

                // functions
                if (view >= total) {
                    y.setScrollbarLength(0);
                } else {
                    y.setScrollbarLength(length);
                }
            };
            isDefinedX && fnX();
            isDefinedY && fnY();
        };

        setLength();

        if (page) {
            window.addEventListener("resize", setLength);
            window.addEventListener("scroll", setLength);
        } else if (contentRef.current) {
            contentRef.current.addEventListener("resize", setLength);
            contentRef.current.addEventListener("scroll", setLength);
        }

        return (): void => {
            if (page) {
                window.removeEventListener("resize", setLength);
                window.removeEventListener("scroll", setLength);
            } else if (contentRef.current) {
                contentRef.current.removeEventListener("resize", setLength);
                contentRef.current.removeEventListener("scroll", setLength);
            }
        };
    }, [
        disabled,
        page,
        plugins,
        contentRef,

        isDefinedX,
        x.total,
        x.view,
        x.viewOffset,
        x.scrollbarLength,
        x.setScrollbarLength,

        isDefinedY,
        y.total,
        y.view,
        y.viewOffset,
        y.scrollbarLength,
        y.setScrollbarLength,
    ]);
};

export { useLengthHandler };
