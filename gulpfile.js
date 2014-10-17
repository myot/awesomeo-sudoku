'use strict';

var DEST = 'build/';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');


gulp.task('clean', function(cb){
	del(DEST, cb);
});

gulp.task('html', function(){
	return gulp.src('app/index.html')
		.pipe(gulp.dest(DEST));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'build'
		}
	});

	gulp.watch('app/*.html', ['html', browserSync.reload]);
});

gulp.task('build', ['clean', 'html']);

gulp.task('default', ['build', 'browser-sync']);