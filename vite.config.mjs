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
         "@scripts": path.resolve(
            __dirname,
            "./src/scripts"
         ),
      },
   },
});
