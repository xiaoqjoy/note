module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence, px2rem) {
    gulp.task('help', function () {
        console.log('gulp使用教程：');
        console.log('1.主流程：主流程输入gulp就可以了');
        console.log();
        console.log('2.需要合成雪碧图的img文件放到 ' + pjConfig.dev.path.imagesSpritePath + '{参数文件夹} 下，并gulp CssSprite -x {参数文件夹} ,生成的img,scss文件是sprite_{参数文件夹}');
        console.log('例：' + pjConfig.dev.path.imagesSpritePath + '下有文件夹test,则gulp CssSprite -x test');
        console.log();
        console.log('3.需要压缩的的js文件放到 ' + pjConfig.dev.file.jsFile + '{参数文件夹} 下，并gulp jsConcat -x {参数文件夹} ,生成js文件和{参数文件夹}同名');
        console.log('例：' + pjConfig.dev.filejsFile + '下有文件夹test,则gulp jsConcat -x test');
        console.log();
    });
};