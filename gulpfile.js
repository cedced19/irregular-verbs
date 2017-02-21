var gulp = require('gulp'),
    gutil = require('gulp-util'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    minifyCss = require('gulp-minify-css'),
    jsonminify = require('gulp-jsonminify'),
    htmlmin = require('gulp-htmlmin');


gulp.task('html', function () {

    return gulp.src('dev/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('./'));
});

gulp.task('css', ['html'], function () {
    return gulp.src('dev/styles/*.css')
        .pipe(concat('styles.css'))
        .pipe(uncss({
            html: ['dev/index.html']
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./styles'));
});

gulp.task('copy-fonts', function() {
  return gulp.src('dev/fonts/*.*')
        .pipe(gulp.dest('./fonts'));
});

gulp.task('minify-json', function () {
    return gulp.src(['dev/data.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['css', 'copy-fonts', 'minify-json']);
