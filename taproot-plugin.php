<?php
/**
 * Plugin Name: Taproot Plugin
 * Plugin URI:  https://taproot-theme.com
 * Description: This plugin adds functionality to the Taproot theme.
 * Version:     1.0.0
 * Author:      Sky Shabatura
 * Author URI:  https://taproot-theme.com
 * Text Domain: taproot-plugin
 * Domain Path: /lang
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU
 * General Public License as published by the Free Software Foundation; either version 2 of the License,
 * or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU General Public License along with this program; if not,
 * write to the Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 * @package   Taproot
 * @version   1.0.0
 * @author    Sky Shabatura <plugin@sky.camp>
 * @copyright Copyright (c) 2019, Sky Shabatura
 * @link      https://taproot-theme.com
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */


namespace TaprootPlugin;


/**
 * Singleton class for setting up the plugin.
 *
 * @since  1.0.0
 * @access public
 */
class TaprootPlugin {

	/**
	 * Minimum required PHP version.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	private $php_version = '5.6.0';

	/**
	 * Plugin directory path.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $dir = '';

	/**
	 * Plugin directory URI.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $uri = '';


	/**
	 * Returns the instance.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new self;
			$instance->setup();
		}

		return $instance;
	}

	/**
	 * Constructor method.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function __construct() {}


	/**
	 * Sets up globals.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function setup() {

		// Check if we meet the minimum PHP version.
		if ( version_compare( PHP_VERSION, $this->php_version, '<' ) ) {

			// Add admin notice.
			add_action( 'admin_notices', array( $this, 'php_admin_notice' ) );

			// Bail.
			return;
		}

		// Main plugin directory path and URI.
		$this->dir  = trailingslashit( plugin_dir_path( __FILE__ ) );
        $this->uri  = trailingslashit( plugin_dir_url(  __FILE__ ) );

		// Internationalize the text strings used.
		add_action( 'plugins_loaded', [$this, 'i18n'], 2 );

		// Register activation hook.
        register_activation_hook( __FILE__, [$this, 'activation'] );

        // boot the plugin when theme is ready
        add_action( 'taproot/bootstrap', [$this, 'boot'] );
	}



	/**
	 * Loads the translation files.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function i18n() {

		load_plugin_textdomain( 'taproot-plugin', false, trailingslashit( dirname( plugin_basename( __FILE__ ) ) ) . 'lang' );
	}

	/**
	 * Method that runs only when the plugin is activated.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function activation() {

		// Check PHP version requirements.
		if ( version_compare( PHP_VERSION, $this->php_version, '<' ) ) {

			// Make sure the plugin is deactivated.
			deactivate_plugins( plugin_basename( __FILE__ ) );

			// Add an error message and die.
			wp_die( $this->get_min_php_message() );
		}
	}


	/**
	 * Load required files
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function includes() {

        array_map( function( $file ) {
            require_once( $this->dir . "inc/{$file}.php" );
        }, [
            'Editor/Editor',
            'Template/Template',
            'Providers/EditorProvider',
            'Providers/TemplateProvider',
        ]);
    }


	/**
	 * Initiates plugin at theme hook
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	public function boot( $taproot ) {

        // load required files
        $this->includes();

        // register providers
        $taproot->provider( \TaprootPlugin\Providers\EditorProvider::class );
        $taproot->provider( \TaprootPlugin\Providers\TemplateProvider::class );
	}


	/**
	 * Returns a message noting the minimum version of PHP required.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function get_min_php_message() {

		return sprintf(
			__( 'Taproot requires PHP version %1$s. You are running version %2$s. Please upgrade and try again.', 'taproot-plugin' ),
			$this->php_version,
			PHP_VERSION
		);
	}

	/**
	 * Outputs the admin notice that the user needs to upgrade their PHP version. It also
	 * auto-deactivates the plugin.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function php_admin_notice() {

		// Output notice.
		printf(
			'<div class="notice notice-error is-dismissible"><p><strong>%s</strong></p></div>',
			esc_html( $this->get_min_php_message() )
		);

		// Make sure the plugin is deactivated.
		deactivate_plugins( plugin_basename( __FILE__ ) );
	}
}

/**
 * Gets the instance of the `Taproot_Plugin` class.
 *
 * @since  1.0.0
 * @access public
 * @return object
 */
function taproot_plugin() {
	return TaprootPlugin::get_instance();
}

taproot_plugin();