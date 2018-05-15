module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence, px2rem) {
    gulp.task('sprite',['_sassSprite','_lessSprite']);
    gulp.task('_sassSprite', function () {
        var srcSprite = pjConfig.dev.path.imagesSpritePath + argv.x + '/*',
            spriteData = gulp.src(srcSprite)
                .pipe($.plumber())
                .pipe($.print())
                .pipe($.spritesmith({
                    imgName: 'sprite_' + argv.x + '.png',
                    cssName: 'sprite_' + argv.x + '.scss',
                    cssFormat: 'scss'
                }));
        spriteData.img.pipe(gulp.dest(pjConfig.dev.path.imagesPath));//放到pjConfig.dev开发目录之下
        spriteData.css.pipe(gulp.dest(pjConfig.dev.path.styleSpritePath));//放到pjConfig.dev开发目录之下
    });
    gulp.task('_lessSprite', function () {
        var srcSprite = pjConfig.dev.path.imagesSpritePath + argv.x + '/*',
            spriteData = gulp.src(srcSprite)
                .pipe($.plumber())
                .pipe($.print())
                .pipe($.spritesmith({
                    imgName: 'sprite_' + argv.x + '.png',
                    cssName: 'sprite_' + argv.x + '.less',
                    cssFormat: 'less'
                }));
        spriteData.img.pipe(gulp.dest(pjConfig.dev.path.imagesPath));//放到pjConfig.dev开发目录之下
        spriteData.css.pipe(gulp.dest(pjConfig.dev.path.styleSpritePath));//放到pjConfig.dev开发目录之下
    });
};