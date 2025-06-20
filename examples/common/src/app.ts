import type { CreateScrollbar } from "@scrolia/vanilla";

import { createScrollbar } from "@scrolia/vanilla";

import { page } from "#/pages";

import "#/styles/index.css";
import "@scrolia/vanilla/dist/index.css";

const container: HTMLDivElement = document.createElement("div");

container.appendChild(page);

const scrollbar: CreateScrollbar = createScrollbar({
    page: true,
});

const destroyScrollbar: () => void = scrollbar.attach(container);

window.addEventListener("unload", destroyScrollbar);

const app: HTMLDivElement = document.createElement("div");

app.appendChild(container);

export { app };
