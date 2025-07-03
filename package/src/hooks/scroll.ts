import type { OnScrollResult } from "#/@types/options";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";

/** Hook for handling scroll events. */
const useScrollHandler = (): void => {
    const {
        options: { disabled, page, plugins },
        contentRef,
        x,
        y,
    } = useScrollCore();

    const isDefinedX: boolean = x.hvTrack && x.hvThumb;
    const isDefinedY: boolean = y.hvTrack && y.hvThumb;

    Atom.useEffect((): (() => void) => {
        const handleScroll = (): void => {
            const fnX = (): void => {
                if (page) {
                    x.viewOffset.current = window.scrollX;
                } else if (contentRef.current) {
                    x.viewOffset.current = contentRef.current.scrollLeft;
                }

                const scrollbarOffsetNext: number =
                    (x.viewOffset.current / x.total.current) * x.view.current;

                let result: OnScrollResult | undefined;

                for (const plugin of plugins) {
                    result = plugin.onScroll?.({
                        position: "x",
                        isDisabled: disabled,
                        isPage: page,
                        isDefined: isDefinedX,
                        total: x.total.current,
                        view: x.view.current,
                        viewOffset: x.viewOffset.current,
                        scrollbarOffsetPrev: x.scrollbarOffset,
                        scrollbarOffsetNext:
                            result?.scrollbarOffset ?? scrollbarOffsetNext,
                    });
                }

                let offset: number;

                if (result?.scrollbarOffset) {
                    offset = result.scrollbarOffset;
                } else {
                    offset = scrollbarOffsetNext;
                }

                x.setScrollbarOffset(offset);
            };

            const fnY = (): void => {
                if (page) {
                    y.viewOffset.current = window.scrollY;
                } else if (contentRef.current) {
                    y.viewOffset.current = contentRef.current.scrollTop;
                }

                const scrollbarOffsetNext: number =
                    (y.viewOffset.current / y.total.current) * y.view.current;

                let result: OnScrollResult | undefined;

                for (const plugin of plugins) {
                    result = plugin.onScroll?.({
                        position: "y",
                        isDisabled: disabled,
                        isPage: page,
                        isDefined: isDefinedY,
                        total: y.total.current,
                        view: y.view.current,
                        viewOffset: y.viewOffset.current,
                        scrollbarOffsetPrev: y.scrollbarOffset,
                        scrollbarOffsetNext:
                            result?.scrollbarOffset ?? scrollbarOffsetNext,
                    });
                }

                let offset: number;

                if (result?.scrollbarOffset) {
                    offset = result.scrollbarOffset;
                } else {
                    offset = scrollbarOffsetNext;
                }

                y.setScrollbarOffset(offset);
            };

            isDefinedX && fnX();
            isDefinedY && fnY();
        };

        if (page) {
            window.addEventListener("scroll", handleScroll);
        } else if (contentRef.current) {
            contentRef.current.addEventListener("scroll", handleScroll);
        }

        return (): void => {
            if (page) {
                window.removeEventListener("scroll", handleScroll);
            } else if (contentRef.current) {
                contentRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [
        disabled,
        page,
        plugins,
        contentRef,

        x.viewOffset,
        isDefinedX,
        x.total,
        x.view,
        x.scrollbarOffset,
        x.setScrollbarOffset,

        y.viewOffset,
        isDefinedY,
        y.total,
        y.view,
        y.scrollbarOffset,
        y.setScrollbarOffset,
    ]);
};

export { useScrollHandler };
