const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    entry: './src/main.js'
	},  
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/, enforce: 'pre' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, options: { presets: ['babel-preset-env'] } },
      //{ test: /\.html$/, loader: 'underscore-template-loader', query: { engine: 'lodash' } },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/, loader: "file-loader?name=[name].[ext]" }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore',
      Backbone: 'backbone',
      Popper: 'popper.js'
    })
  ]
};