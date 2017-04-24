var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: {
        "uri-params": ['./index.js']
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "[name].js",
        library: 'uriParams',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.BannerPlugin('Author by yedaodao<404069912@qq.com>'),
        // new webpack.optimize.UglifyJsPlugin()
    ]
};