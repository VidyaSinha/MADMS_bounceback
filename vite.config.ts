import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    host: "localhost",
    proxy: {
      // Proxy API requests to backend running on port 10000 (local dev only)
      "/api": {
        target: "http://127.0.0.1:10000", // Change to your Render URL when hosted
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 8080,
    host: "localhost",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
