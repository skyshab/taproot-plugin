/**
 * Post Meta Block - Edit
 *
 * This file handles the JavaScript for displaying the post meta block in the editor.
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
import TaprootMeta from './meta';
import { getTheAuthor, getTheDate, getTaxonomyList, taxonomyToggles } from './utilities';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { PanelBody, ToggleControl } = wp.components;
const { compose } = wp.compose;
const {
    InspectorControls,
    AlignmentToolbar,
    withColors,
    PanelColorSettings,
} = wp.blockEditor;
const { withSelect } = wp.data;


function MetaEdit( {
    attributes,
    setAttributes,
    textColor,
    setTextColor,
    metaItems,
    toggles,
    taxonomies
} ) {

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Post Meta Settings' ) }>
                    <AlignmentToolbar
                        value={ attributes.align }
                        onChange={ nextAlign => setAttributes( { align: nextAlign } ) }
                    />
                    <ToggleControl
                        label={ __('Author') }
                        checked={ attributes.author }
                        onChange={ selected => setAttributes( { author: selected } ) }
                    />
                    <ToggleControl
                        label={ __('Date') }
                        checked={ attributes.date }
                        onChange={ selected => setAttributes( { date: selected } ) }
                    />
                    { taxonomyToggles(setAttributes, toggles, taxonomies) }
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
            <TaprootMeta
                metaItems={ metaItems }
                className={ classnames( 'wp-block--taproot-meta taproot-meta', {
                    [ `has-text-align-${ attributes.align }` ]: attributes.align,
                    [ textColor.class ]: textColor.class,
                    'has-text-color': textColor.color
                })}
                style={ {color: textColor.color } }
            />
        </>
    );
}

export default compose( [
    withColors( 'backgroundColor', { textColor: 'color' } ),
    withSelect( ( select, props ) => {

        const metaItems = [];
        const {attributes} = props;
        const values = attributes.values;
        const toggles = [];
        const allTaxonomies = select( 'core' ).getTaxonomies();
        const postType = select( 'core/editor' ).getCurrentPostType();

        if(attributes.author) {
            metaItems.push({name: 'author', icon: 'author', value: getTheAuthor(select)});
        }

        if(attributes.date) {
            metaItems.push({name: 'date', icon: 'date', value: getTheDate(select)});
        }

        let taxonomies = [];

        if(allTaxonomies) {
            allTaxonomies.map( taxonomy => {

                if(taxonomy.types.includes(postType) ) {
                    const taxName = taxonomy.name.toLowerCase();

                    // add to output if taxonomy is enabled
                    if(values[taxName]) {
                        // if hierachial, use categories icon. Otherwise, use the tags icon
                        const icon = (taxonomy.hierarchical) ? 'categories' : 'tags';
                        metaItems.push({name: taxName, icon: icon, value: getTaxonomyList(select, taxName, taxonomy.slug )});
                        taxonomies.push(taxonomy.slug);
                    }

                    // add to controls output
                    toggles.push({label: __(taxonomy.name), checked: values[taxName], attribute: taxName, slug: taxonomy.slug });
                }
            });
        }

        return {
            metaItems: metaItems,
            toggles: toggles,
            taxonomies: taxonomies
        }
    })
] )( MetaEdit );
