import type { OnDragMoveResult } from "#/@types/options";

import { useScrollCore } from "#/contexts/scrollcore";

type StartPos = {
    viewOffset: number;
    pointerOffset: number;
};

/** Hook for thumb logic. */
const useThumbXHandler = () => {
    const {
        options: { disabled, page, plugins },
        contentRef,
        x: { hvTrack, hvThumb, total, view, viewOffset },
    } = useScrollCore();

    const onPointerDown = (event: PointerEvent): void => {
        event.preventDefault();

        const pointerOffset: number = event.clientX;

        const startPos: StartPos = {
            viewOffset: viewOffset.current,
            pointerOffset,
        };

        for (const plugin of plugins) {
            plugin.onDragStart?.({
                position: "x",
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
            const _pointerOffset: number = e.clientX;

            const _total: number = total.current;
            const _view: number = view.current;

            const delta: number = _pointerOffset - startPos.pointerOffset;
            const ratio: number = _view / _total;

            const scrollTo: number = startPos.viewOffset + delta / ratio;

            let result: OnDragMoveResult | undefined;

            for (const plugin of plugins) {
                result = plugin.onDragMove?.({
                    position: "x",
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
                });
            }

            let left: number;

            if (result?.scrollTo) {
                left = result.scrollTo;
            } else {
                left = scrollTo;
            }

            if (page) {
                window.scrollTo({
                    left,
                    behavior: "instant",
                });
            } else if (contentRef.current) {
                contentRef.current.scrollTo({
                    left,
                    behavior: "instant",
                });
            }
        };

        const handlePointerUp = (e: PointerEvent): void => {
            for (const plugin of plugins) {
                plugin.onDragEnd?.({
                    position: "x",
                    isDisabled: disabled,
                    isPage: page,
                    isDefined: hvTrack && hvThumb,
                    total: total.current,
                    view: view.current,
                    viewOffset: viewOffset.current,
                    pointerOffset: e.clientX,
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

    return {
        onPointerDown,
    };
};

/** Result of the `useThumbXHandler` hook. */
type ThumbXHandler = ReturnType<typeof useThumbXHandler>;

export type { StartPos, ThumbXHandler };
export { useThumbXHandler };
