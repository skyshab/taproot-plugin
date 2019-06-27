/**
 * Primary front-end script.
 *
 * Primary JavaScript file. Any includes or anything imported should
 * be filtered through this file and eventually saved back into the
 * `/dist/js/app.js` file.
 *
 * @package   Taproot
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://taproot-theme.com
 */

import './editor/hero/index.js';
import {EnableHero} from './editor/sidebar/EnableHero.js';

const {addAction, addFilter, removeFilter} = wp.hooks;


addFilter( 'taproot.plugin.hook', 'skyshab/taproot/taprootPluginHook', function(components){
    return ([
        components,
        <EnableHero fieldName='taprooot_add_hero_content' />
    ])
}, 40);

// example of removing one of the controls from the sidebar
addAction('taproot.plugin.defaultsLoaded', 'skyshab/taprootPlugin/components', function() {
    // removeFilter( 'taproot.plugin.hook', 'skyshab/taproot/postTitle' );
});


// when header image is changed in the taproot sidebar, update the hero content block
// This is successfully passing in the image url. However, this doesn't seem to be doing anything
// apart from triggering the block to refresh. It's not actually updating the background image
// for some reason.
addAction('taproot.plugin.headerImageChange', 'skyshab/taprootPlugin/components', function(image) {
    const headerContentBlock = document.querySelector('.wp-block-taproot-hero');
    if(headerContentBlock) {
        const blockID =  headerContentBlock.parentElement.dataset.block;
        wp.data.dispatch( 'core/editor' ).updateBlockAttributes( blockID, { backgroundImage: `url(${image})` });
    }
});


import './editor/title/index.js';
import './editor/meta/index.js';
