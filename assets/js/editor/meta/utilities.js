/**
 * Meta Block Utility Functions
 *
 * This file contains utility functions for getting the post meta item values
 *
 * @package   Taproot
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://taproot-theme.com
 */

const { ToggleControl, Icon } = wp.components;


/**
 * Get Post Author Name
 *
 * @param select - the select function
 * @return string
 */
export function getTheAuthor(select) {

    const postAuthor =  select( 'core/editor' ).getEditedPostAttribute( 'author' );
    const authors = select( 'core' ).getAuthors();
    let authorName = '';

    for (var i = 0; i < authors.length; i++) {
        const theAuthor = authors[i];
        if(theAuthor.id === postAuthor) {
            authorName = theAuthor.name;
            break;
        }
    }

    return authorName;
}

/**
 * Get Post Published Date
 *
 * @param select - the select function
 * @return string
 */
export function getTheDate(select) {

    const dateRaw = select( 'core/editor' ).getEditedPostAttribute( 'date' );
    const dateFormat = wp.date.__experimentalGetSettings().formats.date;

    return (dateRaw) ?  wp.date.format(dateFormat, dateRaw) : '';
}


/**
 * Get Taxonomy List
 *
 * @param select - the select function
 * @param attribute - the post attribute
 * @param taxonomy - the taxonomy to query
 * @return array
 */
export function getTaxonomyList(select, attribute, taxonomy) {

    const selectedTaxonomies = select( 'core/editor' ).getEditedPostAttribute( attribute );
    const taxonomies = select( 'core' ).getEntityRecords( 'taxonomy', taxonomy, { per_page: -1, hide_empty: true } );
    let taxList = [];

    if(taxonomies) {
        taxonomies.map( tax => {
            if( selectedTaxonomies.includes(tax.id) ) {
                taxList.push(tax.name);
            }
        });
    }

    return taxList;
}



/**
 * Get Toggles
 *
 * @param setAttributes - function to set attributes
 * @param controls - array of controls to render
 * @return array
 */
export function taxonomyToggles(setAttributes, controls, taxObj) {

    if( !controls ) return null;

    let toggles = [];
    let values = {};

    controls.map( control => {
        values[control.attribute] = control.checked;
    });

    controls.map( control => {
        toggles.push((
            <ToggleControl
                label={ control.label }
                checked={ control.checked }
                onChange={ ( selected ) => {
                    values[control.attribute] = selected;
                    setAttributes( { values: values } );

                    if(selected){
                        if(taxObj.indexOf(control.slug) === -1) {
                            taxObj.push(control.slug);
                        }
                    }
                    else {
                        taxObj = taxObj.filter(item => item !== control.slug)
                    }

                    setAttributes( { taxonomies: taxObj } );
                } }
            />
        ));
    });

    return toggles;
}


/**
 * Get Icons Object
 *
 * @return object
 */
export function getIcons() {

    return {
        author: (
            <Icon className ="taproot-icon" size="100%" viewBox="0 0 20 28" icon={ <svg><path d="M20 21.859c0 2.281-1.5 4.141-3.328 4.141h-13.344c-1.828 0-3.328-1.859-3.328-4.141 0-4.109 1.016-8.859 5.109-8.859 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c4.094 0 5.109 4.75 5.109 8.859zM16 8c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6z" /></svg> } />
        ),
        date: (
            <Icon className ="taproot-icon" size="100%" viewBox="0 0 26 28" icon={ <svg><path d="M2 26h4.5v-4.5h-4.5v4.5zM7.5 26h5v-4.5h-5v4.5zM2 20.5h4.5v-5h-4.5v5zM7.5 20.5h5v-5h-5v5zM2 14.5h4.5v-4.5h-4.5v4.5zM13.5 26h5v-4.5h-5v4.5zM7.5 14.5h5v-4.5h-5v4.5zM19.5 26h4.5v-4.5h-4.5v4.5zM13.5 20.5h5v-5h-5v5zM8 7v-4.5c0-0.266-0.234-0.5-0.5-0.5h-1c-0.266 0-0.5 0.234-0.5 0.5v4.5c0 0.266 0.234 0.5 0.5 0.5h1c0.266 0 0.5-0.234 0.5-0.5zM19.5 20.5h4.5v-5h-4.5v5zM13.5 14.5h5v-4.5h-5v4.5zM19.5 14.5h4.5v-4.5h-4.5v4.5zM20 7v-4.5c0-0.266-0.234-0.5-0.5-0.5h-1c-0.266 0-0.5 0.234-0.5 0.5v4.5c0 0.266 0.234 0.5 0.5 0.5h1c0.266 0 0.5-0.234 0.5-0.5zM26 6v20c0 1.094-0.906 2-2 2h-22c-1.094 0-2-0.906-2-2v-20c0-1.094 0.906-2 2-2h2v-1.5c0-1.375 1.125-2.5 2.5-2.5h1c1.375 0 2.5 1.125 2.5 2.5v1.5h6v-1.5c0-1.375 1.125-2.5 2.5-2.5h1c1.375 0 2.5 1.125 2.5 2.5v1.5h2c1.094 0 2 0.906 2 2z" /></svg> } />
        ),
        categories: (
            <Icon className ="taproot-icon" size="100%" viewBox="0 0 28 28" icon={ <svg><path d="M6 22c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM6 14c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM28 20.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.266 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.234-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5zM6 6c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM28 12.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.266 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.234-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5zM28 4.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.266 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.234-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5z" /></svg> } />
        ),
        tags: (
            <Icon className ="taproot-icon" size="100%" viewBox="0 0 30 28" icon={ <svg><path d="M7 7c0-1.109-0.891-2-2-2s-2 0.891-2 2 0.891 2 2 2 2-0.891 2-2zM23.672 16c0 0.531-0.219 1.047-0.578 1.406l-7.672 7.688c-0.375 0.359-0.891 0.578-1.422 0.578s-1.047-0.219-1.406-0.578l-11.172-11.188c-0.797-0.781-1.422-2.297-1.422-3.406v-6.5c0-1.094 0.906-2 2-2h6.5c1.109 0 2.625 0.625 3.422 1.422l11.172 11.156c0.359 0.375 0.578 0.891 0.578 1.422zM29.672 16c0 0.531-0.219 1.047-0.578 1.406l-7.672 7.688c-0.375 0.359-0.891 0.578-1.422 0.578-0.812 0-1.219-0.375-1.75-0.922l7.344-7.344c0.359-0.359 0.578-0.875 0.578-1.406s-0.219-1.047-0.578-1.422l-11.172-11.156c-0.797-0.797-2.312-1.422-3.422-1.422h3.5c1.109 0 2.625 0.625 3.422 1.422l11.172 11.156c0.359 0.375 0.578 0.891 0.578 1.422z" /></svg> } />
        )
    }
}