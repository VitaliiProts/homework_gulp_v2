var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var htmlExtend = require('gulp-html-extend');
var imagemin = require('gulp-imagemin');
var fontmin = require('gulp-fontmin');
var del = require('del');

gulp.task('html', function () {
    return gulp.src('src/pages/*.html')
        .pipe(htmlExtend())
        .pipe(gulp.dest('dist'))
});

gulp.task('css:app', function () {
    gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
});

// gulp.task('imagemin')

gulp.task('img', function () {
    return gulp.src('src/images/**/*.{png,svg,jpg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*.ttf')
        .pipe(fontmin())
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'html', 'img', 'fonts', 'css:app']);

gulp.task('watch', ['build'], function () {
    browserSync.init({
        server: 'dist',
        notify: false
    });
    gulp.watch('src/css/**/*.css', ['css:app']);

    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);


