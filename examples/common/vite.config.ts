import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tsconfigPaths(),
    ],
    server: {
        port: 3001,
    },
    preview: {
        port: 3000,
    },
    optimizeDeps: {
        exclude: [
            "@scrolia/vanilla",
        ],
    },
});
