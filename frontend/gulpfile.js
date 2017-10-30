/**
 * Created by desha on 10/30/2017.
 */
var gulp = require('gulp'),
  sass = require('gulp-ruby-sass')
notify = require("gulp-notify")
concatCss = require('gulp-concat-css')
concatJs = require('gulp-concat')
inject = require('gulp-inject')
bower = require('gulp-bower');

var config = {
  bowerDir: './bower_components'
}

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir))
});

gulp.task('icons', function() {
  return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest('./public/fonts/'));
});

//js will be bundled according to priority, bundle order is as follows
gulp.task('scripts', function() {
  return gulp.src(
    [
      config.bowerDir + '/jquery/dist/**/*.min.js',
      config.bowerDir + '/tether/dist/**/*.min.js',
      config.bowerDir + '/bootstrap/dist/**/*.min.js',
    ]
  )
    .pipe(concatJs('all.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('css', () => {
  return gulp.src(config.bowerDir + '/**/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('inject', function () {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./public/js/*.js', './public/css/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app'));
});


gulp.task('default', ['bower', 'icons','scripts', 'css', 'inject']);
