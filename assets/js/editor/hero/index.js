/**
 * Block Editor Custom Settings Panel.
 *
 * This file handles the JavaScript for creating a custom panel
 * in the block editor for post level settings.
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
import icon from './icon';
import save from './save';

( wp => {

    /**
     * WordPress dependencies
     */
    const { __ } = wp.i18n;
    const { registerBlockType } = wp.blocks;

    // register the block
    registerBlockType('taproot/hero', {
        title: __( 'Hero Content' ),
        category: 'common',
        icon,
        description: __( 'A block for adding custom header content' ),
        keywords: [ __( 'hero' ), __( 'taproot' ), __( 'section' ) ],
        supports: {
            align: false,
            anchor: false,
            html: false,
            inserter: false,
            multiple: false,
            reusable: false,
            isLocked: true,
        },
        transforms: {},
        edit,
        save
    })

})( window.wp );
