import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import Input from "./src/resources/helpersHbs/Input";
import Button from "./src/resources/helpersHbs/Button";
import ButtonMin from "./src/resources/helpersHbs/ButtonMin";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: ["index.html", "login.html", "registration.html", "profile.html", "errors.html"],
      output: {
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").at(1);
          if (/(png|jpe?g|svggetParamsFromHbsHelper|gif|tiff|bmp|ico)$/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (ext === "ttf") {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (ext === "css") {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/resources/templatesHbs"),
      helpers: {
        Input,
        Button,
        ButtonMin,
      },
    }),
  ],
});
