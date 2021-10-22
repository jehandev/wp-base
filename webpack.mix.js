const mix = require('laravel-mix');

let child         = process.env.WP_CHILD_THEME,
    buildChild    = child + 'assets/build/',
    distChild     = child + 'assets/dist/'
;

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
