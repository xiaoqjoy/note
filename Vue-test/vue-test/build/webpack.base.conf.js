'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

var PostCss_CssNext = require('');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var PurifyCss = require('purifycss-webpack'); // 引入PurifyCss
var glob = require('glob-all');// 引入glob-all





function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [




      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({ // 使用ExtractTextWebpackPlugin插件提取css
          fallback: {// 这里表示不提取的时候，使用什么样的配置来处理css
            loader: 'style-loader',
            options: {
              singleton: true // 表示将页面上的所有css都放到一个style标签内
            }
          },
          use: [ // 提取的时候，继续用下面的方式处理
            {
              loader: 'css-loader',
              options: {
                minimize: true  // 开启压缩
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',  // 表示下面的插件是对postcss使用的
                plugins: [
                  PostCss_CssNext(), // 允许使用未来的css（包含AutoPrefixer功能）
                ]
              }
            }
          ]
        })
      },




      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({ // 将js中引入的css文件提取到[name].min.css文件中
      filename: '[name].min.css' // 配置提取出来的css名称
    }),
    new PurifyCss({
      paths: glob.sync([ // 传入多文件路径
        path.resolve(__dirname, './src/*.vue'), // 处理根目录下的html文件
        //path.resolve(__dirname, './src/*.js') // 处理src目录下的js文件
      ])
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
