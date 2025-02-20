import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Sesuaikan jika deploy ke subfolder
  server: {
    port: 3000,
    open: true, // Buka browser otomatis
  },
  build: {
    outDir: "dist", // Pastikan hasil build ada di dist/
  }
});
