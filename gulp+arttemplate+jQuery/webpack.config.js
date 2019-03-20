var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
//Node 文件系统
    fs = require('fs'),
    path = require('path'),
//读取项目的配置
    proConfig = require('./proConfig');
// --------------我是华丽丽的分割线---------------
var webpackConfig = module.exports = {
    devtool: "cheap-module-eval-source-map", //生成sourcemap
    entry:getEntry(),
    output: {
        // publicPath: '/assets/', //用于配置文件发布路径，如CDN或本地服务器
        // chunkFilename: "js/[name].min.js",
        path: proConfig.distDir,
        filename: 'js/[name].js'
    },
    devServer:{
        contentBase: '',  //静态资源的目录 相对路径,相对于当前路径 默认为当前config所在的目录
        devtool: 'cheap-module-eval-source-map',
        hot: true,        //自动刷新
        inline: true,
        port: 3000
    },
    module: {
        loaders: [
            // {test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css!less')},//从less文件提取成css文件
            // {test: /\.vue$/, loader: 'vue'},
            // {test: /\.css$/, loader: "style!css"},
            // {test: /\.(jpg|png|svg)$/, loader: "url?limit=8192"}
        ]
    },
    // vue: {
    //     loaders: {
    //         less: ExtractTextPlugin.extract('vue-style-loader', 'css!less')//从vue文件的style从提取出css文件
    //     }
    // },
    resolve: {
        //配置别名，在项目中可缩减引用路径
        // alias: {
        //     utils:proJectConfig.srcDirPath+"/components/utils/utils.js", //工具包没写好，暂时留着
        //     components: proJectConfig.srcDirPath + "/components",//组件
        //     core: proJectConfig.srcDirPath + "/js/core",
        //     images: proJectConfig.srcDirPath + "/resource/images",
        //     stylus: proJectConfig.srcDirPath + "/stylus",
        //     'vue$': 'vue/dist/vue.js' //默认 NPM 包导出的是运行时构建，运行时构建不包括模板编译。为了使用独立构建，加入alias-vue$
        // },
        // extensions: ['', '.js', '.vue']
    },
    plugins: [
        //提供全局的变量，在模块中使用无需用require引入
        // new webpack.ProvidePlugin({
        //     jQuery: "jquery",
        //     $: "jquery",
        //     Vue: "vue",
        //     VueRouter:"vue-router",
        //     Utils:'utils'
        //     // nie: "nie"
        // }),
        // 热启动
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"development"'
        // }),
        // new webpack.HotModuleReplacementPlugin(),
        // //提取css文件
        // new ExtractTextPlugin('css/[name].min.css'),
        //将公共代码抽离出来合并为一个文件
        // new webpack.optimize.CommonsChunkPlugin({
        //    name: "component",
        //    filename: "component/Common.js",
        //    chunks: ['index', 'login']
        // }),

        //js文件的压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: true   //去掉警告
        //     }
        // })
    ]
};
insert_Html();

function insert_Html() {
    var htmlPath = proConfig.srcDir,
        fileArray = fs.readdirSync(htmlPath),
        matchArray = [],
        fileObjectNameString;
    fileArray.forEach(function (fileName) {
        matchArray = fileName.match(/(.+)\.html$/);
        console.log(fileName)
        if (matchArray){
            fileObjectNameString = matchArray[1].toString();
        }
        // for (var i in proJectConfig.pageTitle) {
        //         webpackConfig.plugins.push(
        //             new HtmlWebpackPlugin({
        //                 title: proJectConfig.pageTitle[i], //用于生成的HTML文件的标题。
        //                 filename:fileName, //生成的HTML的名称，默认index.html，例如:assets/admin.html
        //                 template: proJectConfig.srcDirPath + '/html/' + fileName,
        //                 chunks: [fileObjectNameString,'common'],
        //                 hash: true //给页面css和js添加hash值。
        //                 // favicon : //给定的图标路径，可将其添加到输出html中。
        //                 // template : //模板的路径。支持加载器，例如 html!./index.html。
        //                 // inject :true | ‘head’ | ‘body’ | false //当传入 true或者 ‘body’时所有javascript资源将被放置在body元素的底部，“head”则会放在head元素内。
        //             })
        //         )
        // }
    })
}

function getEntry() {
    var pagejsPath = 'src/js';
    var fileArray = fs.readdirSync(pagejsPath);
    var matchArray = [],
        filesObj = {},
        fileObjectName;
    fileArray.forEach(function(fileName) { //fileName 是文件夹里每个文件的文件名。
        matchArray = fileName.match(/(.+)\.js$/);
        if (matchArray) {
            fileObjectName = matchArray[1].replace('.','_');
            filesObj[fileObjectName] = path.resolve(pagejsPath, fileName); // match[1]即为没有 后缀.js 的文件名，也就是key值
        }
    });
    return filesObj;
};
function insert_CommonsChunkPlugin() {
    webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: '111',
            filename: 'commons.js',
            chunks: ["test1", "test2"]
        })
    )
}
