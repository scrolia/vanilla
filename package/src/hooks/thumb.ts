import type * as Atom from "atomico";

import type { Axis, OnDragMoveResult, Plugin } from "#/@types/options";

import { useScrollCore } from "#/contexts/scrollcore";
import { tryPlugin } from "#/functions/plugin";

type StartPos = {
    viewOffset: number;
    pointerOffset: number;
};

type HandleOnPointerDownOptions = {
    axis: Axis;
    event: PointerEvent;
    disabled: boolean;
    page: boolean;
    plugins: Plugin[];
    contentRef: Atom.Ref<HTMLElement | null>;
    hvTrack: boolean;
    hvThumb: boolean;
    total: Atom.Ref<number>;
    view: Atom.Ref<number>;
    viewOffset: Atom.Ref<number>;
};

const handleOnPointerDown = ({
    axis,
    event,
    disabled,
    page,
    plugins,
    contentRef,
    hvTrack,
    hvThumb,
    total,
    view,
    viewOffset,
}: HandleOnPointerDownOptions): void => {
    event.preventDefault();

    const pointerOffset: number = axis === "x" ? event.clientX : event.clientY;

    const startPos: StartPos = {
        viewOffset: viewOffset.current,
        pointerOffset,
    };

    for (const plugin of plugins) {
        if (!plugin.onDragStart) continue;

        tryPlugin(plugin, plugin.onDragStart, {
            axis,
            isDisabled: disabled,
            isPage: page,
            isDefined: hvTrack && hvThumb,
            total: total.current,
            view: view.current,
            viewOffset: viewOffset.current,
            pointerOffset,
        });
    }

    const handlePointerMove = (e: PointerEvent): void => {
        const _pointerOffset: number = axis === "x" ? e.clientX : e.clientY;

        const _total: number = total.current;
        const _view: number = view.current;

        const delta: number = _pointerOffset - startPos.pointerOffset;
        const ratio: number = _view / _total;

        const scrollTo: number = startPos.viewOffset + delta / ratio;

        let result: OnDragMoveResult | undefined;

        for (const plugin of plugins) {
            if (!plugin.onDragMove) continue;

            result =
                tryPlugin(plugin, plugin.onDragMove, {
                    axis,
                    isDisabled: disabled,
                    isPage: page,
                    isDefined: hvTrack && hvThumb,
                    total: _total,
                    view: _view,
                    viewOffset: viewOffset.current,
                    pointerOffset: _pointerOffset,
                    viewOffsetInit: startPos.viewOffset,
                    pointerOffsetInit: startPos.pointerOffset,
                    delta,
                    ratio,
                    scrollTo: result?.scrollTo ?? scrollTo,
                }) ?? result;
        }

        let final: number;

        if (result?.scrollTo) {
            final = result.scrollTo;
        } else {
            final = scrollTo;
        }

        if (page) {
            window.scrollTo({
                ...(axis === "x"
                    ? {
                          left: final,
                      }
                    : {
                          top: final,
                      }),
                behavior: "instant",
            });
        } else if (contentRef.current) {
            contentRef.current.scrollTo({
                ...(axis === "x"
                    ? {
                          left: final,
                      }
                    : {
                          top: final,
                      }),
                behavior: "instant",
            });
        }
    };

    const handlePointerUp = (e: PointerEvent): void => {
        for (const plugin of plugins) {
            if (!plugin.onDragEnd) continue;

            tryPlugin(plugin, plugin.onDragEnd, {
                axis,
                isDisabled: disabled,
                isPage: page,
                isDefined: hvTrack && hvThumb,
                total: total.current,
                view: view.current,
                viewOffset: viewOffset.current,
                pointerOffset: axis === "x" ? e.clientX : e.clientY,
                viewOffsetInit: startPos.viewOffset,
                pointerOffsetInit: startPos.pointerOffset,
            });
        }

        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
};

/** Hook for thumb logic. */
const useThumbXHandler = () => {
    const {
        options: { disabled, page, plugins },
        contentRef,
        x: { hvTrack, hvThumb, total, view, viewOffset },
    } = useScrollCore();

    const onPointerDown = (event: PointerEvent): void => {
        handleOnPointerDown({
            axis: "x",
            event,
            disabled,
            page,
            plugins,
            contentRef,
            hvTrack,
            hvThumb,
            total,
            view,
            viewOffset,
        });
    };

    return {
        onPointerDown,
    };
};

/** Hook for thumb logic. */
const useThumbYHandler = () => {
    const {
        options: { disabled, page, plugins },
        contentRef,
        y: { hvTrack, hvThumb, total, view, viewOffset },
    } = useScrollCore();

    const onPointerDown = (event: PointerEvent): void => {
        handleOnPointerDown({
            axis: "y",
            event,
            disabled,
            page,
            plugins,
            contentRef,
            hvTrack,
            hvThumb,
            total,
            view,
            viewOffset,
        });
    };

    return {
        onPointerDown,
    };
};

/** Result of the `useThumbXHandler` hook. */
type ThumbXHandler = ReturnType<typeof useThumbXHandler>;

/** Result of the `useThumbYHandler` hook. */
type ThumbYHandler = ReturnType<typeof useThumbYHandler>;

export type { ThumbXHandler, ThumbYHandler };
export { useThumbXHandler, useThumbYHandler };
