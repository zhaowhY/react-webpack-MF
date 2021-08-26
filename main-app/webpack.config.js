const {ModuleFederationPlugin} = require('webpack').container
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const path = require('path');
module.exports = {
    entry: "./index.js",
    mode: "development",
    devtool:"hidden-source-map",
    output: {
        publicPath: "http://localhost:3002/",
        clean:true
    },
    resolve:{
        extensions: ['.jsx', '.js', '.json','.css','.scss','.jpg','jpeg','png',],
      },
    module: {
        rules: [
          {
            test:/\.(jpg|png|gif|jpeg)$/,
            loader:'url-loader'
          },
          {
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        ],
      },
    plugins: [
    //   new BundleAnalyzerPlugin({
    //     analyzerPort: 9002
    // }),
        new ModuleFederationPlugin({
            name: "main_app",
            remotes:{
              "component-app":"component_app@http://localhost:3001/remoteEntry.js",
                // "lib-app":"lib_app@http://localhost:3000/remoteEntry.js"
            },
            shared: ['react', 'react-dom']
        }),
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        })
    ],
};