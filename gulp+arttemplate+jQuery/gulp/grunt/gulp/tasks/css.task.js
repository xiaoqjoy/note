module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence, px2rem) {
    gulp.task('css', function () {
        runSequence('_less')
    });
    gulp.task('_less', function () {
        return gulp.src(pjConfig.dev.file.styleFile)
            .pipe($.plumber())
            .pipe($.filter('**/*.less'))
            .pipe($.sourcemaps.init())
            .pipe($.less())
            .pipe($.base64({
                extensions: ['png', /\.jpg#datauri$/i],
                maxImageSize: 10 * 1024 // bytes,
            }))
            .pipe($.minifyCss().on('error', function (e) {
                console.log(e);
            }))
            .pipe($.sourcemaps.write('../maps'))
            .pipe(gulp.dest(pjConfig.dist.path.cssPath))
            .pipe(browserSync.stream())
    });
};