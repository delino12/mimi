var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: ['./src/js/Mimi.js', './src/css/Mimi.css'],
  devtool: 'source-map',
	mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'main.min.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets: ['es2015'],}
    }],
    rules: [{
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
    }]
  }
};