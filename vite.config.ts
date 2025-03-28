import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import electron from "vite-plugin-electron";

export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: "src/main/main.ts",
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/renderer",
    emptyOutDir: true,
  },
});
