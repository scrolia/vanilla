import { attachScrollbar } from "#/components/scrollbar";
import { page } from "#/pages";

import "#/styles/index.css";

const container: HTMLDivElement = document.createElement("div");

container.appendChild(page);

attachScrollbar(container, {
    page: true,
});

const app: HTMLDivElement = document.createElement("div");

app.appendChild(container);

export { app };
