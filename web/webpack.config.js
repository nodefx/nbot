const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
//
const rootPath = path.dirname(__dirname)
const sourcePath = path.join(rootPath, './web/src')
const buildPath = path.join(rootPath, './web/build')
const autoprefixer = require('autoprefixer')
module.exports = function (env) {
  //
  const nodeEnv = env && env.prod ? 'production' : 'development'
  const isProd = nodeEnv === 'production'
  /**
   * 加载插件
   * @type {Array}
   */
  let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[hash].js'
    }),
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv
    }),
    // 返回react 热更新文件
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin([buildPath], {
      root: rootPath,
      verbose: true,
      dry: false,
      exclude: []
    })
  ]

  let entryApp = [
    'babel-polyfill',
    sourcePath + '/index'
  ]

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      })
    )
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
    entryApp.unshift('react-hot-loader/patch')
  }

  return {
    devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: {
      app: entryApp,
      vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'react-router', 'axios']
    },
    output: {
      filename: '[name].[hash].js',
      chunkFilename: 'chunk/[name].[hash].js',
      publicPath: '/',
      path: buildPath
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            'presets': [
              [
                'latest', {'es2015': {'modules': false}}
              ],
              'react',
              'stage-0'
            ],
            'plugins': [
              'react-hot-loader/babel',
              'transform-decorators-legacy'
            ]
          }
        },
        {
          test: /\.(less|css)$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer('last 2 versions', 'ie 10')
                ]
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        path.resolve(rootPath, 'node_modules'),
        sourcePath
      ]
    },
    plugins,
    devServer: {
      contentBase: sourcePath,
      historyApiFallback: true,
      port: 1355,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true
      }
    }
  }
}
