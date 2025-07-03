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

Define the components from the package:

```ts
import "@scrolia/vanilla/init";
```

Or define it manually:

```ts
// This is same as above

import { Scrollbar as S } from "@scrolia/vanilla";

customElements.define("scrollbar-provider", S.Provider);
customElements.define("scrollbar-container", S.Container);
customElements.define("scrollbar-content", S.Content);
customElements.define("scrollbar-track-x", S.TrackX);
customElements.define("scrollbar-track-y", S.TrackY);
customElements.define("scrollbar-thumb-x", S.ThumbX);
customElements.define("scrollbar-thumb-y", S.ThumbY);
```

A basic usage example:

```html
<scrollbar-provider>
    <scrollbar-container>
        <scrollbar-content><!-- Content --></scrollbar-content>
        <scrollbar-track-x>
            <scrollbar-thumb-x></scrollbar-thumb-x>
        </scrollbar-track-x>
        <scrollbar-track-y>
            <scrollbar-thumb-y></scrollbar-thumb-y>
        </scrollbar-track-y>
    </scrollbar-container>
</scrollbar-provider>
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
    &.sla-provider {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .sla-container {
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

HTML page setup:

```html
<scrollbar-provider page class="sla sla-provider">
    <scrollbar-container class="sla-container">
        <scrollbar-content class="sla-content">
            <!-- Content -->
        </scrollbar-content>
        <scrollbar-track-x class="sla-track sla-x">
            <scrollbar-thumb-x class="sla-thumb sla-x"></scrollbar-thumb-x>
        </scrollbar-track-x>
        <scrollbar-track-y class="sla-track sla-y">
            <scrollbar-thumb-y class="sla-thumb sla-y"></scrollbar-thumb-y>
        </scrollbar-track-y>
    </scrollbar-container>
</scrollbar-provider>
```

HTML component setup:

```html
<scrollbar-provider class="sla sla-provider">
    <scrollbar-container class="sla-container">
        <scrollbar-content class="sla-content">
            <!-- Content -->
        </scrollbar-content>
        <scrollbar-track-x class="sla-track sla-child sla-x">
            <scrollbar-thumb-x class="sla-thumb sla-x"></scrollbar-thumb-x>
        </scrollbar-track-x>
        <scrollbar-track-y class="sla-track sla-child sla-y">
            <scrollbar-thumb-y class="sla-thumb sla-y"></scrollbar-thumb-y>
        </scrollbar-track-y>
    </scrollbar-container>
</scrollbar-provider>
```
