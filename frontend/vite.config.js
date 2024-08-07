import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Terminal from "vite-plugin-terminal";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Terminal()],
  server: {
    port: 3001,
    host: '0.0.0.0',
  },
});

