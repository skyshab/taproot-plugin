/**
 * Title Block - Toolbar
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
import { range } from 'lodash';

/**
 * WordPress dependencies
 */
const { __, sprintf }= wp.i18n;
const { Component }= wp.element;
const { Toolbar }= wp.components;


class TitleToolbar extends Component {
    createLevelControl( targetLevel, selectedLevel, onChange ) {
        return {
            icon: 'heading',
            // translators: %s: heading level e.g: "1", "2"
            title: sprintf( __( 'Heading %d' ), targetLevel ),
            isActive: targetLevel === selectedLevel,
            onClick: () => onChange( targetLevel ),
            subscript: String( targetLevel ),
        };
    }

    render() {
        const { minLevel, maxLevel, selectedLevel, onChange } = this.props;
        return (
            <Toolbar controls={ range( minLevel, maxLevel ).map( ( index ) => this.createLevelControl( index, selectedLevel, onChange ) ) } />
        );
    }
}

export default TitleToolbar;
