module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence) {
    gulp.task('watch', function () {
        gulp.watch([pjConfig.dev.file.htmlFile], ['html']);
        gulp.watch([pjConfig.dev.file.styleFile, pjConfig.dev.file.styleSpriteFile, pjConfig.dev.file.styleCommonFile], ['css']);
        gulp.watch(pjConfig.dev.file.jsFile, ['js']);
        gulp.watch(pjConfig.dev.file.imagesFile, ['images']);
        gulp.watch(pjConfig.dev.file.tplFile, ['tplCpl']);
    });
};