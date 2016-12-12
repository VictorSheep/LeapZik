const path       = require('path');
const webpack    = require('webpack');

const production = process.argv.indexOf("--production") > -1;

var config = {
  entry: "./src/main.js",
  
  output: {
    path: './app',
    publicPath: !production ? 'http://localhost:8080/' : undefined,
    filename: 'bundle.js'
  },
  watch: !production,
  debug: !production,

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets:['es2015'] }
      }
    ]
  },

  resolve: {
    extensions: ['', '.js'],
  },

  plugins: [],

  devServer: {
    contentBase: "./app"
  },

  jshint: { 'esversion' : 6 }
};

if (production) {
  // Empêche UglifyJS de gueuler sur le bundle de prod
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      exclude: /node_modules/
    })
  );
}

module.exports = config;