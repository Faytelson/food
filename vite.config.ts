import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imagetools()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/App/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@api": path.resolve(__dirname, "src/api"),
    },
  },
});
