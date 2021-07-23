'use strict';

import path from 'path';
const __dirname = path.resolve();
// Webpack plugins
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {CleanWebpackPlugin} from "clean-webpack-plugin";

export default {
    entry: './VisionPhotoGallery/index.js',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: false,
        port: 3003,
    },
    devtool: 'inline-source-map',
    watch: false,
    watchOptions: {
        ignored: /node_modules/,
    },
    output: {
        filename: 'VisionPhotoGallery.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'VisionPhotoGallery',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'VisionPhotoGallery.css',
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            templateContent: `
                <html>
                    <head>
                        <title>Vision Photo Gallery</title>
                    </head>
                    <body>
                        <div id="app"></div>
                    </body>
                </html>
            `,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['autoprefixer'],
                        },
                    },
                }],
            },
        ],
    },
};
