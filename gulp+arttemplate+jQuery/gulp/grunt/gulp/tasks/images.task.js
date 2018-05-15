module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence, px2rem) {
    gulp.task('images', function () {
        return gulp.src(pjConfig.dev.file.imagesFile)
            .pipe($.plumber())
            // .pipe($.imagemin({
            //     optimizationLevel: 3 //类型：Number  默认：3  取值范围：0-7（优化等级）
            // }))
            .pipe(gulp.dest(pjConfig.dist.path.imagesPath))
            .pipe(browserSync.stream())
    });
};