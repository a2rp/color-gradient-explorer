import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/color-gradient-explorer/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
