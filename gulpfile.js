'use strict';

var DEST = 'build/';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');

var rjsOptions = {
    "paths": {
      "jquery": "app/vendor/jquery-2.1.1.min"
    }
};

gulp.task('clean', function(cb){
	del(DEST, cb);
});

gulp.task('html', function(){
	return gulp.src('app/index.html')
		.pipe(gulp.dest(DEST));
});

gulp.task('rjs', function(){
	return gulp.src('app/js/*.js')
		.pipe(amdOptimize('app', rjsOptions))
		.pipe(concat('app-bundle.js'))
		.pipe(gulp.dest(DEST+'js'));
});

gulp.task('vendor', function(){
	return gulp.src('app/vendor/*')
		.pipe(gulp.dest(DEST+'vendor'));
});

gulp.task('scss', function(){
	return gulp.src('app/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest(DEST+'css'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'build'
		}
	});

	gulp.watch('app/*.html', ['html', browserSync.reload]);
	gulp.watch('app/js/*.js', ['rjs', browserSync.reload]);
	gulp.watch('app/scss/*.scss', ['scss', browserSync.reload]);
});

gulp.task('build', ['html', 'vendor', 'rjs', 'scss']);

gulp.task('default', ['clean', 'build', 'browser-sync']);