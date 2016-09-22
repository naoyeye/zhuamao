var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gulpUtil = require('gulp-util');
var base64 = require('gulp-base64');

var src = 'app/static_resource/common/libs/semantic-ui/';
var dest = 'app/static/';

gulp.task('third-party', function() {
  gulp.src(src + 'stylesheets/semantic-ui.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(base64({
      debug: true,
      baseDir: process.cwd() + '/' + src,
      maxImageSize: 200 * 1024
    }))
    .pipe(gulp.dest(dest + 'third-party/css'));

  gulp.src([
    src + 'javascripts/**/*.js',
    './app/static_resource/common/libs/*.js'
  ])
    .pipe(uglify().on('error', gulpUtil.log))
    .pipe(gulp.dest(dest + 'third-party/js'));
});

