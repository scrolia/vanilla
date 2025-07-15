import viteTsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [
        viteTsconfigPaths(),
    ],
    optimizeDeps: {
        exclude: [
            "@scrolia/vanilla",
        ],
    },
    test: {
        environment: "jsdom",
    },
});
