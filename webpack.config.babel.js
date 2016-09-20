import webpack from 'webpack'
import path from 'path'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import pkg from './package.json'
import string from 'string'
import ip from 'my-local-ip'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const serviceHotLoader = require.resolve('./loaders/service-loader');
const htmlHotLoader = require.resolve('./loaders/html-loader');
const componentHotLoader = require.resolve('./loaders/component-loader');

/**
 * Configuration
 */
const config = {
    isProd: process.env.npm_lifecycle_event == 'build',
    src   : path.resolve(__dirname, "src"),
    dist  : path.resolve(__dirname, "dist"),
    ip    : ip(),
    name  : pkg.name,
    title : string(pkg.name).humanize().titleCase().s,
    port  : 3000
}

/**
 * Banner
 */
const banner = `
    ${config.title} - ${pkg.description}
    Author: ${pkg.author}
    Url: ${pkg.homepage}
    License(s): ${pkg.license}
`

/**
 * Plugins
 */
let plugins = [
    new HtmlWebpackPlugin({
        template: `${config.src}/index.ejs`,
        title: config.title
    }),
    new webpack.DefinePlugin({
        NS: JSON.stringify(config.name),
        DirectiveNS: JSON.stringify(config.name.toLowerCase()),
        AngularNS: JSON.stringify(string(config.name.toLowerCase()).replaceAll('-', '.').s),
        HumanNS: JSON.stringify(config.title)
    }),
    new webpack.HotModuleReplacementPlugin()
]

if (config.isProd) {
  
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.BannerPlugin(banner),
        new ExtractTextPlugin(`${config.name}.min.css`)
    )

}

/**
 * Preloaders, used for services and component controller HMR
 */
let preLoaders = []

if (!config.isProd) {

    preLoaders.push(
        {
            test: /^((?!_.js).)*.js$/,
            loader: componentHotLoader,
            include: path.resolve(__dirname, 'src/js/components/')
        },
        {
            test: /^((?!_.js).)*.js$/,
            loader: serviceHotLoader,
            include: path.resolve(__dirname, 'src/js/services/')
        }
    );

}

/**
 * PostLoaders, used for template HMR
 */
let postLoaders = []

if (!config.isProd) {
    postLoaders.push(
        {
            test: /\.html/,
            include: path.resolve(__dirname, 'src/'),
            loader: htmlHotLoader
        }
    )
}

/**
 * Loaders
 */
let loaders = []
loaders.push(
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'ng-annotate!babel'
    },
    {
        test: /\.html$/,
        loader: "html"
    },
    {
        test: /\.font\.(js|json)$/,
        loader: "style!css!fontgen?embed&types=woff"
    }
);

if (!config.isProd) {
    loaders.push(
        {
            test: /\.scss$/,
            loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!postcss!sass?sourceMap'
        }
    )    
} else {
   loaders.push(
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!postcss!sass?sourceMap')
        }
    )    
}

/**
 * Entry points
 */
let entry = {}

if (!config.isProd) {
    entry[`${config.name}`] = `${config.src}/js/index.js`
} else {
    entry[`${config.name}.min`] = `${config.src}/js/index.js`
}

/**
 * Dev server configuration
 */
const devServer = {
    hot: true,
    inline: true,
    quiet: true,
    open: true,
    port: config.port,
    host: config.ip,
    contentBase: config.dist
}

/**
 * Export config
 */
module.exports = {
    devServer,
    entry,
    devtool: !config.isProd ? 'eval-source-map' : '',
    output: {
        path: config.dist,
        filename: '[name].js'
    },
    module: {
        preLoaders,
        loaders,
        postLoaders
    },
    htmlLoader: {
        interpolate: true
    },
    postcss: () => {
        return [precss, autoprefixer];
    },
    plugins
};