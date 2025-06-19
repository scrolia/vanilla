## 0.5.0

### What's New

- Add sourcemap support for CSS

### What's Changed

- Avoid `NaN` value to be passed to CSS style property
- Remove `@scrolia/shared` from dependencies

## 0.4.0 (2025-04-17)

### Breaking Changes

- Remove `pageScrollbar` and `componentScrollbar` function
- Remove `checkDeviceEnvironment` function
- Move and rename options:
    - `contentProps` => `attributes.content`
    - `trackXProps` => `attributes.trackX`
    - `trackYProps` => `attributes.trackY`
    - `thumbXProps` => `attributes.thumbX`
    - `thumbYProps` => `attributes.thumbY`
- Remove options:
    - `color`
    - `colorHover`
    - `colorActive`
    - `containerProps`

### What's New

- Add `createScrollbar` function
- Add `page` option
- Add `headless` option
- Add `setScrollbarLength` option
- Add `activeTrackClassName` option
- Add `activeThumbClassName` option
- Add `x` object option
- Add `y` object option
- Add sourcemap support

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

- Remove `enable` prop, use `disabled` prop instead
- Rename `colorDrag` to `colorActive`
- Update `checkDeviceEnvironment` function for the new prop

### What's New

- Add `disabled` prop
- Component now require the CSS to be imported

### What's Changed

- Add missing `Position` type

## 0.2.3 (2024-12-10)

### What's Changed

- Fix on the scrollbar update function
- Remove unused track and thumb on specific position

## 0.2.2 (2024-12-01)

### What's Changed

- Better support for the scrollbar on navigation
- Performance optimization

## 0.2.1 (2024-11-29)

### What's Changed

- Fix the issue that scrollbar do not appear when the track on hover
- Export type `HTMLAttributes`

## 0.2.0 (2024-11-28)

### What's New

- Add support for ES Module
- Add `checkDeviceEnvironment` function
- Add `enable` option

### What's Changed

- Support all environments by default

## 0.1.1 (2024-05-30)

### What's Changed

- Prevent update on popstate event in same URL

## 0.1.0 (2024-05-30)

First release
