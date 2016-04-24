"use strict";

let pkg = require('./package.json');
let webpack = require('webpack');
let featureFlags = new webpack.DefinePlugin({
  VERSION: JSON.stringify(pkg.version),
  __DEV__: process.env.DEV || true,
  __TEST__: process.env.TEST || false
});

module.exports = {
  // our index file, if you want multiple bundles (e.g. normal.js and admin.js)
  // turn this into an object with keys for each bundle
  entry: {
    normal: './src/normal.js',
    admin: './src/admin.js'
  },
  output: {
    path: './public',
    // if you have multiple bundles as described ^ make sure to include [name]
    // (e.g. '[name].bundle.js)
    filename: '[name]-bundle.js'
  },
  // webpack-dev-server configuration
  devServer: {
    // folder to serve content from
    contentBase: './public',
    // serves from localhost/ instead of localhost/webpack-dev-server
    inline: true
  },
  plugins: [featureFlags],
  // config for all modules (files you include)
  module: {
    loaders: [
      {
        // regular expression to test the filename for
        test: /\.jsx?$/,
        // do not look in these folders
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        // syntactic sugar for -----v
        query: {
          presets: ['es2015']
        }
        // You could also use: loader: 'babel?presets[]=es2015'
        // this gets ugly real fast when you have multiple presets so I like
        // to use the query key, they both do the same thing though!
      }
    ]
  }
};
