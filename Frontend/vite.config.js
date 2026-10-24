import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// proxy /subscribe to the old Express backend (node server.js on port 3000)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/subscribe": "http://localhost:3000" },
  },
});
