const path = require('path');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

// import path from 'path';
// import dotenv from 'dotenv';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// dotenv.config();

//const SRC_DIR = path.resolve(__dirname, 'src/client');
//const DIST_DIR = path.resolve(__dirname, 'dist');
const { ENV_BUNDLE_MODE } = process.env;

module.exports = {
  mode: ENV_BUNDLE_MODE,
  entry: path.resolve(__dirname, 'src', 'client', 'Index.tsx'),
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js', // set up for code-splitting
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  watch: true,
  module: {
    rules: [
      // {
      //   test: /\.(ts|tsx)$/,
      //   exclude: /node_modules|\.d\.ts$/,
      //   use: {
      //     loader: 'ts-loader'
      //   }
      // },
      {
        test: /\.(jsx|js|png|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {}
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
      inject: 'body'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'jsx'] // .tsx????
  },
  devServer: {
    historyApiFallback: true,
  }
};
//The below code will help facilitate rerouting to a specific page when a client side request failed.
