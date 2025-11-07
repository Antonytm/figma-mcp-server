import { defineConfig, Plugin } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { viteSingleFile } from "vite-plugin-singlefile";
import { utimesSync } from "fs";
import { resolve } from "path";

// Plugin to touch manifest.json on build
function touchManifest(): Plugin {
  return {
    name: "touch-manifest",
    closeBundle() {
      const manifestPath = resolve(__dirname, "manifest.json");
      try {
        // Touch the file by updating its modification time
        const now = new Date();
        utimesSync(manifestPath, now, now);
      } catch (error) {
        // If file doesn't exist or can't be touched, create/update it
        // This shouldn't happen, but handle gracefully
        console.warn("Could not touch manifest.json:", error);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  root: "./ui-src",
  plugins: [reactRefresh(), viteSingleFile(), touchManifest()],
  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: "../dist",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
