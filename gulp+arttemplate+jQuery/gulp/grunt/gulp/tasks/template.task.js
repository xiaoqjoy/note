module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence, px2rem) {
    gulp.task('tplCpl', function () {
        //src/template/*
        //pjConfig.dev.file.tplFile
        return gulp.src('src/template/**/*.html')
            .pipe($.plumber())
            .pipe($.tmod({
                templateBase: 'src/template',
            }).on('error', function (e) {
                console.log(e);
            }))
            .pipe($.uglify().on('error', function (e) {
                console.log(e);
            }))
            // .pipe(gulp.dest('dist'));
            // .pipe($.plumber())
            // .pipe($.print())
            // .pipe($.handlebars())
            // .pipe($.wrap('Handlebars.template(<%= contents %>)'))
            // .pipe($.declare({
            //     namespace: 'Wowo.tpl',
            //     noRedeclare: true
            // }))
            // .pipe($.concat('templates.js'))
            .pipe(gulp.dest(pjConfig.dist.path.jsPath))
            .pipe(browserSync.stream())
    });
};