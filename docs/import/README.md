[< Back](../../README.md)

# Scrolia Vanilla

This is the documentation for Scrolia Vanilla.

## Installation

Install this package as a dependency in the project:

```sh
# npm
npm i @scrolia/vanilla

# Yarn
yarn add @scrolia/vanilla

# pnpm
pnpm add @scrolia/vanilla

# Deno
deno add npm:@scrolia/vanilla

# Bun
bun add @scrolia/vanilla
```

## Usage

Import CSS for the default styles:

```ts
import "@scrolia/vanilla/css";
// or
import "@scrolia/vanilla/dist/index.css";
```

For page scrollbar:

```ts
import type { CreateScrollbar } from "@scrolia/vanilla";

import { createScrollbar } from "@scrolia/vanilla";

// Get element with id "container"
const container: HTMLElement | null = document.getElementById("container");

if (!container) throw new Error("Container not found");

// Create scrollbar
const scrollbar: CreateScrollbar = createScrollbar({
    page: true,
});

// Attach scrollbar to container
const destroyScrollbar: () => void = scrollbar.attach(container);

// Destroy scrollbar on unload
window.addEventListener("unload", destroyScrollbar);
```

For component scrollbar:

```ts
import type { CreateScrollbar } from "@scrolia/vanilla";

import { createScrollbar } from "@scrolia/vanilla";

// Get element with id "container"
const container: HTMLElement | null = document.getElementById("container");

if (!container) throw new Error("Container not found");

// Create scrollbar
const scrollbar: CreateScrollbar = createScrollbar();

// Attach scrollbar to container
const destroyScrollbar: () => void = scrollbar.attach(container);

// Destroy scrollbar on unload
window.addEventListener("unload", destroyScrollbar);
```

For scrollbar colors customization, overwrite the following CSS variables:

```css
:root {
    --scrollbar-base: #99999955;
    --scrollbar-hover: #99999977;
    --scrollbar-active: #99999999;
}
```

For more customization:

```ts
import type { CreateScrollbar } from "@scrolia/vanilla";

import { createScrollbar } from "@scrolia/vanilla";

const ctr: HTMLElement | null = document.getElementById("container");
const ct: HTMLElement | null = document.getElementById("content");
const tkx: HTMLElement | null = document.getElementById("trackX");
const tky: HTMLElement | null = document.getElementById("trackY");
const thx: HTMLElement | null = document.getElementById("thumbX");
const thy: HTMLElement | null = document.getElementById("thumbY");

if (!ctr || !ct || !tkx || !tky || !thx || !thy) {
    throw new Error("Element(s) not found");
}

const {
    container,
    content,
    trackX,
    trackY,
    thumbX,
    thumbY,
}: CreateScrollbar = createScrollbar({
    headless: true, // remove all the default styles
});

// Attach
const destroyContainer: () => void = container.attach(ctr);
const destroyContent: () => void = content.attach(ct);
const destroyTrackX: () => void = trackX.attach(tkx);
const destroyTrackY: () => void = trackY.attach(tky);
const destroyThumbX: () => void = thumbX.attach(thx);
const destroyThumbY: () => void = thumbY.attach(thy);

// Destroy scrollbar on unload
window.addEventListener("unload", (): void => {
    destroyContainer();
    destroyContent();
    destroyTrackX();
    destroyTrackY();
    destroyThumbX();
    destroyThumbY();
});
```
