import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import path from "path";
import copy from "rollup-plugin-copy";

export default {
  input: "dist/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
    inlineDynamicImports: true,
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs({}),
    json(),
    alias({
      entries: [{ find: "@", replacement: path.resolve("dist") }],
    }),
    copy({
      targets: [{ src: "src/template/mcp-config.json", dest: "dist" }],
    }),
  ],
  // External packages that shouldn't be bundled
  external: [
    "content-type",
    "express",
    "node:crypto",
    "node:*",
    "http",
    "https",
    "path",
    "fs",
    "url",
    "util",
    "assert",
    "stream",
    "events",
    "zlib",
    "statuses",
  ],
};
