import { build, context } from 'esbuild';
import { utimesSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const manifestPath = resolve(__dirname, 'manifest.json');

// Plugin to touch manifest.json on build
const touchManifestPlugin = {
  name: 'touch-manifest',
  setup(build) {
    build.onEnd(() => {
      try {
        // Touch the file by updating its modification time
        const now = new Date();
        utimesSync(manifestPath, now, now);
      } catch (error) {
        console.warn('Could not touch manifest.json:', error);
      }
    });
  },
};

// Get command line arguments (npm passes extra args after --)
const args = process.argv.slice(2);
const isWatch = args.includes('--watch');
const isMinify = args.includes('--minify');

const buildOptions = {
  entryPoints: ['main/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  platform: 'browser',
  target: 'es2020',
  format: 'iife',
  minify: isMinify,
  sourcemap: true,
  plugins: [touchManifestPlugin],
  legalComments: 'none',
  keepNames: false,
};

(async () => {
  if (isWatch) {
    try {
      const ctx = await context(buildOptions);
      await ctx.watch();
      console.log('Watching for changes...');
      // The watch mode will keep the process alive automatically
    } catch (error) {
      console.error('Initial build failed:', error);
      process.exit(1);
    }
  } else {
    // In regular build mode, exit on error
    await build(buildOptions).catch(() => process.exit(1));
  }
})();

