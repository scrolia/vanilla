[@scrolia/vanilla](../README.md) / createScrollbar

# Function: createScrollbar()

```ts
function createScrollbar(options?): CreateScrollbar;
```

Defined in: [package/src/base/index.ts:77](https://github.com/scrolia/vanilla/blob/784fa66d2c3095879dee41e04a2e1311a42678e0/package/src/base/index.ts#L77)

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

#### activeThumbClassName?

`string` \| `false`

The class name for thumb active state in headless mode.

By default, it is disabled with `false`.

#### activeTrackClassName?

`string` \| `false`

The class name for track active state in headless mode.

By default, it is disabled with `false`.

#### disabled?

`boolean`

Whether disable the scrollbar.

By default, it is `false`.

#### headless?

`boolean`

Whether enable headless mode.

By default, it is `false`.

#### page?

`boolean`

Whether the scrollbar serve for a page.

By default, it is `false`.

#### setScrollbarLength?

(`length`) => `number`

Set the length of the scrollbar.

By default, it match with the default style.

#### x?

\{
  `activeThumbClassName?`: `string` \| `false`;
  `activeTrackClassName?`: `string` \| `false`;
  `onActive?`: (`options`) => `void`;
  `setScrollbarLength?`: (`length`) => `number`;
\}

Individual options for horizontal scrollbar.

#### x.activeThumbClassName?

`string` \| `false`

The class name for thumb active state in headless mode.

By default, it is disabled with `false`.

#### x.activeTrackClassName?

`string` \| `false`

The class name for track active state in headless mode.

By default, it is disabled with `false`.

#### x.onActive?

(`options`) => `void`

Triggered on scrollbar active state change.

#### x.setScrollbarLength?

(`length`) => `number`

Set the length of the scrollbar.

By default, it match with the default style.

#### y?

\{
  `activeThumbClassName?`: `string` \| `false`;
  `activeTrackClassName?`: `string` \| `false`;
  `onActive?`: (`options`) => `void`;
  `setScrollbarLength?`: (`length`) => `number`;
\}

Individual options for vertical scrollbar.

#### y.activeThumbClassName?

`string` \| `false`

The class name for thumb active state in headless mode.

By default, it is disabled with `false`.

#### y.activeTrackClassName?

`string` \| `false`

The class name for track active state in headless mode.

By default, it is disabled with `false`.

#### y.onActive?

(`options`) => `void`

Triggered on scrollbar active state change.

#### y.setScrollbarLength?

(`length`) => `number`

Set the length of the scrollbar.

By default, it match with the default style.

## Returns

[`CreateScrollbar`](../type-aliases/CreateScrollbar.md)
