# Scrolia

A customizable scrollbar component.

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

## Quick Start

To create a scrollbar, use the following code:

```ts
import type { CreateScrollbar } from "@scrolia/vanilla";

import { createScrollbar } from "@scrolia/vanilla";

import "@scrolia/vanilla/css";

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

## Documentation

For using Scrolia through CDN,
please refer to the [CDN documentation](./docs/cdn/README.md).

For using Scrolia through import,
please refer to the [documentation](./docs/import/README.md).

## APIs

For the APIs,
please refer to the [APIs](./apis/README.md).

## Examples

For example of using Scrolia through CDN,
please refer to the [CDN example](./examples/cdn).

For example of using Scrolia through import,
please refer to the [example](./examples/common).

## License

This project is licensed under the terms of the MIT license.
