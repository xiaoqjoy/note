module.exports = {
    dev: {
        file: {
            htmlFile: 'src/*.html',
            styleFile: 'src/style/*.{scss,sass,less}',
            jsFile: 'src/js/*.js',
            imagesFile: 'src/images/**/*.{png,jpg,jpeg,svg,ico,gif}',
            tplFile: 'src/template/*',
            styleSpriteFile: 'src/style/sprite/*',
            styleCommonFile: 'src/style/component/*',
            ico:'src/*.ico'
        },
        path: {
            jsPath: 'src/js/',
            htmlImportPath: 'src/htmlImport/',
            imagesPath: 'src/resources/images/',
            styleSpritePath: 'src/style/sprite/',
            imagesSpritePath: 'src/resources/sprite/',//需要合成雪碧图的png的路径
        }
    },
    dist: {
        file: {
            cssFile: 'dist/css/*',
        },
        path: {
            htmlPath: 'dist/',
            cssPath: 'dist/css/',
            jsPath: 'dist/js/',
            imagesPath: 'dist/images/',
            mapsPath: 'dist/maps'
        }
    }
};