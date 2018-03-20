const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
  	'entry': './src/main.js'
	},  
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      },
      {
        test: /\.html$/,
        loader: 'underscore-template-loader',
        query: {
          engine: 'lodash'
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'GMobile Boilerplate',
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore',
      Backbone: 'backbone'
    })
  ]
};