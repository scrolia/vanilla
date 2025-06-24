import type { ScrollCore } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";
import type { OnDragMoveResult } from "#/@types/options";

import { effect } from "@preact/signals-core";

type StartPos = {
    viewOffset: number;
    pointerOffset: number;
};

/** Options for the `createThumbY` function. */
type CreateThumbYOptions = {
    core: ScrollCore;
};

/** Result of the `createThumbY` function. */
type CreateThumbY = CreateComponent;

/** Function to create vertical thumb. */
const createThumbY = (options: CreateThumbYOptions): CreateThumbY => {
    const {
        options: { disabled, page, onDragStart, onDragMove, onDragEnd },
        content,
        y: {
            hvTrack,
            hvThumb,
            total,
            view,
            viewOffset,
            scrollbarLength,
            scrollbarOffset,
        },
    } = options.core;

    const isDefined: boolean = hvTrack.value && hvThumb.value;

    const attach = (el: HTMLElement): (() => void) => {
        if (disabled) return () => void 0;

        let cleanups: (() => void)[] = [];

        hvThumb.value = true;

        const cleanupPointerEffect = effect((): (() => void) => {
            const handlePointerDown = (event: PointerEvent): void => {
                event.preventDefault();

                const pointerOffset: number = event.clientY;

                const startPos: StartPos = {
                    viewOffset: viewOffset.value,
                    pointerOffset,
                };

                onDragStart?.({
                    position: "y",
                    isDisabled: disabled,
                    isPage: page,
                    isDefined,
                    total: total.value,
                    view: view.value,
                    viewOffset: viewOffset.value,
                    pointerOffset,
                });

                const handlePointerMove = (e: PointerEvent): void => {
                    const _pointerOffset: number = e.clientY;

                    const _total: number = total.value;
                    const _view: number = view.value;

                    const delta: number = e.clientY - startPos.pointerOffset;
                    const ratio: number = _view / _total;

                    const result: OnDragMoveResult | undefined = onDragMove?.({
                        position: "y",
                        isDisabled: disabled,
                        isPage: page,
                        isDefined,
                        total: _total,
                        view: _view,
                        viewOffset: viewOffset.value,
                        pointerOffset: _pointerOffset,
                        viewOffsetInit: startPos.viewOffset,
                        pointerOffsetInit: startPos.pointerOffset,
                        delta,
                        ratio,
                    });

                    let top: number;

                    if (result?.scrollTo) {
                        top = result.scrollTo;
                    } else {
                        top = startPos.viewOffset + delta / ratio;
                    }

                    if (page) {
                        window.scrollTo({
                            top,
                        });
                    } else if (content.value) {
                        content.value.scrollTo({
                            top,
                        });
                    }
                };

                const handlePointerUp = (e: PointerEvent): void => {
                    onDragEnd?.({
                        position: "y",
                        isDisabled: disabled,
                        isPage: page,
                        isDefined,
                        total: total.value,
                        view: view.value,
                        viewOffset: viewOffset.value,
                        pointerOffset: e.clientY,
                        viewOffsetInit: startPos.viewOffset,
                        pointerOffsetInit: startPos.pointerOffset,
                    });

                    window.removeEventListener(
                        "pointermove",
                        handlePointerMove,
                    );
                    window.removeEventListener("pointerup", handlePointerUp);
                };

                window.addEventListener("pointermove", handlePointerMove);
                window.addEventListener("pointerup", handlePointerUp);
            };

            el.addEventListener("pointerdown", handlePointerDown);

            return (): void => {
                el.removeEventListener("pointerdown", handlePointerDown);
            };
        });

        cleanups.push(cleanupPointerEffect);

        const cleanupLengthEffect = effect((): void => {
            const vl: number = scrollbarLength.value;
            const length: number = Number.isNaN(vl) ? 0 : vl;
            el.style.height = `${length}px`;
        });

        cleanups.push(cleanupLengthEffect);

        const cleanupOffsetEffect = effect((): void => {
            const vl: number = scrollbarOffset.value;
            const offset: number = Number.isNaN(vl) ? 0 : vl;
            el.style.top = `${offset}px`;
        });

        cleanups.push(cleanupOffsetEffect);

        return (): void => {
            for (const cleanup of cleanups) cleanup();
            cleanups = [];
        };
    };

    return {
        attach,
    };
};

export type { CreateThumbYOptions, CreateThumbY };
export { createThumbY };
