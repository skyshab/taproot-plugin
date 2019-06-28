/**
 * Hero Block Utility Functions
 *
 * This file contains utility functions for the hero area block.
 *
 * @package   Taproot
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://taproot-theme.com
 */


/**
 * Get Hero Image
 *
 * @return string
 */
export function getHeroImage() {

    const headerImageType = wp.data.select('core/editor').getEditedPostAttribute('meta')['taproot_custom_header_image_type'];
    let image = false

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
