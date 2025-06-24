import { app } from "#/app";

const root: HTMLElement | null = document.getElementById("root");

if (!root) {
    throw new Error("root element not found");
}

root.appendChild(app);
