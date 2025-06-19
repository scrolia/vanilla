import type { Core } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";

import { effect } from "@preact/signals-core";

type StartPos = {
    offsetTop: number;
    y: number;
};

type CreateThumbYOptions = {
    core: Core;
};

/** Result of the `createThumbY` function. */
type CreateThumbY = CreateComponent;

const createThumbY = (options: CreateThumbYOptions): CreateThumbY => {
    const {
        options: { disabled, page, headless },
        content,
        y,
    } = options.core;

    const attach = (el: HTMLElement): (() => void) => {
        if (disabled) return () => void 0;

        let cleanups: (() => void)[] = [];

        y.hvThumb.value = true;

        if (!headless) el.classList.add("sla-thumb", "sla-y");

        cleanups.push((): void => {
            if (!headless) el.classList.remove("sla-thumb", "sla-y");
        });

        const cleanupPointerEffect = effect((): (() => void) => {
            const handlePointerDown = (event: PointerEvent): void => {
                event.preventDefault();

                const startPos: StartPos = {
                    offsetTop: y.viewOffset.value,
                    y: event.clientY,
                };

                const handlePointerMove = (event: PointerEvent): void => {
                    const delta: number = event.clientY - startPos.y;
                    const ratio: number = y.view.value / y.total.value;
                    const top: number = startPos.offsetTop + delta / ratio;

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
            const vl: number = y.scrollbarLength.value;
            const length: number = Number.isNaN(vl) ? 0 : vl;
            el.style.height = `${length}px`;
        });

        cleanups.push(cleanupLengthEffect);

        const cleanupOffsetEffect = effect((): void => {
            const vl: number = y.scrollbarOffset.value;
            const offset: number = Number.isNaN(vl) ? 0 : vl;
            el.style.top = `${offset}px`;
        });

        cleanups.push(cleanupOffsetEffect);

        const cleanupClassEffect = effect((): void => {
            const {
                isActive,
                options: { activeThumbClassName },
            } = y;

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
            y.options.onActive?.({
                isActive: y.isActive.value,
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

export type { CreateThumbYOptions, CreateThumbY };
export { createThumbY };
