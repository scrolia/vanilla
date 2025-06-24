import type { ReadonlySignal } from "@preact/signals-core";

import type { ScrollCore } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";
import type { OnScrollResult, OnSetLengthResult } from "#/@types/options";

import { computed, effect } from "@preact/signals-core";

/** Options for the `createContainer` function. */
type CreateContainerOptions = {
    core: ScrollCore;
};

/** Result of the `createContainer` function. */
type CreateContainer = CreateComponent;

/** Function to create the container. */
const createContainer = (options: CreateContainerOptions): CreateContainer => {
    const {
        options: { disabled, page, onSetLength, onScroll },
        content,
        x,
        y,
    } = options.core;

    const isDefinedX: ReadonlySignal<boolean> = computed(
        (): boolean => x.hvTrack.value && x.hvThumb.value,
    );
    const isDefinedY: ReadonlySignal<boolean> = computed(
        (): boolean => y.hvTrack.value && y.hvThumb.value,
    );

    const attach = (_: HTMLElement): (() => void) => {
        let cleanups: (() => void)[] = [];

        // set length
        const cleanupSetLengthEffect = effect((): (() => void) => {
            const setLength = (): void => {
                const fnX = (): void => {
                    const { total, view, viewOffset, scrollbarLength } = x;

                    let _total: number = 0;
                    let _view: number = 0;

                    if (page) {
                        _total = document.body.scrollWidth;
                        _view = window.innerWidth;
                    } else if (content.value) {
                        _total = content.value.scrollWidth ?? 0;
                        _view = content.value.clientWidth ?? 0;
                    }

                    if (total.value === _total && view.value === _view)
                        return void 0;

                    total.value = _total;
                    view.value = _view;

                    const scrollbarLengthNext: number =
                        (_view / _total) * _view;

                    const result: OnSetLengthResult | undefined = onSetLength?.(
                        {
                            position: "x",
                            isDisabled: disabled,
                            isPage: page,
                            isDefined: isDefinedX.value,
                            total: _total,
                            view: _view,
                            viewOffset: viewOffset.value,
                            scrollbarLengthPrev: scrollbarLength.value,
                            scrollbarLengthNext,
                        },
                    );

                    let length: number;

                    if (result?.scrollbarLength) {
                        length = result.scrollbarLength;
                    } else {
                        length = scrollbarLengthNext;
                    }

                    if (view >= total) {
                        scrollbarLength.value = 0;
                    } else {
                        scrollbarLength.value = length;
                    }
                };

                const fnY = (): void => {
                    const { total, view, viewOffset, scrollbarLength } = y;

                    let _total: number = 0;
                    let _view: number = 0;

                    if (page) {
                        _total = document.body.scrollHeight;
                        _view = window.innerHeight;
                    } else if (content.value) {
                        _total = content.value.scrollHeight ?? 0;
                        _view = content.value.clientHeight ?? 0;
                    }

                    if (y.total.value === _total && y.view.value === _view)
                        return void 0;

                    total.value = _total;
                    view.value = _view;

                    const scrollbarLengthNext: number =
                        (_view / _total) * _view;

                    const result: OnSetLengthResult | undefined = onSetLength?.(
                        {
                            position: "y",
                            isDisabled: disabled,
                            isPage: page,
                            isDefined: isDefinedY.value,
                            total: _total,
                            view: _view,
                            viewOffset: viewOffset.value,
                            scrollbarLengthPrev: scrollbarLength.value,
                            scrollbarLengthNext,
                        },
                    );

                    let length: number;

                    if (result?.scrollbarLength) {
                        length = result.scrollbarLength;
                    } else {
                        length = scrollbarLengthNext;
                    }

                    if (view >= total) {
                        scrollbarLength.value = 0;
                    } else {
                        scrollbarLength.value = length;
                    }
                };

                isDefinedX.value && fnX();
                isDefinedY.value && fnY();
            };

            setLength();

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

        cleanups.push(cleanupSetLengthEffect);

        // handle scroll
        const cleanupScrollEffect = effect((): (() => void) => {
            const handleScroll = (): void => {
                const fnX = (): void => {
                    const { total, view, viewOffset, scrollbarOffset } = x;

                    if (page) {
                        viewOffset.value = window.scrollX;
                    } else if (content.value) {
                        viewOffset.value = content.value.scrollLeft ?? 0;
                    }

                    const scrollbarOffsetNext: number =
                        (viewOffset.value / total.value) * view.value;

                    const result: OnScrollResult | undefined = onScroll?.({
                        position: "x",
                        isDisabled: disabled,
                        isPage: page,
                        isDefined: isDefinedX.value,
                        total: total.value,
                        view: view.value,
                        viewOffset: viewOffset.value,
                        scrollbarOffsetPrev: scrollbarOffset.value,
                        scrollbarOffsetNext,
                    });

                    let offset: number;

                    if (result?.scrollbarOffset) {
                        offset = result.scrollbarOffset;
                    } else {
                        offset = scrollbarOffsetNext;
                    }

                    scrollbarOffset.value = offset;
                };

                const fnY = (): void => {
                    const { total, view, viewOffset, scrollbarOffset } = y;

                    if (page) {
                        viewOffset.value = window.scrollY;
                    } else if (content.value) {
                        viewOffset.value = content.value.scrollTop ?? 0;
                    }

                    const scrollbarOffsetNext: number =
                        (viewOffset.value / total.value) * view.value;

                    const result: OnScrollResult | undefined = onScroll?.({
                        position: "y",
                        isDisabled: disabled,
                        isPage: page,
                        isDefined: isDefinedY.value,
                        total: total.value,
                        view: view.value,
                        viewOffset: viewOffset.value,
                        scrollbarOffsetPrev: scrollbarOffset.value,
                        scrollbarOffsetNext,
                    });

                    let offset: number;

                    if (result?.scrollbarOffset) {
                        offset = result.scrollbarOffset;
                    } else {
                        offset = scrollbarOffsetNext;
                    }

                    scrollbarOffset.value = offset;
                };

                isDefinedX.value && fnX();
                isDefinedY.value && fnY();
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

export type { CreateContainerOptions, CreateContainer };
export { createContainer };
