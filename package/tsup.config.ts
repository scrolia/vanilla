import type { Options } from "tsup";

import { defineConfig } from "tsup";

const options: Options = {
    entry: {
        index: "./src/index.ts",
    },
    sourcemap: true,
    outDir: "./dist",
    platform: "browser",
    tsconfig: "./tsconfig.json",
};

const iifeOptions: Options = {
    ...options,
    target: "es5",
    outExtension: () => ({
        js: ".js",
    }),
    format: "iife",
    sourcemap: false,
    globalName: "scrolia",
};

export default defineConfig([
    {
        ...options,
        format: "esm",
    },
    {
        ...options,
        format: "cjs",
        dts: true,
    },
    // iife
    {
        ...iifeOptions,
        entry: {
            scrolia: "./src/index.ts",
        },
    },
    // iife minify
    {
        ...iifeOptions,
        entry: {
            "scrolia.min": "./src/index.ts",
        },
        minify: true,
    },
]);
