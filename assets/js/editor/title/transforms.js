/**
 * Title Block - Transforms
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
const { createBlock } = wp.blocks;

const transforms = {
    to: [
        {
            type: 'block',
            blocks: [ 'core/heading' ],
            transform: ( { level, content } ) => {
                return createBlock( 'core/heading', {
                    level,
                    content,
                });
            },
        },
    ],
};

export default transforms;
