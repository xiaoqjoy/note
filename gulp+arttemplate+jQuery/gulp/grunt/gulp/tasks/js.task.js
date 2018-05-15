module.exports = function (gulp, pjConfig, $, browserSync, argv, runSequence, px2rem) {
    //,['_jshint']
    gulp.task('js', function () {
        var SPA;//如果SPA是true;
        return gulp.src(pjConfig.dev.file.jsFile)
            .pipe($.plumber())
            .pipe($.sourcemaps.init())
            .pipe($.uglify())
            .pipe($.ifElse(SPA==true,function(){
                return $.concat('bundle.js');
            }))
            .pipe($.sourcemaps.write('../maps'))
            .pipe(gulp.dest(pjConfig.dist.path.jsPath))
            .pipe(browserSync.stream())
    });
    // concat任务保留，为了以防某天有合并js的需求
    gulp.task('jsConcat', function () {
        return gulp.src(pjConfig.dev.file.jsFile)
            .pipe($.plumber())
            .pipe($.uglify().on('error', function (e) {
                console.log(e);
            }))
            .pipe($.concat('concat.js'))
            .pipe(gulp.dest(pjConfig.dist.path.jsPath))
    });
    gulp.task('_jshint', function () {
        return gulp.src(pjConfig.dev.file.jsFile)
            .pipe($.jshint())
            .pipe($.jshint.reporter('default'));
    });
};