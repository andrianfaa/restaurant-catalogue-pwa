/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
const path = require('path');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
        },
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
        new CleanWebpackPlugin(),
    ],
});
