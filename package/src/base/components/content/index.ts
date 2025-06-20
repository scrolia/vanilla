import type { Core } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";

import { effect } from "@preact/signals-core";

type CreateContentOptions = {
    core: Core;
};

/** Result of the `createContent` function. */
type CreateContent = CreateComponent;

const createContent = (options: CreateContentOptions): CreateContent => {
    const {
        options: { disabled, headless, page },
        content,
        x,
        y,
    } = options.core;

    const attach = (el: HTMLElement): (() => void) => {
        let cleanups: (() => void)[] = [];

        content.value = el;

        if (!headless) {
            if (!disabled) {
                if (page) {
                    document.documentElement.classList.add("sla-nsb");
                } else {
                    el.classList.add("sla-nsb");
                }
            }

            el.classList.add("sla-content");

            if (!page) el.classList.add("sla-child");
        }

        cleanups.push((): void => {
            if (!headless) {
                if (!disabled) {
                    if (page) {
                        document.documentElement.classList.remove("sla-nsb");
                    } else {
                        el.classList.remove("sla-nsb");
                    }
                }

                el.classList.remove("sla-content");

                if (!page) el.classList.remove("sla-child");
            }
        });

        // handle length
        const cleanupLengthEffect = effect((): (() => void) => {
            const setLength = (): void => {
                const fnX = (): void => {
                    let total: number = 0;
                    let view: number = 0;

                    if (page) {
                        total = document.body.scrollWidth;
                        view = window.innerWidth;
                    } else if (content.value) {
                        total = content.value.scrollWidth ?? 0;
                        view = content.value.clientWidth ?? 0;
                    }

                    if (x.total.value === total && x.view.value === view)
                        return void 0;

                    x.total.value = total;
                    x.view.value = view;

                    const lengthRaw: number = (view / total) * view;
                    const length: number =
                        x.options.setScrollbarLength(lengthRaw);

                    if (view >= total) {
                        x.scrollbarLength.value = 0;
                    } else {
                        x.scrollbarLength.value = length;
                    }
                };

                const fnY = (): void => {
                    let total: number = 0;
                    let view: number = 0;

                    if (page) {
                        total = document.body.scrollHeight;
                        view = window.innerHeight;
                    } else if (content.value) {
                        total = content.value.scrollHeight ?? 0;
                        view = content.value.clientHeight ?? 0;
                    }

                    if (y.total.value === total && y.view.value === view)
                        return void 0;

                    y.total.value = total;
                    y.view.value = view;

                    const lengthRaw: number = (view / total) * view;
                    const length: number =
                        y.options.setScrollbarLength(lengthRaw);

                    if (view >= total) {
                        y.scrollbarLength.value = 0;
                    } else {
                        y.scrollbarLength.value = length;
                    }
                };

                x.hvTrack.value && x.hvThumb.value && fnX();
                y.hvTrack.value && y.hvThumb.value && fnY();
            };

            if (page) {
                window.addEventListener("load", setLength);
                window.addEventListener("resize", setLength);
                window.addEventListener("scroll", setLength);
            } else if (content.value) {
                requestAnimationFrame(setLength);
                content.value.addEventListener("resize", setLength);
                content.value.addEventListener("scroll", setLength);
            }

            return (): void => {
                if (page) {
                    window.removeEventListener("load", setLength);
                    window.removeEventListener("resize", setLength);
                    window.removeEventListener("scroll", setLength);
                } else if (content.value) {
                    content.value.removeEventListener("load", setLength);
                    content.value.removeEventListener("resize", setLength);
                    content.value.removeEventListener("scroll", setLength);
                }
            };
        });

        cleanups.push(cleanupLengthEffect);

        // handle scroll
        const cleanupScrollEffect = effect((): (() => void) => {
            const handleScroll = (): void => {
                const fnX = (): void => {
                    if (page) {
                        x.viewOffset.value = window.scrollX;
                    } else if (content.value) {
                        x.viewOffset.value = content.value.scrollLeft ?? 0;
                    }

                    const _offset: number =
                        (x.viewOffset.value / x.total.value) * x.view.value;

                    if (_offset === x.scrollbarOffset.value) return void 0;

                    x.scrollbarOffset.value = _offset;

                    if (x.timeout.value) clearTimeout(x.timeout.value);

                    x.isActive.value = true;

                    x.timeout.value = setTimeout((): void => {
                        x.isActive.value = false;
                    }, 1000);
                };

                const fnY = (): void => {
                    if (page) {
                        y.viewOffset.value = window.scrollY;
                    } else if (content.value) {
                        y.viewOffset.value = content.value.scrollTop ?? 0;
                    }

                    const _offset: number =
                        (y.viewOffset.value / y.total.value) * y.view.value;

                    if (_offset === y.scrollbarOffset.value) return void 0;

                    y.scrollbarOffset.value = _offset;

                    if (y.timeout.value) clearTimeout(y.timeout.value);

                    y.isActive.value = true;

                    y.timeout.value = setTimeout((): void => {
                        y.isActive.value = false;
                    }, 1000);
                };

                x.hvTrack.value && x.hvThumb.value && fnX();
                y.hvTrack.value && y.hvThumb.value && fnY();
            };

            if (page) {
                window.addEventListener("scroll", handleScroll);
            } else if (content.value) {
                content.value.addEventListener("scroll", handleScroll);
            }

            return (): void => {
                if (page) {
                    window.removeEventListener("scroll", handleScroll);
                } else if (content.value) {
                    content.value.removeEventListener("scroll", handleScroll);
                }
            };
        });

        cleanups.push(cleanupScrollEffect);

        return (): void => {
            for (const cleanup of cleanups) cleanup();
            cleanups = [];
        };
    };

    return {
        attach,
    };
};

export type { CreateContentOptions, CreateContent };
export { createContent };
