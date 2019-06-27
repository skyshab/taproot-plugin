/**
 * Meta Block Component
 *
 * This file handles the JavaScript for creating a custom block
 * to display the page or post Meta in the block editor content.
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
const { Component }= wp.element;
const { createElement } = window.wp.element;

/**
 * Internal dependencies
 */
import { getIcons } from './utilities';


class TaprootMeta extends Component {

    render() {
        const { style, className, metaItems } = this.props;
        const block = "taproot-meta";
        const icons = getIcons();
        let metaContent = [];

        if(metaItems) {
            metaItems.map( item => {

                let itemWrapper = [];
                let itemTerms = []
                let value = '';

                if( Array.isArray(item.value) ) {

                    if(item.value.length !== 0 ) {
                        itemWrapper.push( icons[item.icon] );
                    }

                    item.value.forEach((term, index) => {

                        itemTerms.push( createElement( 'a', {href: '#'}, term ) );

                        // add comma after all but the last item
                        if(index !== (item.value.length - 1)){
                            itemTerms.push(', ');
                        }
                    });

                    value = itemTerms;
                }
                else if(item.value) {
                    itemWrapper.push( icons[item.icon] );
                    value = item.value;
                }


                itemWrapper.push( createElement( 'span', {
                    className: `${block}__item__content ${block}__item__content--${item.name}`
                }, value ) );

                metaContent.push( createElement( 'span', {
                    className: `${block}__item ${block}__item--${item.name}`
                }, itemWrapper ) );

            });
        }

        return createElement( 'p', {
            className: className,
            style: style
        }, metaContent );
	}

}

export default TaprootMeta;
