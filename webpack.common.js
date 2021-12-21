/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-regex-literals */
/* eslint-disable global-require */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');

module.exports = {
    entry: path.resolve(__dirname, 'src/scripts/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        },
                    },
                    'postcss-loader',
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        minimizer: [
            '...',
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['optipng', { optimizationLevel: 5 }],
                            [
                                'svgo',
                                {
                                    plugins: extendDefaultPlugins([
                                        {
                                            name: 'removeViewBox',
                                            active: false,
                                        },
                                        {
                                            name: 'addAttributesToSVGElement',
                                            params: {
                                                attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                                            },
                                        },
                                    ]),
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/templates/index.html'),
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'style.min.css',
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'images',
                    },
                }, {
                    urlPattern: /\.(?:js|css)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'static-resources',
                    },
                }, {
                    urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'google-fonts',
                    },
                }, {
                    urlPattern: new RegExp('^https://restaurant-api.dicoding.dev/(.*)'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'restaurant-api',
                    },
                },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/public'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
    ],
};
