import type { Options } from "tsdown";

import { defineConfig } from "tsdown";

const options: Options = {
    entry: {
        // public
        index: "./src/index.ts",
        init: "./src/init.ts",
        // internal
        "contexts/scrollcore": "./src/contexts/scrollcore.ts",
        "functions/props/get": "./src/functions/props/get.ts",
        "functions/props/set": "./src/functions/props/set.ts",
        "hooks/length": "./src/hooks/length.ts",
        "hooks/props": "./src/hooks/props.ts",
        "hooks/scroll": "./src/hooks/scroll.ts",
        "hooks/thumb/x": "./src/hooks/thumb/x.ts",
        "hooks/thumb/y": "./src/hooks/thumb/y.ts",
    },
    dts: false,
    outDir: "./dist",
    clean: true,
    platform: "browser",
    treeshake: true,
    sourcemap: true,
    minify: false,
    shims: true,
    unbundle: true,
    inputOptions: {
        experimental: {
            attachDebugInfo: "none",
        },
    },
};

export default defineConfig([
    {
        ...options,
        format: "esm",
    },
    {
        ...options,
        dts: true,
        format: "cjs",
    },
]);
