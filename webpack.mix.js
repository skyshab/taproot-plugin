/**
 * Laravel Mix configuration file.
 *
 * Laravel Mix is a layer built on top of WordPress that simplifies much of the
 * complexity of building out a Webpack configuration file. Use this file to
 * configure how your assets are handled in the build process.
 *
 * @link https://laravel.com/docs/5.6/mix
 *
 * @package   Taproot Plugin
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @link      https://taproot-theme.com
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Import required packages.
const mix = require( 'laravel-mix' );

/*
 * -----------------------------------------------------------------------------
 * Plugin Export Process
 * -----------------------------------------------------------------------------
 * Configure the export process in `webpack.mix.export.js`. This bit of code
 * should remain at the top of the file here so that it bails early when the
 * `export` command is run.
 * -----------------------------------------------------------------------------
 */

if ( process.env.export ) {
    const exportPlugin = require( './webpack.mix.export.js' );
    return;
}

/*
 * -----------------------------------------------------------------------------
 * Build Process
 * -----------------------------------------------------------------------------
 * The section below handles processing, compiling, transpiling, and combining
 * all of the theme's assets into their final location. This is the meat of the
 * build process.
 * -----------------------------------------------------------------------------
 */

/*
 * Sets the development path to assets. By default, this is the `/resources`
 * folder in the theme.
 */
const devPath  = 'assets';

/*
 * Sets the path to the generated assets.
 */
mix.setPublicPath( './' );

/*
 * Set Laravel Mix options.
 *
 * @link https://laravel.com/docs/5.6/mix#postcss
 * @link https://laravel.com/docs/5.6/mix#url-processing
 */
mix.options( {
    postCss        : [ require( 'postcss-preset-env' )() ],
    processCssUrls : false
} );

/*
 * Builds sources maps for assets.
 *
 * @link https://laravel.com/docs/5.6/mix#css-source-maps
 */
mix.sourceMaps();

/*
 * Versioning and cache busting. Append a unique hash for production assets. If
 * you only want versioned assets in production, do a conditional check for
 * `mix.inProduction()`.
 *
 * @link https://laravel.com/docs/5.6/mix#versioning-and-cache-busting
 */
mix.version();

/*
 * Compile JavaScript.
 *
 * @link https://laravel.com/docs/5.6/mix#working-with-scripts
 */

mix.react( `${devPath}/js/editor.js`, 'dist/js' );


/*
 * Compile CSS. Mix supports Sass, Less, Stylus, and plain CSS, and has functions
 * for each of them.
 *
 * @link https://laravel.com/docs/5.6/mix#working-with-stylesheets
 * @link https://laravel.com/docs/5.6/mix#sass
 * @link https://github.com/sass/node-sass#options
 */

// Sass configuration.
var sassConfig = {
    outputStyle : 'expanded',
    indentType  : 'tab',
    indentWidth : 1
};

// Compile SASS/CSS.
mix.sass( `${devPath}/scss/screen.scss`, 'dist/css', sassConfig )
   .sass( `${devPath}/scss/editor.scss`, 'dist/css', sassConfig );


/*
 * Add custom Webpack configuration.
 *
 * Laravel Mix doesn't currently minimize images while using its `.copy()`
 * function, so we're using the `CopyWebpackPlugin` for processing and copying
 * images into the distribution folder.
 *
 * @link https://laravel.com/docs/5.6/mix#custom-webpack-configuration
 * @link https://webpack.js.org/configuration/
 */
mix.webpackConfig( {
    stats       : 'minimal',
    devtool     : mix.inProduction() ? false : 'source-map',
    performance : { hints  : false    },
    externals   : { jquery : 'jQuery' },
    plugins     : []
});

if ( process.env.sync ) {

    /*
     * Monitor files for changes and inject your changes into the browser.
     *
     * @link https://laravel.com/docs/5.6/mix#browsersync-reloading
     */
    mix.browserSync( {
        proxy : 'localhost',
        files : [
            'dist/**/*',
            'inc/**/*.php',
            'taproot-plugin.php'
        ]
    });
}
