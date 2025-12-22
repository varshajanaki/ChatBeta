import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 👈 frontend port
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 👈 backend
        changeOrigin: true,
      },
    },
  },
});
