import type { OnDragMoveResult } from "#/@types/options";
import type { StartPos } from "#/hooks/thumb/x";

import { useScrollCore } from "#/contexts/scrollcore";

/** Hook for thumb logic. */
const useThumbYHandler = () => {
    const {
        options: { disabled, page, plugins },
        contentRef,
        y: { hvTrack, hvThumb, total, view, viewOffset },
    } = useScrollCore();

    const onPointerDown = (event: PointerEvent): void => {
        event.preventDefault();

        const pointerOffset: number = event.clientY;

        const startPos: StartPos = {
            viewOffset: viewOffset.current,
            pointerOffset,
        };

        for (const plugin of plugins) {
            plugin.onDragStart?.({
                position: "y",
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
            const _pointerOffset: number = e.clientY;

            const _total: number = total.current;
            const _view: number = view.current;

            const delta: number = _pointerOffset - startPos.pointerOffset;
            const ratio: number = _view / _total;

            const scrollTo: number = startPos.viewOffset + delta / ratio;

            let result: OnDragMoveResult | undefined;

            for (const plugin of plugins) {
                result = plugin.onDragMove?.({
                    position: "y",
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

            let top: number;

            if (result?.scrollTo) {
                top = result.scrollTo;
            } else {
                top = scrollTo;
            }

            if (page) {
                window.scrollTo({
                    top,
                    behavior: "instant",
                });
            } else if (contentRef.current) {
                contentRef.current.scrollTo({
                    top,
                    behavior: "instant",
                });
            }
        };

        const handlePointerUp = (e: PointerEvent): void => {
            for (const plugin of plugins) {
                plugin.onDragEnd?.({
                    position: "y",
                    isDisabled: disabled,
                    isPage: page,
                    isDefined: hvTrack && hvThumb,
                    total: total.current,
                    view: view.current,
                    viewOffset: viewOffset.current,
                    pointerOffset: e.clientY,
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

/** Result of the `useThumbYHandler` hook. */
type ThumbYHandler = ReturnType<typeof useThumbYHandler>;

export type { ThumbYHandler };
export { useThumbYHandler };
