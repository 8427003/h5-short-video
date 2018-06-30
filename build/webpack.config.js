const path = require('path');
const onePageReactConfig = require('rid-webpack-build/lib/onePageReactConfig');
const webpackMerge = require('webpack-merge');

var config = {
    entry: {
        "index": ["./src/index.js"],
    },
    resolve: {
        alias: {

            // you can import('app/store/index.js');
            app: path.resolve(__dirname, '../src/app/'),
        }
    }
}

module.exports = function (env={}) {
    if(env.prod) {
        return webpackMerge(onePageReactConfig.prodConfig, config)
    }

    if(env.dev) {
        return webpackMerge(onePageReactConfig.devConfig, config)
    }
}


