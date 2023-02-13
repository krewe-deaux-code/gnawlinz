const path = require('path');
require('dotenv').config();
const HtmlWebpackPlugin = require ('html-webpack-plugin');

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
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jsx|js|png)$/,
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
      template: 'src/client/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx']//.tsx????
  },
  devServer: {
    historyApiFallback: true,
  }
};
//The below code will help facilitate rerouting to a specific page when a client side request failed.
