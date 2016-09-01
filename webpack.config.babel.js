import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const config = {
    isProd: process.env.npm_lifecycle_event == 'build',
    src   : path.resolve(__dirname, "src"),
    dist  : path.resolve(__dirname, "dist")
}

let plugins = [
    new HtmlWebpackPlugin({
        template: `${config.src}/index.ejs`,
        title: require("./package.json").name
    })
]

if (!config.isProd) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
            unused: true,
            dead_code: true,
            warnings: false,
            drop_console: true
        }
    }))
}

module.exports = {
    devServer: {
        inline: true,
        hot: true,
        contentBase: config.dist
    },
    entry: `${config.src}/index.js`,
    devtool: !config.isProd ? 'eval-source-map' : '',
    output: {
        path: config.dist,
        filename: "app.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['ng-annotate','babel']
            },
            {
                test: /\.scss$/,
                loader: 'style!css?sourceMap!postcss!sass?sourceMap'
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    plugins
};