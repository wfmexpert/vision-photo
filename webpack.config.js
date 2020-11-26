'use strict';

const path = require('path');
// Webpack plugins
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: false,
        port: 3003,
    },
    devtool: 'inline-source-map',
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new HTMLWebpackPlugin({
            title: 'Vision Photo Gallery',
            inject: 'body',
        }),
    ],
    output: {
        filename: 'vision-photo-gallery.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'VisionPhotoGallery',
        libraryExport: 'umd',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
};
