## Next

### What's Changed

- optimize internal states logic

## 0.6.0 (2025-08-09)

Reworked the implementation.

### Breaking Changes

- remove default styles
- remove all previous options

### What's New

- implemented as Web Component
- headless by default
- provider component now accepts the following props:
    - `disabled`
    - `page`
    - `plugins`

### Migrating from 0.5.0 to 0.6.0

Update the JS code:

```diff
- import type { CreateScrollbar } from "@scrolia/vanilla";

- import { createScrollbar } from "@scrolia/vanilla";

- const container: HTMLElement | null = document.getElementById("container");

- if (!container) throw new Error("Container not found");

- const scrollbar: CreateScrollbar = createScrollbar();

- const destroyScrollbar: () => void = scrollbar.attach(container);

- window.addEventListener("unload", destroyScrollbar);

+ import "@scrolia/vanilla/init";
```

HTML setup:

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

## 0.5.0 (2025-06-20)

### What's New

- add sourcemap support for CSS

### What's Changed

- avoid `NaN` value to be passed to CSS style property
- remove `@scrolia/shared` from dependencies

## 0.4.0 (2025-04-17)

### Breaking Changes

- remove `pageScrollbar` and `componentScrollbar` function
- remove `checkDeviceEnvironment` function
- move and rename options:
    - `contentProps` => `attributes.content`
    - `trackXProps` => `attributes.trackX`
    - `trackYProps` => `attributes.trackY`
    - `thumbXProps` => `attributes.thumbX`
    - `thumbYProps` => `attributes.thumbY`
- remove options:
    - `color`
    - `colorHover`
    - `colorActive`
    - `containerProps`

### What's New

- add `createScrollbar` function
- add `page` option
- add `headless` option
- add `setScrollbarLength` option
- add `activeTrackClassName` option
- add `activeThumbClassName` option
- add `x` object option
- add `y` object option
- add sourcemap support

### Migrating from 0.3.0 to 0.4.0

For page scrollbar:

```diff
+ import type { CreateScrollbar } from "@scrolia/vanilla";

- import { pageScrollbar } from "@scrolia/vanilla";
+ import { createScrollbar } from "@scrolia/vanilla";

const container: HTMLDivElement = document.createElement("div");

- pageScrollbar(container);
+ const scrollbar: CreateScrollbar = createScrollbar({
+    page: true,  
+ });

+ const destroyScrollbar: () => void = scrollbar.attach(container);

+ window.addEventListener("beforeunload", destroyScrollbar);
```

For component scrollbar:

```diff
+ import type { CreateScrollbar } from "@scrolia/vanilla";

- import { componentScrollbar } from "@scrolia/vanilla";
+ import { createScrollbar } from "@scrolia/vanilla";

const container: HTMLDivElement = document.createElement("div");

- componentScrollbar(container);
+ const scrollbar: CreateScrollbar = createScrollbar();

+ const destroyScrollbar: () => void = scrollbar.attach(container);

+ window.addEventListener("beforeunload", destroyScrollbar);
```

## 0.3.0 (2024-12-18)

### Breaking Changes

- remove `enable` prop, use `disabled` prop instead
- rename `colorDrag` to `colorActive`
- update `checkDeviceEnvironment` function for the new prop

### What's New

- add `disabled` prop
- component now require the CSS to be imported

### What's Changed

- add missing `Position` type

## 0.2.3 (2024-12-10)

### What's Changed

- fix on the scrollbar update function
- remove unused track and thumb on specific position

## 0.2.2 (2024-12-01)

### What's Changed

- better support for the scrollbar on navigation
- performance optimization

## 0.2.1 (2024-11-29)

### What's Changed

- fix the issue that scrollbar do not appear when the track on hover
- export type `HTMLAttributes`

## 0.2.0 (2024-11-28)

### What's New

- add support for ES Module
- add `checkDeviceEnvironment` function
- add `enable` option

### What's Changed

- support all environments by default

## 0.1.1 (2024-05-30)

### What's Changed

- prevent update on popstate event in same URL

## 0.1.0 (2024-05-30)

initial release
