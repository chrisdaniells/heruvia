var path = require('path');

const PATHS = {
    app: './src/app.tsx',
    dist: path.join(__dirname, './public')
};

module.exports = {
    devtool: 'source-map',
    context: __dirname,
    entry: ['whatwg-fetch', PATHS.app],
    output: {
        path: PATHS.dist,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.ts|\.tsx$/, exclude: /node_modules/, loader: "ts-loader" }
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            "@root": path.join(__dirname, './src'),
            "@api": path.join(__dirname, './src/api'),
            "@apps": path.join(__dirname, './src/apps'),
            "@components": path.join(__dirname, './src/components'),
            "@config": path.join(__dirname, './src/config'),
            "@enums": path.join(__dirname, './src/enums'),
            "@interfaces": path.join(__dirname, './src/interfaces'),
        },
    },
    performance: {
        hints: false
    },
    externals: {
        //fs: 'fs',
        //path: 'path'
    },
    optimization: {
        minimize: false
    },
    node: {
        __dirname: false,
        __filename: false
    },
    mode: "development",
    target: 'electron-renderer'
};