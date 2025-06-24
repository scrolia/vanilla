import type { ScrollCore } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";
import type { OnDragMoveResult } from "#/@types/options";

import { effect } from "@preact/signals-core";

type StartPos = {
    viewOffset: number;
    pointerOffset: number;
};

/** Options for the `createThumbX` function. */
type CreateThumbXOptions = {
    core: ScrollCore;
};

/** Result of the `createThumbX` function. */
type CreateThumbX = CreateComponent;

/** Function to create horizontal thumb. */
const createThumbX = (options: CreateThumbXOptions): CreateThumbX => {
    const {
        options: { disabled, page, onDragStart, onDragMove, onDragEnd },
        content,
        x: {
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

                const pointerOffset: number = event.clientX;

                const startPos: StartPos = {
                    viewOffset: viewOffset.value,
                    pointerOffset,
                };

                onDragStart?.({
                    position: "x",
                    isDisabled: disabled,
                    isPage: page,
                    isDefined,
                    total: total.value,
                    view: view.value,
                    viewOffset: viewOffset.value,
                    pointerOffset,
                });

                const handlePointerMove = (e: PointerEvent): void => {
                    const _pointerOffset: number = e.clientX;

                    const _total: number = total.value;
                    const _view: number = view.value;

                    const delta: number = e.clientX - startPos.pointerOffset;
                    const ratio: number = _view / _total;

                    const result: OnDragMoveResult | undefined = onDragMove?.({
                        position: "x",
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

                    let left: number;

                    if (result?.scrollTo) {
                        left = result.scrollTo;
                    } else {
                        left = startPos.viewOffset + delta / ratio;
                    }

                    if (page) {
                        window.scrollTo({
                            left,
                        });
                    } else if (content.value) {
                        content.value.scrollTo({
                            left,
                        });
                    }
                };

                const handlePointerUp = (e: PointerEvent): void => {
                    onDragEnd?.({
                        position: "x",
                        isDisabled: disabled,
                        isPage: page,
                        isDefined,
                        total: total.value,
                        view: view.value,
                        viewOffset: viewOffset.value,
                        pointerOffset: e.clientX,
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
            el.style.width = `${length}px`;
        });

        cleanups.push(cleanupLengthEffect);

        const cleanupOffsetEffect = effect((): void => {
            const vl: number = scrollbarOffset.value;
            const offset: number = Number.isNaN(vl) ? 0 : vl;
            el.style.left = `${offset}px`;
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

export type { CreateThumbXOptions, CreateThumbX };
export { createThumbX };
