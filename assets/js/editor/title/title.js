/**
 * Title Block Component
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
const { Component }= wp.element;
const { createElement } = window.wp.element;

class TaprootTitle extends Component {

	render() {
		const { tagName, className, style, content } = this.props;
        return createElement( tagName, {
            className: className,
            style: style
        }, content );
	}
}

export default TaprootTitle;
