import type { UserConfig } from "tsdown";

import { defineConfig } from "@apst/tsdown";
import {
    cjsPreset,
    dtsPreset,
    esmPreset,
    iifePreset,
} from "@apst/tsdown/presets";

const optionsBase: UserConfig = {
    platform: "browser",
};

const options: UserConfig = {
    ...optionsBase,
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
        "hooks/thumb": "./src/hooks/thumb.ts",
    },
};

const optionsIIFE: UserConfig = {
    ...optionsBase,
    entry: {
        scrolia: "./src/init.ts",
    },
    noExternal: [
        "atomico",
        "atomico/jsx-runtime",
    ],
};

const optionsIIFEMinified: UserConfig = {
    ...optionsIIFE,
    entry: {
        "scrolia.min": "./src/init.ts",
    },
    minify: true,
};

export default defineConfig([
    esmPreset(options),
    cjsPreset(options),
    dtsPreset(options),
    iifePreset(optionsIIFE),
    iifePreset(optionsIIFEMinified),
]);
