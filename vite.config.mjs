import { defineConfig } from "vite";
import { resolve } from "path";

const base = "/tupais/";
const root = resolve(__dirname);
const outDir = resolve(__dirname, "dist");

// TODO: activar el uso de @ o averiguar por que no se ejecuta en "npm run dev"
export default defineConfig({
   root,
   resolve: {
      alias: {
         "@": resolve(__dirname),
         "@flags": resolve(__dirname, "./public/images/flags"),
         "@coat-of-arms": resolve(__dirname, "./public/images/coat-of-arms"),
         "@src": resolve(__dirname, "./src"),
         "@utils": resolve(__dirname, "./src/utils"),
      },
   },
   build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
         // TODO: modificar rutas a los puntos de entrada para que sean correctos
         input: {
            main: resolve(__dirname, "index.html"), // index en el root
            about: resolve(__dirname, "src/pages/about/about.html"),
            clues: resolve(__dirname, "src/pages/clues-mode/clues-mode.html"),
            credits: resolve(__dirname, "src/pages/credits/credits.html"),
            flag: resolve(
               __dirname,
               "src/pages/flag-gallery/flag-gallery.html"
            ),
            game: resolve(__dirname, "src/pages/game-modes/game-modes.html"),
            multipleChoice: resolve(
               __dirname,
               "src/pages/multiple-choice-mode/multiple-choice-mode.html"
            ),
            record: resolve(
               __dirname,
               "src/pages/record-mode/record-mode.html"
            ),
            time: resolve(
               __dirname,
               "src/pages/time-trial-mode/time-trial-mode.html"
            ),
         },
      },
   },
   base: base,
});
