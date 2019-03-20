module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence, px2rem) {
    gulp.task('html', function () {
        return gulp.src(pjConfig.dev.file.htmlFile)
            .pipe($.plumber())
            .pipe(gulp.dest(pjConfig.dist.path.htmlPath))
            .pipe(browserSync.stream())
    });
};