import type { Axis, OnScrollResult, Plugin } from "#/@types/options";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";
import { tryPlugin } from "#/functions/plugin";

type HandleScrollOptions = {
    axis: Axis;
    disabled: boolean;
    page: boolean;
    plugins: Plugin[];
    contentRef: Atom.Ref<HTMLElement | null>;
    hvTrack: boolean;
    hvThumb: boolean;
    total: Atom.Ref<number>;
    view: Atom.Ref<number>;
    viewOffset: Atom.Ref<number>;
    scrollbarOffset: number;
    setScrollbarOffset: Atom.SetState<number>;
};

const handleScrollFn = ({
    axis,
    disabled,
    page,
    plugins,
    contentRef,
    hvTrack,
    hvThumb,
    total,
    view,
    viewOffset,
    scrollbarOffset,
    setScrollbarOffset,
}: HandleScrollOptions): void => {
    if (page) {
        if (axis === "x") {
            viewOffset.current = window.scrollX;
        } else {
            viewOffset.current = window.scrollY;
        }
    } else if (contentRef.current) {
        if (axis === "x") {
            viewOffset.current = contentRef.current.scrollLeft;
        } else {
            viewOffset.current = contentRef.current.scrollTop;
        }
    }

    const scrollbarOffsetNext: number =
        (viewOffset.current / total.current) * view.current;

    let result: OnScrollResult | undefined;

    for (const plugin of plugins) {
        if (!plugin.onScroll) continue;

        result =
            tryPlugin(plugin, plugin.onScroll, {
                axis,
                isDisabled: disabled,
                isPage: page,
                isDefined: hvTrack && hvThumb,
                total: total.current,
                view: view.current,
                viewOffset: viewOffset.current,
                scrollbarOffsetPrev: scrollbarOffset,
                scrollbarOffsetNext:
                    result?.scrollbarOffset ?? scrollbarOffsetNext,
            }) ?? result;
    }

    let offset: number;

    if (result?.scrollbarOffset) {
        offset = result.scrollbarOffset;
    } else {
        offset = scrollbarOffsetNext;
    }

    setScrollbarOffset(offset);
};

/** Hook for handling scroll events. */
const useScrollHandler = (): void => {
    const {
        options: { disabled, page, plugins },
        contentRef,
        x,
        y,
    } = useScrollCore();

    Atom.useEffect((): (() => void) => {
        const handleScroll = (): void => {
            x.hvTrack &&
                x.hvThumb &&
                handleScrollFn({
                    axis: "x",
                    disabled,
                    page,
                    plugins,
                    contentRef,
                    hvTrack: x.hvTrack,
                    hvThumb: x.hvThumb,
                    total: x.total,
                    view: x.view,
                    viewOffset: x.viewOffset,
                    scrollbarOffset: x.scrollbarOffset,
                    setScrollbarOffset: x.setScrollbarOffset,
                });
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

        x.hvTrack,
        x.hvThumb,
        x.total,
        x.view,
        x.viewOffset,
        x.scrollbarOffset,
        x.setScrollbarOffset,
    ]);

    Atom.useEffect((): (() => void) => {
        const handleScroll = (): void => {
            y.hvTrack &&
                y.hvThumb &&
                handleScrollFn({
                    axis: "y",
                    disabled,
                    page,
                    plugins,
                    contentRef,
                    hvTrack: y.hvTrack,
                    hvThumb: y.hvThumb,
                    total: y.total,
                    view: y.view,
                    viewOffset: y.viewOffset,
                    scrollbarOffset: y.scrollbarOffset,
                    setScrollbarOffset: y.setScrollbarOffset,
                });
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

        y.hvTrack,
        y.hvThumb,
        y.total,
        y.view,
        y.viewOffset,
        y.scrollbarOffset,
        y.setScrollbarOffset,
    ]);
};

export { useScrollHandler };
