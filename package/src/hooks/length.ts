import type { Axis, OnSetLengthResult, Plugin } from "#/@types/options";

import * as Atom from "atomico";

import { useScrollCore } from "#/contexts/scrollcore";
import { tryPlugin } from "#/functions/plugin";

type SetLengthOptions = {
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
    scrollbarLength: number;
    setScrollbarLength: Atom.SetState<number>;
};

const setLengthFn = ({
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
    scrollbarLength,
    setScrollbarLength,
}: SetLengthOptions) => {
    let _total: number = 0;
    let _view: number = 0;

    if (page) {
        if (axis === "x") {
            _total = document.body.scrollWidth;
            _view = window.innerWidth;
        } else {
            _total = document.body.scrollHeight;
            _view = window.innerHeight;
        }
    } else if (contentRef.current) {
        if (axis === "x") {
            _total = contentRef.current.scrollWidth;
            _view = contentRef.current.clientWidth;
        } else {
            _total = contentRef.current.scrollHeight;
            _view = contentRef.current.clientHeight;
        }
    }

    if (total.current === _total && view.current === _view) return void 0;

    total.current = _total;
    view.current = _view;

    const scrollbarLengthNext: number = (_view / _total) * _view;

    let result: OnSetLengthResult | undefined;

    for (const plugin of plugins) {
        if (!plugin.onSetLength) continue;

        result =
            tryPlugin(plugin, plugin.onSetLength, {
                axis,
                isDisabled: disabled,
                isPage: page,
                isDefined: hvTrack && hvThumb,
                total: _total,
                view: _view,
                viewOffset: viewOffset.current,
                scrollbarLengthPrev: scrollbarLength,
                scrollbarLengthNext:
                    result?.scrollbarLength ?? scrollbarLengthNext,
            }) ?? result;
    }

    let length: number;

    if (result?.scrollbarLength) {
        length = result.scrollbarLength;
    } else {
        length = scrollbarLengthNext;
    }

    // functions
    if (_view >= _total) {
        setScrollbarLength(0);
    } else {
        setScrollbarLength(length);
    }
};

/** Hook for setting the length of the scrollbar. */
const useLengthHandler = (): void => {
    const {
        options: { disabled, page, plugins },
        contentRef,
        x,
        y,
    } = useScrollCore();

    Atom.useEffect((): (() => void) => {
        const setLength = (): void => {
            x.hvTrack &&
                x.hvThumb &&
                setLengthFn({
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
                    scrollbarLength: x.scrollbarLength,
                    setScrollbarLength: x.setScrollbarLength,
                });
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

        x.hvTrack,
        x.hvThumb,
        x.total,
        x.view,
        x.viewOffset,
        x.scrollbarLength,
        x.setScrollbarLength,
    ]);

    Atom.useEffect((): (() => void) => {
        const setLength = (): void => {
            y.hvTrack &&
                y.hvThumb &&
                setLengthFn({
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
                    scrollbarLength: y.scrollbarLength,
                    setScrollbarLength: y.setScrollbarLength,
                });
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

        y.hvTrack,
        y.hvThumb,
        y.total,
        y.view,
        y.viewOffset,
        y.scrollbarLength,
        y.setScrollbarLength,
    ]);
};

export { useLengthHandler };
