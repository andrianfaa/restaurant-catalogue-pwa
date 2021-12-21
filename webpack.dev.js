/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
const { merge } = require('webpack-merge');
// const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        liveReload: true,
        port: 8080,
        hot: true,
        open: true,
        historyApiFallback: true,
    },
});
