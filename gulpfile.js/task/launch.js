// var gulp = require('gulp');
// var sass = require('gulp-sass');
// var base64 = require('gulp-base64')

// var src = './app/static_resource/common/css/launch.scss'
// var dest = './app/static'

// gulp.task('launch', function () {
//   gulp.src(src)
//     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//     .pipe(base64({
//       debug: true,
//       baseDir: process.cwd() + '/app/static_resource'
//     }))
//     .pipe(gulp.dest(dest))
// })