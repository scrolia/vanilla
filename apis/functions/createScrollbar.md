[@scrolia/vanilla](../README.md) / createScrollbar

# Function: createScrollbar()

```ts
function createScrollbar(options?): CreateScrollbar;
```

Defined in: package/src/components/index.ts:81

Function to create the scrollbar.

### Example

```ts
import type { CreateScrollbar } from "@scrolia/vanilla";

import { createScrollbar } from "@scrolia/vanilla";

const el: HTMLElement = document.getElementById("container");

const scrollbar: CreateScrollbar = createScrollbar();

scrollbar.attach(el);
```

## Parameters

### options?

#### disabled?

`boolean`

Whether disable the scrollbar.

By default, it is `false`.

#### onDragEnd?

(`options`) => `void`

The function to be called when the scrollbar is released.

#### onDragMove?

(`options`) => 
  \| `undefined`
  \| \{
  `scrollTo?`: `number`;
\}

The function to be called when the scrollbar is dragged and move.

#### onDragStart?

(`options`) => `void`

The function to be called when the scrollbar is being dragged.

#### onScroll?

(`options`) => 
  \| `undefined`
  \| \{
  `scrollbarOffset?`: `number`;
\}

The function to be called when the scrollbar is being scrolled.

#### onSetLength?

(`options`) => 
  \| `undefined`
  \| \{
  `scrollbarLength?`: `number`;
\}

The function to be called when the length of the scrollbar is being set.

#### page?

`boolean`

Whether the scrollbar serve for a page.

By default, it is `false`.

## Returns

[`CreateScrollbar`](../type-aliases/CreateScrollbar.md)
