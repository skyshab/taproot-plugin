/**
 * Hero Area Block - Edit
 *
 * This file handles the JavaScript for displaying the hero area block in the editor.
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
 * Internal dependencies
 */
import { getHeroImage } from './utilities';

/**
 * WordPress dependencies
 */
const { withSelect } = window.wp.data;
const { compose } = window.wp.compose;
const { InnerBlocks } = window.wp.blockEditor;


function HeroEdit( {
    className,
    hasInnerBlocks,
    backgroundImage
} ) {

    const styles = {};
    let classes = className;

    if( backgroundImage ) {
        styles.backgroundImage = backgroundImage;
        classes = classnames( className, {
            'has-background': !! backgroundImage,
        })
    }

    return (
        <>
            <div className={ classes } style={ styles }>
                <InnerBlocks
                    renderAppender={ ! hasInnerBlocks && InnerBlocks.ButtonBlockAppender }
                />
            </div>
        </>
    );
}

export default compose( [
    withSelect( ( select, { clientId } ) => {
        const { getBlock } = select( 'core/block-editor' );
        const block = getBlock( clientId );

        return {
            hasInnerBlocks: !! ( block && block.innerBlocks.length ),
            backgroundImage: getHeroImage()
        };
    } ),
] )( HeroEdit );
