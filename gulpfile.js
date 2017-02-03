'use strict';

const nodemon = require('nodemon');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('clean', () => del('dist'));

gulp.task('lint', () => {
  return gulp.src(['server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch('server/**/*.js' , ['lint']);
});

gulp.task('serve:dev', () => {
  nodemon('-w server server/index.js');
});

gulp.task('transpile', () => {
  return gulp.src('server/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/server'));
});

// serve dev mode
gulp.task('default', cb => {
  runSequence('lint', 'serve:dev', 'watch', cb);
});

// create dist build
gulp.task('dist', cb => {
  runSequence('lint', 'clean', 'transpile', cb);
});

// serve prod mode
gulp.task('serve:prod', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  nodemon('-w dist/server dist/server/index.js');
});