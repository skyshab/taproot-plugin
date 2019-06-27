/**
 * Title Block
 *
 * This file handles the JavaScript for creating a custom block
 * to display the page or post title in the block editor content.
 *
 * @package   Taproot
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://taproot-theme.com
 */


/**
 * WordPress dependencies
 */
const { __ } = window.wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import edit from './edit';
import transforms from './transforms';


// register the block
registerBlockType('taproot/title', {
    title: __( 'Taproot Title' ),
    category: 'common',
    icon: 'heading',
    description: __( 'Display the page/post title in the content' ),
    keywords: [ __( 'title' ), __( 'taproot' ), __( 'post title' ) ],
    supports: {
		className: false,
		anchor: false,
        multiple: false,
        reusable: false,
    },
	attributes: {
		align: {
			type: 'string'
		},
		level: {
			type: 'number',
			default: 1
		},
		textColor: {
			type: 'string'
		},
		customTextColor: {
			type: 'string'
		}
	},
	transforms,
    edit
})
