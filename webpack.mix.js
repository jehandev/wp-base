const mix                       = require('laravel-mix');
const CopyPlugin                = require("copy-webpack-plugin");
const ImageMinimizerPlugin      = require("image-minimizer-webpack-plugin");

let child         = process.env.WP_CHILD_THEME,
    buildChild    = child + 'assets/build/',
    distChild     = child + 'assets/dist/'
;

mix.webpackConfig({
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: buildChild + "images",
                    to: './images',
                    noErrorOnMissing: true,
                },
                {
                    from: buildChild + "fonts",
                    to: './fonts',
                    noErrorOnMissing: true,
                },
            ],
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        "imagemin-gifsicle",
                        "imagemin-mozjpeg",
                        "imagemin-pngquant",
                        "imagemin-svgo"
                    ],
                }
            },
            generator: [
                {
                    // You can apply generator using `?as=webp`, you can use any name and provide more options
                    preset: "webp",
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: ["imagemin-webp"],
                    },
                },
                {
                    preset: "name",
                    filename: "generated-[name][ext]",
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    // Options
                    options: {
                        encodeOptions: {
                            mozjpeg: {
                                quality: 90,
                            },
                        },
                    },
                },
            ],
        }),
    ]
});

mix.setPublicPath(distChild);

mix.options({
    processCssUrls: false,
    postCss: [
        require('postcss-import'),
        require('precss'),
        require('postcss-math'),
        require('postcss-combine-duplicated-selectors'),
        require('tailwindcss')
    ]
});

// Don't really know why setPublicPath is not working here
mix.babel([buildChild + 'js/frontend/*.js'], distChild + 'js/frontend.js').minify(distChild + 'js/frontend.js')

mix.postCss(buildChild + 'postcss/frontend.pcss', 'css/frontend.css').minify(distChild + 'css/frontend.css');

mix.sourceMaps()
    .version();
