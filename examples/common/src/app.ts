import { attachScrollbar } from "#/components/scrollbar";
import { page } from "#/pages";

import "#/styles/index.css";

const app: HTMLDivElement = document.createElement("div");

app.appendChild(page);

attachScrollbar(app, {
    page: true,
});

export { app };
