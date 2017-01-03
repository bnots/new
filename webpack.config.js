const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const BowerWebpackPlugin = require( 'bower-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );

const __dev = path.join( __dirname, 'frontend' );
const __dist = path.join( __dirname, 'public' );

const config = {
    dev : {
        js  : path.join( __dev, 'js' ),
        sass: path.join( __dev, 'stylesheet' ),
        view: path.join( __dirname, 'view' )
    },
    dist: {
        css: path.join( __dist, 'stylesheet' ),
        js : path.join( __dist, 'js' )
    }
};

function addHTML( fileName) {
    let minifyOption = {
        caseSensitive              : true,
        collapseBooleanAttributes  : true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace         : true,
        conservativeCollapse       : true,
        removeComments             : true
    };
    return {
        filename: fileName + '.html',
        template: path.join( __dirname, 'view', 'app.html.haml' ),
        inject  : 'body',
        chunks  : [ 'common', 'main' ],
        minify  : NODE_ENV == 'production' ? minifyOption : false
    }
}

// -- webpuck plugins
const plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin( {
        NODE_ENV: JSON.stringify( NODE_ENV ),
        LANG    : JSON.stringify( 'en' )
    } ),
    new webpack.ProvidePlugin( {} ),
    new BrowserSyncPlugin(
        {
            host  : 'localhost.bs',
            port  : 3010,
            ui    : false,
            server: { baseDir: [ 'public' ] }
        }, {
            reload: true
        }
    ),
    new CopyWebpackPlugin( [
        {
            context: __dev,
            from   : 'images/**',
            to     : __dist
        }, {
            context: __dev,
            from   : 'fonts/**',
            to     : __dist
        }, {
            context: path.join( config.dev.js, 'vendors' ),
            from   : '**',
            to     : config.dist.js
        }
    ] ),
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( ".bower.json", [ "main" ] )
    ),
    new BowerWebpackPlugin( {
        modulesDirectories             : [ "bower_components" ],
        manifestFiles                  : "bower.json",
        includes                       : /.js$/,
        searchResolveModulesDirectories: true
    } ),
    new ExtractTextPlugin( path.join( 'stylesheet', 'style.css' ), { allChunks: true } ),
    new webpack.optimize.CommonsChunkPlugin( {
        name     : 'common',
        minChunks: 2
    } ),
    new HtmlWebpackPlugin( addHTML( 'direct-messages-opened-states' ) ),
    new HtmlWebpackPlugin( addHTML( 'index' ) ),
    new HtmlWebpackPlugin( addHTML( 'direct-messages' ) ),
    new HtmlWebpackPlugin( addHTML( 'direct-messages-new' ) ),
    new HtmlWebpackPlugin( addHTML( 'userselect') ),
    new HtmlWebpackPlugin( addHTML( 'tag-inside') )
];

if( NODE_ENV == 'production' ) {
    webpackExports.output.publicPath = '';
    plugins.push(
        new webpack.optimize.UglifyJsPlugin( {
            compress: {
                warnings    : false,
                drop_console: true,
                unsafe      : true
            }
        } )
    );
}

module.exports = {
    context      : config.dev.js,
    entry        : {
        main: './main',
    },
    output       : {
        path      : __dist + '/',
        publicPath: '/',
        filename  : "[name].js",
        library   : "[name]"
    },
    watch        : NODE_ENV == 'development',
    watchOptions : { aggregateTimeout: 100 },
    devtool      : NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
    resolve      : {
        modulesDirectories: [
            'node_modules',
            'bower_components',
            'view',
            config.dev.sass
        ],
        extensions        : [ '', '.js', '.haml', '.sass' ]
    },
    resolveLoader: {
        modulesDirectories: [ 'node_modules' ],
        moduleTemplates   : [ '*-loader', '*' ],
        extensions        : [ '', '.js' ]
    },
    plugins      : plugins,
    module       : {
        loaders: [
            {
                test   : /\.js$/,
                include: __dev,
                loader : 'babel?presets[]=es2015'
            },
            {
                test  : /\.sass$/,
                loader: ExtractTextPlugin.extract( [
                    'css',
                    'postcss',
                    'sass'
                ] )
            },
            {
                test   : /\.haml$/,
                include: config.dev.view,
                loader : "haml"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=images/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
        node   : {
            fs: "empty"
        },
        noParse: [
            /angular\/angular.js/
        ]
    },
    postcss      : [
        require( 'autoprefixer' )( {
            browsers: [ 'IE 10', 'IE 11', 'firefox 20', 'ios_saf 8.4', 'android 4.3' ]
        } ),
        require( 'postcss-short' )()
    ],
    sassLoader   : {
        outputStyle: NODE_ENV == 'development' ? 'nested' : 'compressed'
    }
};