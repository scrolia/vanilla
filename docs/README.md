[< Back](../README.md)

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

A basic usage example:

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

Apply styles to the components using the preferred styling solution:

```css
.sla-nsb {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.sla {
    &.sla-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .sla-content {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .sla-track {
        position: fixed;
        z-index: 1;

        &.sla-child {
            position: absolute;
        }

        &.sla-x {
            bottom: 0;
            left: 0;
            width: 100%;
            height: 12px;
        }

        &.sla-y {
            top: 0;
            right: 0;
            width: 12px;
            height: 100%;
        }
    }

    .sla-thumb {
        position: absolute;
        background-color: #99999955;

        &.sla-x {
            height: 12px;
        }

        &.sla-y {
            width: 12px;
        }
    }
}
```

```ts
import type { Options, CreateScrollbar } from "@scrolia/vanilla";

import { createScrollbar } from "@scrolia/vanilla";

// Get element with id "container"
const container: HTMLElement | null = document.getElementById("container");

if (!container) throw new Error("Container not found");

type AttachScrollbarOptions = Pick<Options, "disabled" | "page">;

// Wrap with a function to apply options
const attachScrollbar = (
    container: HTMLElement, 
    options?: AttachScrollbarOptions
): void => {
    const { disabled, page } = options ?? {};

    // Create scrollbar
    const scrollbar: CreateScrollbar = createScrollbar({
        disabled,
        page
    });

    // Apply styles for each element
    container.classList.add("sla", "sla-container");

    const content: HTMLElement = document.createElement("div");
    content.classList.add("sla-nsb", "sla-content");

    const trackX: HTMLElement = document.createElement("div");
    trackX.classList.add("sla-track", "sla-x");
    !page && trackX.classList.add("sla-child");

    const trackY: HTMLElement = document.createElement("div");
    trackY.classList.add("sla-track", "sla-y");
    !page && trackY.classList.add("sla-child");

    const thumbX: HTMLElement = document.createElement("div");
    thumbX.classList.add("sla-thumb", "sla-x");

    const thumbY: HTMLElement = document.createElement("div");
    thumbY.classList.add("sla-thumb", "sla-y");

    // Attach scrollbar to container
    const destroyScrollbar: () => void = scrollbar.attach(container, {
        content,
        trackX,
        trackY,
        thumbX,
        thumbY,
    });

    // Destroy scrollbar on unload
    window.addEventListener("unload", destroyScrollbar);
};

attachScrollbar(container);
```
