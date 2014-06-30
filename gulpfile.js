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
    autoprefixer = require('gulp-autoprefixer'),

    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),

    Png = require('png').Png,
    Mustache = require('mustache');


/**
 * Dev tasks
 */
gulp.task('dev', ['watch'], function () {
    return gulp.start('serve');
});


/**
 * Watcher tasks
 */
gulp.task('watch', ['build'], function () {
    gulp.watch('./styles/**/*.*', ['compile-less']);

    gulp.watch('./img/**/*.*', ['build-images']);

    gulp.watch('./pages/*.*', ['build-templates', 'browserify']);
    gulp.watch('./partials/*.*', ['build-templates', 'browserify']);
    gulp.watch('./app/**/*.*', ['browserify']);
    gulp.watch('./vendors/**/*', gulp.src('./vendors/**/*')
        .pipe(gulp.dest('./build/vendors/')));
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

gulp.task('clean-up-build', function() {
    return (
        gulp.src(['./build/**/**.*', '!./build/.git'], { read: false })
            .pipe(clean())
    );
});

gulp.task('export', function () {
    return es.merge(
        gulp.src('./styles/**/*.css')
            .pipe(gulp.dest('./build/css/')),

        gulp.src('./img/**/*.{png,gif,jpg,jpeg,ico}')
            .pipe(gulp.dest('./build/img/')),

        gulp.src('./fonts/**/*.{eot,svg,ttf,woff}')
            .pipe(gulp.dest('./build/fonts/')),

        gulp.src('./vendors/**/*')
            .pipe(gulp.dest('./build/vendors/'))
    );
});

gulp.task('build', ['build-templates', 'build-images-and-less', 'browserify'], function () {
    return gulp.start('export');
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
            generatedPngs[pngName] = 'data:image/png;base64,' + createOnePixelPng(red, green, blue, opacity).encodeSync().toString('base64');
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
        gulp.src(['./styles/style.*', '!./styles/style.ie.*'])
            .pipe(changed('./build/css/'))
            .pipe(plumber())
            .pipe(less())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('./build/css/')),

        gulp.src('./styles/style.ie.*')
            .pipe(changed('./build/css/'))
            .pipe(plumber())
            .pipe(less())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(concat('style.ie.css'))
            .pipe(gulp.dest('./build/css/'))
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
                .pipe(changed('./build/img/'))
                .pipe(raster({ scale: scaleValue }))
                .pipe(rename({
                    suffix: (scaleValue != 1) ? '@' + scaleValue + 'x' : '',
                    extname: '.png'
                }))
                .pipe(gulp.dest('./build/img/')));
    });

    return resultStream;
});

gulp.task('optimize-images', function () {
    return (
        gulp.src(['./img/*.{png,jpg,jpeg,gif,svg}'])
            .pipe(changed('./build/img/'))
            .pipe(imagemin())
            .pipe(gulp.dest('./build/img/'))
    );
});

gulp.task('generate-sprites', ['rasterize-svg'], function () {
    var cssStream = gulp.src(''),
        imgStream = gulp.src('');

    scaleValues.forEach(function (scaleValue, index) {
        var excludedScaleValues = scaleValues.concat([]);

        excludedScaleValues.splice(index, 1);
        excludedScaleValues = excludedScaleValues.map(function (scaleValue, index) {
            return '!./build/img/*@' + scaleValue + 'x.png';
        });

        var suffix = (scaleValue != 1) ? '@' + scaleValue + 'x' : '',

            spriteData = gulp.src(['./build/img/*' + suffix + '.png', '!./build/img/sprite*.png'].concat(excludedScaleValues))
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
            .pipe(gulp.dest('./build/img/')),

        cssStream
            .pipe(gulp.dest('./styles/'))
    );
});


/**
 * HTML related tasks
 */
gulp.task('build-templates', function () {
    var partialsFiles = glob.sync('./partials/*.{mustache,html}'),
        layoutPartialsFiles = glob.sync('./partials/layout*.{mustache,html}'),

        pagesFiles = glob.sync('./pages/*.{mustache,html}'),

        views = {},
        partials = {};

    partialsFiles.forEach(function (partialPath) {
        var partialFileExtension = path.extname(partialPath),

            partialName = path.basename(partialPath, partialFileExtension),
            partialContent = String(fs.readFileSync(partialPath));

        partials[partialName] = partialContent;
    });

    layoutPartialsFiles.forEach(function (layoutPartialPath) {
        var layoutPartialFileExtension = path.extname(layoutPartialPath),

            layoutPartialName = path.basename(layoutPartialPath, layoutPartialFileExtension),
            layoutPartialContent = String(fs.readFileSync(layoutPartialPath));

        views[layoutPartialName] = function() {
            return function(content, render) {
                var layoutPartials = new Object(partials);

                layoutPartials._content = render(content);

                return Mustache.render(layoutPartialContent, {}, partials);
            };
        };
    });

    return (
        gulp.src('./pages/*.{mustache,html}')
            .pipe(mustache(views, {}, partials))
            .pipe(gulp.dest('./build/'))
    );
});


var browserify = require('browserify'),
    notify = require('gulp-notify'),
    source = require('vinyl-source-stream'),
    
    handleErrors = function() {
        var args = Array.prototype.slice.call(arguments);

        // Send error to notification center with gulp-notify
        notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
        }).apply(this, args);

        // Keep gulp from hanging on this task
        this.emit('end');
    };


gulp.task('browserify', function(){
    return (
        browserify({
            entries: ['./app/index.js'],
            extensions: ['.js', '.mustache']
        })
        .bundle({ debug: true })
        .on('error', handleErrors)
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build/js'))
    );
});

var express = require('express'),
    morgan = require('morgan'),
    config = {
        root: './build',
        port: 8080
    };

gulp.task('serve', function () {
    var app = express()
                .use(morgan('dev'))
                .use('/mapsapi', express.static(config.root))
                .use('*', function (req, res) {
                    res.sendfile(config.root + '/index.html');
                });

    app.listen(config.port);
});
