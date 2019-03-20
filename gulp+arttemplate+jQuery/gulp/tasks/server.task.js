module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence, px2rem) {
    gulp.task('devServer', function () {
        browserSync.init({
            server: pjConfig.dist.path.htmlPath,
            open: true,
            directory: true,//只打开文件夹
            port: 3030,
            browser: "google chrome"  //支持数组 ["google chrome", "firefox"]
        });
    });
    gulp.task('releaseServer', function () {
        browserSync.init({
            server: pjConfig.dist.path.htmlPath,
            open: true,
            directory: true,//只打开文件夹
            port: 3100,
            browser: "google chrome"  //支持数组 ["google chrome", "firefox"]
        });
    });
};