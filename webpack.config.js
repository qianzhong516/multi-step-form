const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        // clean /dist before each build
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: '3000',
        // serving static files from the directory (default: 'public')
        static: './dist',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Create React From Scratch',
            meta: { viewport: 'width=device-width, initial-scale=1.0' },
            template: './index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    optimization: {
        // to prevent vendor chunk from being regenerated due to module resolving order is changed
        // when a new dependency is included
        moduleIds: 'deterministic',
        // extract the boilerplate for webpack runtime code
        runtimeChunk: 'single',
        // remove duplicate dependencies from bundles
        splitChunks: {
            chunks: 'all',
        },
    },
};
