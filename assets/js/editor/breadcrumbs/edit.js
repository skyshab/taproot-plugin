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
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { PanelBody, ServerSideRender } = wp.components;
const { compose } = wp.compose;
const {
    AlignmentToolbar,
    InspectorControls,
    withColors,
    PanelColorSettings,
} = wp.blockEditor;


function BreadcrumbsEdit( {
    attributes,
    setAttributes,
    textColor,
    setTextColor,
} ) {
    const { align } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Breadcrumbs Settings' ) }>
                    <p>{ __( 'Breadcrumbs Alignment' ) }</p>
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
            <ServerSideRender
                block="taproot/breadcrumbs"
                attributes={ attributes }
            />
        </>
    );
}

export default compose( [
    withColors( 'backgroundColor', { textColor: 'color' } )
] )( BreadcrumbsEdit );
