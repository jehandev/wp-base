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
              },
            ],
          }),
          new ImageMinimizerPlugin({
            test: /\.(jpe?g|png)$/i,
            filename: "[path][name].webp",
            minimizerOptions: {
              plugins: [
                    ["imagemin-webp"],
                    ["imagemin-gifsicle", { interlaced: true }],
                    ["imagemin-jpegtran", { progressive: true }],
                    ["imagemin-optipng", { optimizationLevel: 5 }],
                    // Svgo configuration here https://github.com/svg/svgo#configuration
                    [
                        "imagemin-svgo",
                        {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            removeViewBox: {
                                                active: false
                                            },
                                            addAttributesToSVGElement: {
                                                params: {
                                                    attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                                }
                                            }
                                        }
                                    }
                                }
                            ],
                        },
                    ],
                ],
            },
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

// Example JS
// mix.babel([buildChild + 'js/frontend/*.js'], 'js/frontend.js')

// Example CSS
// mix.postCss(buildChild + 'postcss/frontend.pcss', 'css/frontend.css');

mix.sourceMaps()
   .version();
