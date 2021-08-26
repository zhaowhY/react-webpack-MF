const { ModuleFederationPlugin } = require('webpack').container;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const path = require('path');
module.exports = {
    entry: "./index.js",
    mode: "development",
    devtool: "hidden-source-map",
    output: {
        publicPath: "http://localhost:3000/",
        clean: true
    },
    module: {
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "lib_app",
            filename: "remoteEntry.js",
            exposes: {
                "./react": "react",
                "./react-dom": "react-dom"
            },
            shared: ['react', 'react-dom'],
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 9000
        // }),
    ],
};