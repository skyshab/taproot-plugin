/**
 * Header Image Picker Component
 *
 * This file handles the JavaScript for creating an image
 * picker control in the block editor theme sidebar panel.
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
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { ToggleControl } = wp.components;
const { withSelect, withDispatch } = wp.data;
const {createBlock, cloneBlock} = wp.blocks;

var blockID = false;
var savedBlock = false;

export const EnableHero = compose(
    withDispatch( function( dispatch ) {
        return {
            setCheckboxValue: value => {
                dispatch('core/editor').editPost({ meta: { taprooot_add_hero_content: value } })
            }
        }
    }),
    withSelect( select => {
        return {
            checkboxValue: select('core/editor').getEditedPostAttribute('meta')['taprooot_add_hero_content'],
        }
    })
)( props => {

    // add the hero content block
    const addBlock = () => {
        const block = (savedBlock) ? savedBlock : createBlock( 'taproot/hero' );
        blockID = block.clientId;
        wp.data.dispatch( 'core/editor' ).insertBlock( block, 0 );
    }

    // remove the hero content block
    const removeBlock = () => {
        if( ! blockID ) {
            var existingHero = document.querySelector('.wp-block-taproot-hero');
            blockID =  existingHero.parentElement.dataset.block;
        }
        savedBlock = cloneBlock( wp.data.select( 'core/block-editor' ).getBlock( blockID ) );
        wp.data.dispatch( 'core/editor' ).removeBlock( blockID );
    }

    // return the custom header image picker component
    return (
        <ToggleControl
        label={ __('Enable Custom Header Content') }
        checked={ props.checkboxValue }
        onChange={ isChecked => {
            isChecked = (isChecked) ? 1 : 0;
            props.setCheckboxValue( isChecked );

            if(isChecked) {
                addBlock();
            }
            else {
                removeBlock();
            }
        }} />
    )
})
