/* 个人项目 gulpfile.js 1.0.0;
 *createTime: 2016.12.23;
 *updateTime: 2017.1.8 23:35;
 *author: '吴海伟';
 * 现在 雪碧图
 **/
"use strict";//严格模式

let gulp = require('gulp'),//gulp
    pjConfig = require('../proConfig'),//项目配置引入
    $ = require('gulp-load-plugins')(),//gulp-load-plugins插件引入
    browserSync = require('browser-sync').create(),//borwserSync 插件
    argv = require('minimist')(process.argv.slice(2)),//argv参数传入插件
    runSequence = require('run-sequence');//合并流插件

let taskList = require('fs').readdirSync('./gulp/tasks/');
taskList.forEach(function (file) {
    require('./tasks/' + file)(gulp, pjConfig, $, browserSync, argv, runSequence);//插件传入及task引入
});
gulp.task('dev', function () {
    runSequence('cleandist', ['html','tplCpl','css', 'js', 'images'], 'watch', 'devServer')
});
gulp.task('release', function () {
    runSequence('cleanmaps', 'releaseServer')
});

// ----------------------------------综合 完结分割线-----------------------------------


