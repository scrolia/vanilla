import type { CreateScrollbar } from "@scrolia/vanilla";

import { createScrollbar } from "@scrolia/vanilla";

import { page } from "#/pages";

import "#/styles/index.css";
import "@scrolia/vanilla/dist/index.css";

const app: HTMLDivElement = document.createElement("div");

const container: HTMLDivElement = document.createElement("div");

app.appendChild(container);

container.appendChild(page);

const scrollbar: CreateScrollbar = createScrollbar({
    page: true,
});

const destroyScrollbar: () => void = scrollbar.attach(container);

window.addEventListener("beforeunload", destroyScrollbar);

export { app };
