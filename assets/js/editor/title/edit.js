/**
 * Title Block - Edit
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
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import TitleToolbar from './toolbar';
import TaprootTitle from './title';


/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { PanelBody } = wp.components;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const {
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
    withColors,
    PanelColorSettings,
} = wp.blockEditor;


function TitleEdit( {
    attributes,
    setAttributes,
    className,
    textColor,
    setTextColor,
    content
} ) {
    const { align, level } = attributes;
    const tagName = 'h' + level;

    return (
        <>
            <BlockControls>
                <TitleToolbar
                    minLevel={ 1 }
                    maxLevel={ 3 }
                    selectedLevel={ level }
                    onChange={ newLevel => setAttributes( { level: newLevel } ) }
                />
            </BlockControls>
            <InspectorControls>
                <PanelBody title={ __( 'Title Settings' ) }>
                    <p>{ __( 'Level' ) }</p>
                    <TitleToolbar
                        minLevel={ 1 }
                        maxLevel={ 3 }
                        selectedLevel={ level }
                        onChange={ newLevel => setAttributes( { level: newLevel } ) }
                    />
                    <p>{ __( 'Text Alignment' ) }</p>
                    <AlignmentToolbar
                        value={ align }
                        onChange={ nextAlign => setAttributes( { align: nextAlign } ) }
                    />
                </PanelBody>
                <PanelColorSettings
                    title={ __( 'Color Settings' ) }
                    initialOpen={ false }
                    colorSettings={[
                        {
                            value: textColor.color,
                            onChange: setTextColor,
                            label: __( 'Text Color' )
                        }
                    ]}
                />
            </InspectorControls>
            <TaprootTitle
                content={ content }
                tagName={ tagName }
                className={ classnames( className, {
                    [ `has-text-align-${ align }` ]: align,
                    'has-text-color': textColor.color,
                    [ textColor.class ]: textColor.class,
                })}
                style={ {color: textColor.color } }
            />
        </>
    );
}

export default compose( [
    withColors( 'backgroundColor', { textColor: 'color' } ),
    withSelect( select => {
        return {
            content: select( 'core/editor' ).getEditedPostAttribute('title'),
        }
    })
] )( TitleEdit );
