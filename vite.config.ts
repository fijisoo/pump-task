import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    allowedHosts: true,
},
  resolve: {
    alias: {
      buffer: "vite-plugin-node-polyfills/shims/buffer",
    },
  },
  optimizeDeps: {
    exclude: ["@solana/wallet-adapter-ledger"],
  },

  build: {
    rollupOptions: {
      external: [
        "/vite-plugin-node-polyfills/shims/buffer",
        "/vite-plugin-node-polyfills/shims/process",
      ],
    },
  },
});
