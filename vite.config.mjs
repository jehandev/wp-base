import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const staticFolders = ['images', 'fonts'];

// Emit build/images and build/fonts into the bundle so they get optimized and watched
const copyStaticAssets = (buildDir) => {
    const files = [];

    return {
        name: 'copy-static-assets',
        buildStart() {
            files.length = 0;

            for (const folder of staticFolders) {
                const dir = path.join(buildDir, folder);

                if (!fs.existsSync(dir)) {
                    continue;
                }

                // Pick up new files in watch mode, not only the ones that exist now
                this.addWatchFile(dir);

                for (const file of fs.readdirSync(dir, { recursive: true })) {
                    const source = path.join(dir, file);

                    if (fs.statSync(source).isDirectory() || path.basename(source).startsWith('.')) {
                        continue;
                    }

                    this.addWatchFile(source);
                    files.push({ source, fileName: path.posix.join(folder, file.split(path.sep).join('/')) });
                }
            }
        },
        generateBundle(_, bundle) {
            for (const { source, fileName } of files) {
                // Already emitted because a stylesheet references it
                if (bundle[fileName]) {
                    continue;
                }

                this.emitFile({ type: 'asset', fileName, source: fs.readFileSync(source) });
            }
        },
    };
};

export default defineConfig(({ mode }) => {
    const env        = loadEnv(mode, process.cwd(), 'WP_');
    const child      = env.WP_CHILD_THEME;
    const buildChild = child + 'assets/build/';
    const distChild  = child + 'assets/dist/';

    return {
        // Assets are enqueued by WordPress, so there is no public dir or index.html
        publicDir: false,
        // Keep url() rewrites relative to the stylesheet (always in dist/css) instead of the site root
        base: './',
        experimental: {
            renderBuiltUrl: (filename, { hostType }) => (hostType === 'css' ? '../' + filename : { relative: true }),
        },
        plugins: [
            copyStaticAssets(buildChild),
            ViteImageOptimizer(),
        ],
        build: {
            outDir: distChild,
            emptyOutDir: true,
            minify: mode === 'production',
            sourcemap: true,
            // Never inline url() assets, they already live in dist/images and dist/fonts
            assetsInlineLimit: 0,
            rolldownOptions: {
                input: {
                    'js/frontend': buildChild + 'js/frontend.js',
                    'css/frontend': buildChild + 'postcss/frontend.pcss',
                },
                output: {
                    entryFileNames: '[name].js',
                    // Images and fonts referenced from CSS keep their build/ path, matching the copied ones
                    assetFileNames: ({ originalFileNames }) => {
                        const relative = path.posix.relative(buildChild, originalFileNames?.[0] ?? '');

                        return staticFolders.some((folder) => relative.startsWith(folder + '/'))
                            ? relative
                            : '[name][extname]';
                    },
                },
            },
        },
    };
});
