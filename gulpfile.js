var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require("babelify");
var source      = require('vinyl-source-stream');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('browserify', function(){
  console.log('Browserifying ...');
	return browserify({
    entries : ['./client/js/index.js']
  })
  .transform('babelify', {presets: ['es2015', 'react']})
  .bundle()
  .on('error', function(err) {
    console.log('Error:', err);
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./client'))
  .pipe(plugins.livereload())
})

// gulp.task('build-css', function(){
//   return gulp.src('./client/less/**/*.less')
//     .pipe(plugins.plumber())
//     .pipe(plugins.less())
//     .pipe(gulp.dest('./client/css'))
// })

gulp.task('build', function() {
  runSequence(
    ['browserify'], ['watch']
  );
});

gulp.task('watch', function(){
  plugins.livereload.listen();
  gulp.watch(['./client/js/*.js'],['browserify'])
  gulp.watch('./client/less/**/*.less',['build-css'])
  //gulp.watch('./client/css/**/*.css')
})