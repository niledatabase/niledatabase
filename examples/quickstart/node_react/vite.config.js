import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  root: path.resolve(__dirname, "src/fe"),
  build: {
    outDir: path.resolve(__dirname, "dist/fe"),
    emptyOutDir: true,
  },
  server: {
    port: 3006,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
