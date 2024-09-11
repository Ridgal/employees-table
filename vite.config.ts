import { defineConfig } from "vite";
import path from "path";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [react(), svgr()],
  server: {
    port: 3000,
  },
});
