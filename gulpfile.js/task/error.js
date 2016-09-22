var gulp = require('gulp');
var sass = require('gulp-sass');
var base64 = require('gulp-base64');

var src = [
  './app/static_resource/error/403.scss',
  './app/static_resource/error/404.scss',
  './app/static_resource/error/500.scss'
]
var dest = './mobile/static/error'

gulp.task('errors', function () {
  gulp.src(src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(base64({
      maxImageSize: 1024*1024,
      debug: true
    }))
    .pipe(gulp.dest(dest))
})