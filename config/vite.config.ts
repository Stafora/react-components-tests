import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
import path from "path";

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: path.resolve(__dirname, "./postcss.config.js")
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('../src', import.meta.url)),
            buffer: 'buffer',
            process: 'process/browser',
        }
    },
    test: {
        setupFiles: "./cypress.config.ts",
    },
    server: {
        port: 3000
    }
})