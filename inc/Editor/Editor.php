<?php
/**
 * Editor class
 *
 * This file contains functionality for the block editor.
 *
 * @package   Taproot
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://taproot-theme.com
 */

namespace TaprootPlugin\Editor;

use Hybrid\Contracts\Bootable;
use function TaprootPlugin\taproot_plugin;


/**
 * Handles block editor functionality
 *
 * @since  1.0.0
 * @access public
 */
class Editor implements Bootable {


	/**
	 * Adds actions on the appropriate customize action hooks.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function boot() {
        add_action( 'enqueue_block_editor_assets', [ $this, 'assets' ] );
        add_action( 'init', [ $this, 'register_post_meta' ] );
    }


    /**
     *  Enqueue Editor Assets
     *
     * @since 1.0.0
     * @return void
     */
    public function assets() {

        // Enqueue theme editor styles.
        wp_enqueue_style( 'taproot-plugin-editor', taproot_plugin()->uri . 'dist/css/editor.css', null, null );

        // Register Editor Script
        wp_enqueue_script(
            'taproot-plugin-editor-js',
            taproot_plugin()->uri . 'dist/js/editor.js',
            array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-editor', 'lodash' )
        );
    }


    /**
     * Register post meta fields for the editor sidebar
     *
     * @since 1.0.0
     * @return void
     */
    public function register_post_meta() {

        register_meta( 'post', 'taprooot_add_hero_content', [
            'show_in_rest' => true,
            'single' => true,
            'type' => 'integer',
        ]);

        register_block_type( 'taproot/title', array(
            'editor_script' => 'taproot-plugin-editor-js',
            'render_callback' => [ $this, 'get_the_title'],
        ));

        register_block_type( 'taproot/post-meta', array(
            'editor_script' => 'taproot-plugin-editor-js',
            'render_callback' => [ $this, 'get_the_meta']
        ));
    }

    /**
     * Callback to render taproot title block
     *
     * @since 1.0.0
     * @return string
     */
    public function get_the_title($attributes) {

        $post_id   = get_the_ID();
        $is_single = is_single( $post_id ) || is_page( $post_id ) || is_attachment( $post_id );
        $title = ( $is_single ) ? single_post_title( '', false ) : the_title( '', '', false );
        $tag = ( isset($attributes['level']) ) ? 'h' . $attributes['level'] : 'h1';
        $classes = 'taproot-title-block';
        $styles = '';

        if( isset($attributes['align']) ) {
            $classes .= sprintf(' has-text-align-%s', $attributes['align']);
        }

        if( isset($attributes['textColor']) ) {
            $classes .= sprintf(' has-%s-color', $attributes['textColor']);
        }

        if( isset($attributes['customTextColor']) ) {
            $styles = sprintf('color: %s', $attributes['customTextColor']);
        }

        return sprintf(
            '<%1$s class="%2$s" style="%3$s">%4$s</%1$s>',
            tag_escape( $tag ),
            esc_attr( $classes ),
            esc_attr( $styles ),
            $title
        );
    }


    /**
     * Callback to render taproot meta block
     *
     * @since 1.0.0
     * @return string
     */
    public function get_the_meta($attributes, $content) {

        $defaults = [
            'author' => true,
            'date'   => true,
            'textColor' => false,
            'customTextColor' => false,
            'align' => false
        ];
        $attributes = wp_parse_args($attributes, $defaults);
        $styles = ( $attributes['customTextColor'] ) ? sprintf('color: %s', $attributes['customTextColor']) : '';
        $classes = 'taproot-meta wp-block--taproot-meta';

        if( $attributes['textColor'] ) {
            $classes .= sprintf(' has-%s-color', $attributes['textColor']);
        }

        if( $attributes['align'] ) {
            $classes .= sprintf(' has-text-align-%s', $attributes['align']);
        }

        // Open element
        $content = sprintf('<p class="%s" style="%s">', $classes, $styles );

        // Display Author
        if( $attributes['author'] !== false ) {
            global $post;
            $author_id = $post->post_author;
            $author_icon = \Taproot\Template\Icons\location( 'author', ['icon' => 'user'] );
            $author_name = sprintf('<span class="taproot-meta__item__content">%s</span>', get_the_author_meta('display_name', $author_id) );
            $content .= sprintf('<span class="taproot-meta__item taproot-meta__item--author">%s %s</span>', $author_icon, $author_name);
        }

        // Display Date
        if( $attributes['date'] !== false ) {
            $date_icon = \Taproot\Template\Icons\location( 'date', ['icon' => 'calendar'] );
            $content .= \Hybrid\Post\render_date([
                'class' => 'taproot-meta__item__content',
                'before' => '<span class="taproot-meta__item taproot-meta__item--date ">' . $date_icon,
                'after' => '</span>'
            ]);
        }

        // Display Taxonomies
        $taxonomies = ( isset($attributes['taxonomies']) && !empty($attributes['taxonomies']) ) ? $attributes['taxonomies'] : [];
        foreach( $taxonomies as $taxonomy ) {

            $icon = ( is_taxonomy_hierarchical( $taxonomy ) ) ?
                \Taproot\Template\Icons\location( 'categories', ['icon' => 'list-ul'] ) :
                \Taproot\Template\Icons\location( 'tags', ['icon' => 'tags'] );

            $content .= \Hybrid\Post\render_terms([
                'taxonomy' => $taxonomy,
                'before' => sprintf( '<span class=" taproot-meta__item taproot-meta__item--%s">%s', $taxonomy, $icon ),
                'after' => '</span>',
                'class' => sprintf( 'taproot-meta__terms taproot-meta__terms--%s', $taxonomy)
            ]);
        }

        // Close element
        $content .= '</p>';

        // Return the meta block content
        return $content;
    }

}
