[< Back](../../README.md)

# Scrolia Vanilla (CDN)

This is the documentation for Scrolia Vanilla (CDN).

## Installation

To use Scrolia via CDN, add the following tags to the HTML:

> Choose the CDN provider based on the preference.

> Replace `x.x.x` with the version number looking for.

```html
<!-- jsDelivr -->
<script
    src="https://cdn.jsdelivr.net/npm/@scrolia/vanilla@x.x.x/dist/scrolia.js"
></script>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@scrolia/vanilla@x.x.x/dist/index.css"
/>

<!-- UNPKG -->
 <script
    src="https://unpkg.com/@scrolia/vanilla@x.x.x/dist/scrolia.js"
></script>
<link
    rel="stylesheet"
    href="https://unpkg.com/@scrolia/vanilla@x.x.x/dist/index.css"
/>
```

For production, use the minified version:

> Choose the CDN provider based on the preference.

> Replace `x.x.x` with the version number looking for.

```html
<!-- jsDelivr -->
<script
    src="https://cdn.jsdelivr.net/npm/@scrolia/vanilla@x.x.x/dist/scrolia.min.js"
></script>
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@scrolia/vanilla@x.x.x/dist/index.min.css"
/>

<!-- UNPKG -->
<script
    src="https://unpkg.com/@scrolia/vanilla@x.x.x/dist/scrolia.min.js"
></script>
<link
    rel="stylesheet"
    href="https://unpkg.com/@scrolia/vanilla@x.x.x/dist/index.min.css"
/>
```

## Usage

For page scrollbar:

```js
// Get element with id "container"
const container = document.getElementById("container");

if (!container) throw new Error("Container not found");

// Create scrollbar
const scrollbar = scrolia.createScrollbar({
    page: true,
});

// Attach scrollbar to container
const destroyScrollbar = scrollbar.attach(container);

// Destroy scrollbar on unload
window.addEventListener("unload", destroyScrollbar);
```

For component scrollbar:

```js
// Get element with id "container"
const container = document.getElementById("container");

if (!container) throw new Error("Container not found");

// Create scrollbar
const scrollbar = scrolia.createScrollbar();

// Attach scrollbar to container
const destroyScrollbar = scrollbar.attach(container);

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

```js
const ctr = document.getElementById("container");
const ct = document.getElementById("content");
const tkx = document.getElementById("trackX");
const tky = document.getElementById("trackY");
const thx = document.getElementById("thumbX");
const thy = document.getElementById("thumbY");

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
} = createScrollbar({
    headless: true, // remove all the default styles
});

// Attach
const destroyContainer = container.attach(ctr);
const destroyContent = content.attach(ct);
const destroyTrackX = trackX.attach(tkx);
const destroyTrackY = trackY.attach(tky);
const destroyThumbX = thumbX.attach(thx);
const destroyThumbY = thumbY.attach(thy);

// Destroy scrollbar on unload
window.addEventListener("unload", () => {
    destroyContainer();
    destroyContent();
    destroyTrackX();
    destroyTrackY();
    destroyThumbX();
    destroyThumbY();
});
```
