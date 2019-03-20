module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence, px2rem) {
    gulp.task('cleandist', function () {
        return gulp.src('dist')
            .pipe($.clean())
    });
    gulp.task('cleanmaps', function () {
        return gulp.src(pjConfig.dist.path.mapsPath)
            .pipe($.clean())
    });
};