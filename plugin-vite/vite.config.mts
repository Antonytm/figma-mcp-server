import { defineConfig, Plugin } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { viteSingleFile } from "vite-plugin-singlefile";
import { utimesSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Plugin to strip "use client" directives (needed for MUI v7)
function stripUseClient(): Plugin {
  return {
    name: "strip-use-client",
    transform(code, id) {
      // Remove "use client" directives from the code
      // Matches: "use client", 'use client', with or without semicolon, and optional whitespace
      const cleanedCode = code.replace(/["']use client["'];?\s*\n?/g, "");
      if (cleanedCode !== code) {
        return {
          code: cleanedCode,
          map: null,
        };
      }
    },
  };
}

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
  root: "./ui",
  plugins: [stripUseClient(), reactRefresh(), viteSingleFile(), touchManifest()],
  build: {
    target: "es2017",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    sourcemap: true,
    cssCodeSplit: false,
    outDir: "../dist",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2017",
    },
  },
});

