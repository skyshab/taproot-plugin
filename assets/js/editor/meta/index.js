/**
 * Post Meta Block
 *
 * This file handles the JavaScript for the post meta block.
 *
 * @package   Taproot
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://taproot-theme.com
 */


/**
 * Internal dependencies
 */
import edit from './edit';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = window.wp.i18n;
const { registerBlockType } = wp.blocks;


// register the block
registerBlockType('taproot/post-meta', {
    title: __( 'Taproot Post Meta' ),
    category: 'common',
    icon: 'sticky',
    description: __( 'Display the page/post meta in the content' ),
    keywords: [ __( 'metadata' ), __( 'taproot' ), __( 'post title' ) ],
    supports: {
        className: false,
        anchor: false,
        multiple: true,
        reusable: false,
        align: false,
    },
    attributes: {
        values: {
            type: 'object',
            default: {}
        },
        author: {
            type: 'bool',
            default: true
        },
        date: {
            type: 'bool',
            default: true
        },
        taxonomies: {
            type: 'array',
            default: []
        },
        textColor: {
            type: 'string'
        },
        customTextColor: {
            type: 'string'
        },
        align: {
            type: 'string'
        }
    },
    transforms,
    edit
})
