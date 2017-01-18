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
            to     : config.dist.css
        }, {
            context: path.join( config.dev.js, 'vendors' ),
            from   : '**',
            to     : config.dist.js
        }
    ] ),
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( ".bower.json", [ "main" ] )
    ),
    new webpack.ProvidePlugin( {
        $     : 'jquery',
        jQuery: 'jquery'
    } ),
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
    new HtmlWebpackPlugin( addHTML( 'projects-dropdown') ),
    new HtmlWebpackPlugin( addHTML( 'tags') ),
    new HtmlWebpackPlugin( addHTML( 'tag-inside') ),
    new HtmlWebpackPlugin( addHTML( 'add-tag') ),
    new HtmlWebpackPlugin( addHTML( 'search') ),
    new HtmlWebpackPlugin( addHTML( 'site-components') ),
    new HtmlWebpackPlugin( addHTML( 'search-files-code') ),
    new HtmlWebpackPlugin( addHTML( 'search-notes') ),
    new HtmlWebpackPlugin( addHTML( 'search-projects') ),
    new HtmlWebpackPlugin( addHTML( 'search-people') ),
    new HtmlWebpackPlugin( addHTML( 'search-branch-commits') ),
    new HtmlWebpackPlugin( addHTML( 'search-direct-messages') ),
    new HtmlWebpackPlugin( addHTML( 'bookmarks') ),
    new HtmlWebpackPlugin( addHTML( 'empty-branches') ),
    new HtmlWebpackPlugin( addHTML( 'empty-commits') ),
    new HtmlWebpackPlugin( addHTML( 'empty-code') ),
    new HtmlWebpackPlugin( addHTML( 'empty-docs') ),
    new HtmlWebpackPlugin( addHTML( 'empty-mentions') ),
    new HtmlWebpackPlugin( addHTML( 'empty-notes') ),
    new HtmlWebpackPlugin( addHTML( 'empty-project-mentions') ),
    new HtmlWebpackPlugin( addHTML( 'empty-tagged') ),
    new HtmlWebpackPlugin( addHTML( 'empty-tags') ),
    new HtmlWebpackPlugin( addHTML( 'empty-timeline') ),
    new HtmlWebpackPlugin( addHTML( 'empty-history') ),
    new HtmlWebpackPlugin( addHTML( 'branches') ),
    new HtmlWebpackPlugin( addHTML( 'create-project') ),
    new HtmlWebpackPlugin( addHTML( 'commits-step1') ),
    new HtmlWebpackPlugin( addHTML( 'dialogue-add-tag') ),
    new HtmlWebpackPlugin( addHTML( 'dialogues') ),
    new HtmlWebpackPlugin( addHTML( 'docs-list') ),
    new HtmlWebpackPlugin( addHTML( 'docs-tile') ),
    new HtmlWebpackPlugin( addHTML( 'branches-note') )
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