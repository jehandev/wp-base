module.exports = {
    plugins: [
        require('postcss-import'),
        require('precss'),
        require('postcss-math'),
        require('postcss-combine-duplicated-selectors'),
        require('@tailwindcss/postcss'),
        require('autoprefixer'),
    ]
};
