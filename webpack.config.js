const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = smp.wrap({
  'entry': ['./src/index.ts'],
  'output': {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  'mode': 'development',
  'devtool': 'eval-source-map',
  'devServer': {
    port: '8000',
    host: '0.0.0.0',
    public: 'localhost:8000',
    open: false,
    quiet: true,
  },
  'plugins': [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      open: false,
    }),
  ],
  'module': {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  'resolve': {
    extensions: ['.tsx', '.ts', '.js'],
  },
});

