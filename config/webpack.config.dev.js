const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appPackageJson = require('../package.json');
const appHtml = resolveApp('./public/index.html');
const { proxy, menuName } = appPackageJson;

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(scss|css)$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192, // 8KB'den küçük dosyalar base64 kodu olarak içe aktarılacak
                    name: 'assets/images/[name].[ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    mimeType: 'application/font-ttf',
                    name: 'assets/fonts/[name].[ext]',
                },
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PUBLIC_URL': JSON.stringify(''),
            'process.env.MENU_NAME': JSON.stringify(menuName),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, appHtml),
            filename: 'index.html',
            favicon: './public/favicon.ico',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, '../public'),
        },
        port: 3000,
        open: true,
        host: 'localhost',
        hot: true,
        compress: true,
        historyApiFallback: true,
        proxy: [{
            context: ['/api'],
            target: proxy,
        }],
    },
};