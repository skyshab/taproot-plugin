<?php
/**
 * Template class
 *
 * This file contains functionality for the public facing parts of the plugin.
 *
 * @package   Taproot
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://taproot-theme.com
 */

namespace TaprootPlugin\Template;

use Hybrid\Contracts\Bootable;
use function TaprootPlugin\taproot_plugin;


/**
 * Handles block editor functionality
 *
 * @since  1.0.0
 * @access public
 */
class Template implements Bootable {


    /**
     * Adds actions on the appropriate customize action hooks.
     *
     * @since  1.0.0
     * @access public
     * @return void
     */
    public function boot() {
        add_action( 'taproot/header/additional-content', [ $this, 'get_custom_header_block_content' ], 20 );
        add_filter( 'the_content', [ $this, 'remove_custom_header_block_from_content' ] );
    }


    /**
     *  Does the post have custom header content?
     *
     * @since 1.0.0
     * @return bool
     */
    public function has_custom_header_content() {
        if( !is_singular() ) {
            return false;
        }
        return get_post_meta( get_the_ID(), 'taprooot_add_hero_content', true );
    }


    /**
     *  Extract the custom header block from the content
     *
     * @since 1.0.0
     * @return void
     */
    public function get_custom_header_block_content() {

        if( !$this->has_custom_header_content() ) {
            return;
        }

        $blocks = parse_blocks( get_the_content( null, false, get_the_ID() ) );
        foreach ( $blocks as $block ) {
            if ( 'taproot/hero' === $block['blockName'] ) {
                echo render_block($block);
                break;
            }
        }
    }


    /**
     *  Remove the custom header content block from the main content
     *
     * @since 1.0.0
     * @param  string
     * @return string
     */
    public function remove_custom_header_block_from_content($content) {

        if( !$this->has_custom_header_content() ) {
            return $content;
        }

        $blocks = parse_blocks( get_the_content( null, false, get_the_ID() ) );

        $filtered_content = '';
        foreach ( $blocks as $block ) {
            if ( 'taproot/hero' === $block['blockName'] ) {
                continue;
            }
            $filtered_content .= render_block( $block );
        }

        return $filtered_content;
    }

}