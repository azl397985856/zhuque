var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: [
      'webpack-dev-server/client?http://127.0.0.1:1024', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: "style!css" 
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
    ]
};