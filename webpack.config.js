var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: [
      'webpack-dev-server/client?http://127.0.0.1:1024', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      "./src/layout/appRouter.js"
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
              test: /\.less$/,
              loader: "style!css!less" 
            },
            {
              test: /\.css$/,
              loader: "style!css" 
            },
            {
              test: /\.json$/,
              loader: "json" 
            },
            {
              test: /\.js$|\.jsx$/,
              include: path.join(__dirname, 'src'),
              loaders: ['babel'],
            },
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    node: {
      fs: "empty",
      net: 'empty'
    }
};