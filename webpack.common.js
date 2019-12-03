const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
    app: './app.tsx',
    dist: path.join(__dirname, './public')
};

module.exports = {
    devtool: 'inline-source-map',
    context: path.join(__dirname, '/src'),
    entry: PATHS.app,
    output: {
        path: PATHS.dist,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
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
            "@lib": path.join(__dirname, './src/lib'),
            "@store": path.join(__dirname, './src/store'),
        },
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['bundle.js', 'bundle.js.map']
        }),
    ],
    performance: {
        hints: "warning"
    },
    optimization: {
        usedExports: true,
    },
    node: {
        __dirname: false,
        __filename: false
    },
    target: 'electron-renderer',
}