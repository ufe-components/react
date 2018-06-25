const base = require('./webpack.base')
const merge = require('webpack-merge')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = merge(base, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:9000/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    historyApiFallback: true,
    hot: true,
    compress: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [require('autoprefixer')()]
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              minimize: true,
              sourceMap: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [require('autoprefixer')()]
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: resolve(__dirname, '../src/index.html'),
      inject: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyJS: true
      }
    })
  ]
})
