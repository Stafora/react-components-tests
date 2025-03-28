import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
plugins: [react()],
resolve: {
        alias: {
            '@': fileURLToPath(new URL('../src', import.meta.url)),
            buffer: 'buffer',
            process: 'process/browser',
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./config/vitest.setup.ts",
    }
});
