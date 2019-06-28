/**
 * Hero Area Block - Save
 *
 * This file handles the JavaScript for the hero block on the front end.
 *
 * @package   Taproot
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://taproot-theme.com
 */


/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { InnerBlocks } = window.wp.blockEditor;


export default function save() {

    const className = classnames( 'container' );

    return (
        <div className={ className }>
            <InnerBlocks.Content />
        </div>
    );
}
