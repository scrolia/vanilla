import "@scrolia/vanilla/init";

import { queryByTestId } from "@testing-library/dom";
import { describe, expect, it } from "vitest";

const getDOM = (): HTMLDivElement => {
    const content: HTMLDivElement = document.createElement("div");

    content.innerHTML = `
        <scrollbar-provider data-testid="provider">
            <scrollbar-container data-testid="container">
                <scrollbar-content data-testid="content">
                    <div data-testid="content-block">content</div>
                </scrollbar-content>
                <scrollbar-track-x data-testid="track-x">
                    <scrollbar-thumb-x data-testid="thumb-x"></scrollbar-thumb-x>
                </scrollbar-track-x>
                <scrollbar-track-y data-testid="track-y">
                    <scrollbar-thumb-y data-testid="thumb-y"></scrollbar-thumb-y>
                </scrollbar-track-y>
            </scrollbar-container>
        </scrollbar-provider>
    `;

    return content;
};

describe("Scrollbar test", (): void => {
    it("should have web-components defined", () => {
        const tags = [
            "scrollbar-provider",
            "scrollbar-container",
            "scrollbar-content",
            "scrollbar-track-x",
            "scrollbar-thumb-x",
            "scrollbar-track-y",
            "scrollbar-thumb-y",
        ] as const;

        for (const tag of tags) {
            const el = customElements.get(tag);
            expect(el).toBeDefined();
            expect(typeof el).toBe("function");
        }
    });

    it("should render elements", (): void => {
        const dom: HTMLDivElement = getDOM();

        expect(queryByTestId(dom, "container")).not.toBeNull();
        expect(queryByTestId(dom, "content")).not.toBeNull();
        expect(queryByTestId(dom, "content-block")).not.toBeNull();
        expect(queryByTestId(dom, "track-x")).not.toBeNull();
        expect(queryByTestId(dom, "track-y")).not.toBeNull();
        expect(queryByTestId(dom, "thumb-x")).not.toBeNull();
        expect(queryByTestId(dom, "thumb-y")).not.toBeNull();
    });
});
