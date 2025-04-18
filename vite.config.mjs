import { defineConfig } from "vite";
import path from "path";

// TODO: activar el uso de @ o averiguar por que no se ejecuta en "npm run dev"
export default defineConfig({
   resolve: {
      alias: {
         "@": path.resolve(__dirname),
         "@flags": path.resolve(__dirname, "./public/images/flags"),
         "@coat-of-arms": path.resolve(
            __dirname,
            "./public/images/coat-of-arms"
         ),
         "@src": path.resolve(__dirname, "./src"),
         "@scripts": path.resolve(__dirname, "./src/scripts"),
      },
   },
   build: {
      rollupOptions: {
         input: {
            main: path.resolve(__dirname, "index.html"), // index en el root
            about: path.resolve(__dirname, "src/about-the-game.html"),
            clues: path.resolve(__dirname, "src/clues-mode.html"),
            credits: path.resolve(__dirname, "src/credits.html"),
            flag: path.resolve(__dirname, "src/flag-gallery.html"),
            game: path.resolve(__dirname, "src/game-modes.html"),
            multipleChoice: path.resolve(
               __dirname,
               "src/multipleChoise-mode.html"
            ),
            record: path.resolve(__dirname, "src/record-mode.html"),
            time: path.resolve(__dirname, "src/time-trial-mode.html"),
         },
      },
   },
   base: "/tupais/",
});
