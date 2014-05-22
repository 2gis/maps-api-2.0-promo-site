var gulp = require('gulp'),

    es = require('event-stream'),

    less = require('gulp-less'),
    concat = require('gulp-concat'),
    mustache = require('gulp-mustache'),
    raster = require('gulp-raster'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith'),
    util = require('gulp-util'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),

    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),

    Png = require('png').Png;


/**
 * Watcher tasks
 */
gulp.task('watch', function () {
    gulp.watch('./less/**/*.*', ['compile-less']);

    gulp.watch('./img/**/*.*', ['build-images']);

    gulp.watch('./pages/*.*', ['build-templates']);
    gulp.watch('./partials/*.*', ['build-templates']);
});


/**
 * Build tasks
 */
gulp.task('rasterize-svg-and-generate-sprites', ['rasterize-svg'], function() {
    return gulp.start('generate-sprites');
});

gulp.task('build-images', ['rasterize-svg', 'generate-sprites'], function () {
    return gulp.start('optimize-images');
});

gulp.task('build-images-and-less', ['build-images'], function() {
    return gulp.start('compile-less');
});

gulp.task('build', ['build-templates', 'build-images-and-less'], function () {
    return gulp.start('export');
});


/**
 * Export task
 */
gulp.task('clean-up-export', function() {
    return (
        gulp.src(['./build/**/**.*', '!./build/.git'], { read: false })
            .pipe(clean())
    );
});

gulp.task('export', ['clean-up-export'], function () {
    return es.merge(
        gulp.src('./*.html')
            .pipe(gulp.dest('./build/')),

        gulp.src('./css/**/*.css')
            .pipe(gulp.dest('./build/css/')),

        gulp.src('./img/**/*.{png,gif,jpg,jpeg}')
            .pipe(gulp.dest('./build/img/')),

        gulp.src('./fonts/**/*.{eot,svg,ttf,woff}')
            .pipe(gulp.dest('./build/fonts/')),

        gulp.src('./js/**/*.{js,json}')
            .pipe(gulp.dest('./build/js/'))
    );
});


/**
 * CSS related helpers
 */

/**
 * Generates one-pixel PNG, converts it to Base64 and returns it as a string
 *
 * @param {Number} red Red part of the color (0 < red < 255)
 * @param {Number} green Green part of the color (0 < green < 255)
 * @param {Number} blue Blue part of the color (0 < blue < 255)
 * @param {Number} opacity Opacity (0 < opacity < 1)
 *
 * @returns {String} Base64-encoded generated one-pixel PNG
 */
global.getBase64EncodedOnePixelPng = (function () {

    function createOnePixelPng(red, green, blue, opacity) {
        var rgbaBuffer = new Buffer(4); // 1 pixel * 1 pixel * 4 color components

        rgbaBuffer[0] = red;
        rgbaBuffer[1] = green;
        rgbaBuffer[2] = blue;
        rgbaBuffer[3] = (1 - opacity) * 255;

        return new Png(rgbaBuffer, 1, 1, 'rgba');
    }

    var generatedPngs = {}; // Used as a cache

    function getBase64EncodedOnePixelPng(red, green, blue, opacity) {
        var pngName = '' + red + green + blue + opacity;

        if (!(pngName in generatedPngs)) {
            generatedPngs[pngName] = createOnePixelPng(red, green, blue, opacity).encodeSync().toString('base64');
        }

        return generatedPngs[pngName];
    }

    return getBase64EncodedOnePixelPng;
})();

/**
 * CSS related tasks
 */
gulp.task('compile-less', function () {
    return es.merge(
        gulp.src(['./less/style.*', '!./less/style.ie.*'])
            .pipe(changed('./css/'))
            .pipe(plumber())
            .pipe(less())
            .pipe(concat('style.css'))
            .pipe(gulp.dest('./css/')),

        gulp.src('./less/style.ie.*')
            .pipe(changed('./css/'))
            .pipe(plumber())
            .pipe(less())
            .pipe(concat('style.ie.css'))
            .pipe(gulp.dest('./css/'))
    );
});


/**
 * Graphics related tasks
 */
var scaleValues = [1, 1.5, 2, 3];

gulp.task('rasterize-svg', function () {
    var resultStream = gulp.src('');

    scaleValues.forEach(function (scaleValue) {
        resultStream = es.merge(resultStream,
            gulp.src('./img/*.svg')
                .pipe(changed('./img/public/'))
                .pipe(raster({ scale: scaleValue }))
                .pipe(rename({
                    suffix: (scaleValue != 1) ? '@' + scaleValue + 'x' : '',
                    extname: '.png'
                }))
                .pipe(gulp.dest('./img/public/')));
    });

    return resultStream;
});

gulp.task('optimize-images', function () {
    return (
        gulp.src(['./img/*.{png,jpg,jpeg,gif,svg}', './img/public/*.{png,jpg,jpeg,gif,svg}'])
            .pipe(changed('./img/public/'))
            .pipe(imagemin())
            .pipe(gulp.dest('./img/public/'))
    );
});

gulp.task('generate-sprites', ['rasterize-svg'], function () {
    var cssStream = gulp.src(''),
        imgStream = gulp.src('');

    scaleValues.forEach(function (scaleValue, index) {
        var excludedScaleValues = scaleValues.concat([]);

        excludedScaleValues.splice(index, 1);
        excludedScaleValues = excludedScaleValues.map(function (scaleValue, index) {
            return '!./img/public/*@' + scaleValue + 'x.png';
        });

        var suffix = (scaleValue != 1) ? '@' + scaleValue + 'x' : '',

            spriteData = gulp.src(['./img/public/*' + suffix + '.png', '!./img/public/sprite*.png'].concat(excludedScaleValues))
                            .pipe(spritesmith({
                                imgName: 'sprite' + suffix + '.png',
                                cssName: 'sprite' + suffix + '.less',
                                cssFormat: 'less',
                                cssVarMap: function (sprite) {
                                    sprite.name = 'sprite-' + sprite.name.replace('@', '').replace('.', '').replace('#', '');
                                }
                            }));

        cssStream = es.merge(cssStream, spriteData.css);
        imgStream = es.merge(imgStream, spriteData.img);
    });

    return es.merge(
        imgStream
            .pipe(gulp.dest('./img/public/')),

        cssStream
            .pipe(gulp.dest('./less/'))
    );
});


/**
 * HTML related tasks
 */
gulp.task('build-templates', function () {
    var partialsFiles = glob.sync('./partials/*.{mustache,html}'),
        partials = {};

    partialsFiles.forEach(function (partialPath) {
        var partialFileExtension = path.extname(partialPath),

            partialName = path.basename(partialPath, partialFileExtension),
            partialContent = String(fs.readFileSync(partialPath));

        partials[partialName] = partialContent;
    });

    return (
        gulp.src('./pages/*.{mustache,html}')
            .pipe(mustache({}, {}, partials))
            .pipe(gulp.dest('./build/'))
    );
});
