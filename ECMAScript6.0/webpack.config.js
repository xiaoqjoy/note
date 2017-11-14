var path = require('path');

module.exports = {
	entry: {
		main: './main.js'     //入口文件
	},
    output: {
		 //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径 
		filename: '[name].js',     //输出文件
        path: path.resolve(__dirname, 'dist')     //输出位置
    },
    module: {
		//加载器配置
		/* rules: [
			{
				test: /\.js$/,
				use:[{
					loader: 'babel-loader',
					query: {
						presets: ['es2015']
					}
				}]
			}
		] */
		//Modules 模块   基本用法  ES6允许定义模块。也就是说，允许一个JavaScript脚本文件调用另一个脚本文件
		//使用 babel-loader 来转义 es6 代码到 es2015 的配置
		loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}