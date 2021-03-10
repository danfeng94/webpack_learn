const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { setEntry, setHtmlPlugin } = require('./webpack.util');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 分离并压缩css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: setEntry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]/index.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react', '@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties'],
                        },
                    },
                ],
            },
        ],
    },
    // 生成HTML入口文件
    plugins: [
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]/index.css',
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
            },
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
        ...setHtmlPlugin(),
    ],
    // 省略文件扩展名
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
};
