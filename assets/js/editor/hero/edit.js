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
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { withSelect } = window.wp.data;
const { compose } = window.wp.compose;
const { InnerBlocks } = window.wp.blockEditor;


const getBackgroundImage = () => {

    const headerImageType = wp.data.select('core/editor').getEditedPostAttribute('meta')['taproot_custom_header_image_type'];
    var image = false

    if('featured' === headerImageType) {
        const { getMedia } = wp.data.select('core');
        const { getEditedPostAttribute } = wp.data.select('core/editor');

        if ( getEditedPostAttribute('featured_media') ) {
            const media = getMedia( getEditedPostAttribute('featured_media') );

            if(media && media.source_url && 'undefined' !== media.source_url) {
                image = media.source_url;
            }
        }
    }

    else if('default' === headerImageType) {
        if (typeof taprootDefaultHeaderImage !== 'undefined') {
            image = taprootDefaultHeaderImage
        }
    }

    else if('custom' === headerImageType) {
        image = wp.data.select('core/editor').getEditedPostAttribute('meta')['taproot_custom_header_image'];
    }

    if(image) {
        return `url(${image})`
    }

    return false;
}





function GroupEdit( {
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
            backgroundImage: getBackgroundImage()
		};
	} ),
] )( GroupEdit );
