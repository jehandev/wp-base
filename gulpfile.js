"use strict";

const   public_css_folder       = 'web/app/themes/jehan.dev-parent/assets/dist/css/',
        public_images_folder    = 'web/app/themes/jehan.dev-parent/assets/dist/images/',
        public_js_folder        = 'web/app/themes/jehan.dev-parent/assets/dist/js/',
        postcss_folder          = 'web/app/themes/jehan.dev-parent/assets/build/postcss/',
        js_folder               = 'web/app/themes/jehan.dev-parent/assets/build/js/',
        images_folder           = 'web/app/themes/jehan.dev-parent/assets/build/images/',
;

const   gulp                    = require('gulp'),
        gulp_cssnano            = require('gulp-cssnano'),
        gulp_concat             = require('gulp-concat'),
        gulp_eslint             = require('gulp-eslint'),
        gulp_notify             = require('gulp-notify'),
        gulp_plumber            = require('gulp-plumber'),
        gulp_postcss            = require('gulp-postcss'),
        gulp_rename             = require('gulp-rename'),
        gulp_sourcemaps         = require('gulp-sourcemaps'),
        gulp_stylelint          = require('gulp-stylelint'),
        gulp_tap                = require('gulp-tap'),
        gulp_uglify             = require('gulp-uglify'),
        path                    = require('path'),
        postcss_combine         = require('postcss-combine-duplicated-selectors'),
        postcss_import          = require('postcss-import'),
        postcss_math            = require('postcss-math'),
        precss                  = require('precss')
;


function stylesLint() {

    return gulp.src(postcss_folder + '**/*.postcss')
        .pipe( gulp_stylelint({
            failAfterError: false,
            reporters: [
                {
                    formatter: 'string', 
                    console: true
                }
            ]})
        )
    ;

}

function stylesCompile() {

    return gulp.src(postcss_folder + '**/*.postcss', { base: '.' })
        .pipe( gulp_plumber(
            {
                errorHandler: function(err) {
                    gulp_notify.onError({
                        title: "Gulp error in " + err.plugin,
                        message:  err.toString()
                    })(err);
                }
            })
        )
        .pipe(
            gulp_tap(function(file, t) {
                let filepath = file.relative.replace(postcss_folder, '').replace(/\.[^/.]+$/, '');

                return gulp.src(file.path)
                        .pipe( gulp_sourcemaps.init() )
                        .pipe( gulp_postcss([
                                postcss_import,
                                precss(),
                                postcss_math,
                                postcss_combine
                            ])
                        )
                        .pipe( gulp_rename({ 
                            extname: ".css"
                        }) )
                        .pipe( gulp_sourcemaps.write('.') )
                        .pipe(gulp.dest(public_css_folder + filepath + '/'))
                ;
            })
        )
    ;

}

function stylesMinify() {

    return gulp.src([
        public_css_folder + '**/*.css',
        '!' + public_css_folder + '**/*.min.css']
    )
        .pipe( gulp_cssnano({
            zindex: false,
            reduceIdents: false
        }) )
        .pipe( gulp_rename({
            suffix: '.min'
        }) )
        .pipe( gulp.dest(public_css_folder) )
        ;

}

function js() {

    return gulp.src(
            [
                js_folder + 'frontend/**/*.js',
                js_folder + 'backend/**/*.js'
            ],
            { base: '.' }
        )
        .pipe( gulp_plumber(
            { 
                errorHandler: function(err) {
                    gulp_notify.onError({
                        title: "Gulp error in " + err.plugin,
                        message:  err.toString()
                    })(err);
                }
            })
        )
        .pipe(gulp_tap(function(file, t) {
            let filepath = file.relative.replace(js_folder, '').replace(/\.[^/.]+$/, '');

            console.log(public_js_folder + filepath)

            return gulp.src(file.relative)
                .pipe( gulp_eslint() )
                .pipe( gulp_eslint.format() )
                .pipe( gulp_eslint.failAfterError() )
                .pipe( gulp.dest( './' + public_js_folder + filepath + '/' ) )
                .pipe( gulp_uglify() )
                .pipe( gulp_rename({ suffix: '.min' }) )
                .pipe( gulp.dest( './' + public_js_folder + filepath + '/' ) )
            ;
        }))
        
    ;

}

function images() {
    return gulp.src(images_folder + '**/*')
        .pipe(gulp_imagemin())
        .pipe(gulp.dest(public_images_folder))
    ;
}

function assetWatch() {

    gulp.watch( '**/*.postcss', { cwd: postcss_folder }, gulp.series(stylesLint, stylesCompile, stylesMinify));
    gulp.watch( '**/*.js', { cwd: js_folder }, gulp.series(js));
    gulp.watch( '**/*.*', { cwd: images_folder }, gulp.series(images));

}

gulp.task('postcss', gulp.series(stylesLint, stylesCompile, stylesMinify));
gulp.task('js', gulp.series(js));
gulp.task('images', images);
