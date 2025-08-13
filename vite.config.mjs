import { defineConfig } from "vite";
import { resolve } from "path";

const base = "/tupais/";
const root = resolve(__dirname);
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  resolve: {
    alias: {
      "@": resolve(__dirname),
      "@data": resolve(__dirname, "./src/data"),
      "@flags": resolve(__dirname, "./public/images/flags"),
      "@coat-of-arms": resolve(__dirname, "./public/images/coat-of-arms"),
      "@src": resolve(__dirname, "./src"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@layouts": resolve(__dirname, "./src/layouts"),
      "@Modal": resolve(__dirname, "./src/components/Modal"),
      "@components": resolve(__dirname, "./src/components"),
      "@constants": resolve(__dirname, "./src/constants"),
      "@shared": resolve(__dirname, "./src/shared"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@store": resolve(__dirname, "./src/store")
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  base: base,
});
