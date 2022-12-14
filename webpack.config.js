const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const getFilename = (ext) => (isProd ? `[name].${ext}` : '[name].[hash].js');

const getOptimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ];
  }

  return config;
};

module.exports = {
  target: ['web', 'es5'],
  mode: isProd ? 'production' : 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    filename: getFilename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '...'],
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@actions': path.resolve(__dirname, './src/redux/actions'),
      '@thunks': path.resolve(__dirname, './src/redux/thunks'),
      '@selectors': path.resolve(__dirname, './src/redux/selectors'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
  optimization: getOptimization(),
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  devtool: !isProd && 'source-map',
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: 'favicon.ico', to: '' }],
    // }),
    new MiniCssExtractPlugin({
      filename: getFilename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(ttf)$/,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
    ],
  },
};
