import type { Core } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";

import { effect } from "@preact/signals-core";

type StartPos = {
    offsetLeft: number;
    x: number;
};

type CreateThumbXOptions = {
    core: Core;
};

/** Result of the `createThumbX` function. */
type CreateThumbX = CreateComponent;

const createThumbX = (options: CreateThumbXOptions): CreateThumbX => {
    const {
        options: { disabled, page, headless },
        content,
        x,
    } = options.core;

    const attach = (el: HTMLElement): (() => void) => {
        if (disabled) return () => void 0;

        let cleanups: (() => void)[] = [];

        x.hvThumb.value = true;

        if (!headless) el.classList.add("sla-thumb", "sla-x");

        cleanups.push((): void => {
            if (!headless) el.classList.remove("sla-thumb", "sla-x");
        });

        const cleanupPointerEffect = effect((): (() => void) => {
            const handlePointerDown = (event: PointerEvent): void => {
                event.preventDefault();

                const startPos: StartPos = {
                    offsetLeft: x.viewOffset.value,
                    x: event.clientX,
                };

                const handlePointerMove = (event: PointerEvent): void => {
                    const delta: number = event.clientX - startPos.x;
                    const ratio: number = x.view.value / x.total.value;
                    const left: number = startPos.offsetLeft + delta / ratio;

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

                const handlePointerUp = (): void => {
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
            const vl: number = x.scrollbarLength.value;
            const length: number = Number.isNaN(vl) ? 0 : vl;
            el.style.width = `${length}px`;
        });

        cleanups.push(cleanupLengthEffect);

        const cleanupOffsetEffect = effect((): void => {
            const vl: number = x.scrollbarOffset.value;
            const offset: number = Number.isNaN(vl) ? 0 : vl;
            el.style.left = `${offset}px`;
        });

        cleanups.push(cleanupOffsetEffect);

        const cleanupClassEffect = effect((): void => {
            const {
                isActive,
                options: { activeThumbClassName },
            } = x;

            if (isActive.value) {
                // active
                if (headless) {
                    // headless
                    if (activeThumbClassName !== false) {
                        el.classList.add(activeThumbClassName);
                    }
                } else {
                    // normal
                    el.classList.add("sla-active");
                }
            } else {
                // inactive
                if (headless) {
                    // headless
                    if (activeThumbClassName !== false) {
                        el.classList.remove(activeThumbClassName);
                    }
                } else {
                    // normal
                    el.classList.remove("sla-active");
                }
            }
        });

        cleanups.push(cleanupClassEffect);

        const cleanupActiveEffect = effect((): void => {
            x.options.onActive?.({
                isActive: x.isActive.value,
            });
        });

        cleanups.push(cleanupActiveEffect);

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
