/**
 * Breadcrumbs Block
 *
 * This file handles the JavaScript for the breadcrumbs component.
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


/**
 * WordPress dependencies
 */
const { __ } = window.wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, ServerSideRender } = wp.components;

const { compose } = wp.compose;
const { withSelect } = wp.data;
const {
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
    withColors,
    PanelColorSettings,
} = wp.blockEditor;



// register the block
registerBlockType('taproot/breadcrumbs', {
    title: __( 'Taproot Breadcrumbs' ),
    category: 'common',
    icon: 'sticky',
    description: __( 'Display the breadcrumbs component in the content' ),
    keywords: [ __( 'breacrumbs' ), __( 'taproot' ), __( 'navigation' ) ],
    supports: {
        className: false,
        anchor: false,
        multiple: true,
        reusable: true,
        align: false,
    },
    attributes: {
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
    edit
})
