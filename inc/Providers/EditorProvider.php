<?php
/**
 * Editor service provider.
 *
 * Service providers are essentially the bootstrapping code for your theme.
 * They allow you to add bindings to the container on registration
 * and boot them once everything has been registered.
 *
 * @package   Taproot
 * @author    Sky Shabatura <theme@sky.camp>
 * @copyright 2019 Sky Shabatura
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://taproot-theme.com
 */


namespace TaprootPlugin\Providers;

use Hybrid\Tools\ServiceProvider;
use TaprootPlugin\Editor\Editor;


/**
 * Editor service provider.
 *
 * @since  1.0.0
 * @access public
 */
class EditorProvider extends ServiceProvider {


    /**
     * Register classes and bind to the container
     *
     * @since  1.0.0
     * @access public
     * @return void
     */
    public function register() {

        $this->app->singleton( Editor::class );

    }


    /**
     * Boot Class Instances
     *
     * @since  1.0.0
     * @access public
     * @return void
     */
    public function boot() {

        $this->app->resolve( Editor::class )->boot();

    }

}
