var gulp = require('gulp');

gulp.task('release:build', [
  'launch', 
  'webpack:release'
]);

gulp.task('release', ['clean'], function() {
  gulp.start('release:build')
});
