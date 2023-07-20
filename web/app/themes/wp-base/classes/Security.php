<?php

namespace WPBase;

class Security
{

    public function __construct()
    {

        // Disable Pingback
        add_filter('wp_headers', array( $this, 'RemovePingback'));

        // Disable XML-RPC
        add_filter('wp_xmlrpc_server_class', array( $this, '__return_false'));
        add_filter('xmlrpc_enabled', array( $this, '__return_false'));

        // Hide WordPress version
        add_filter('the_generator', array( $this, 'HideWordPressVersion'));
        add_filter('style_loader_src', array( $this, 'RemoveWordPressVersionSuffix'), 9999);
        add_filter('script_loader_src', array( $this, 'RemoveWordPressVersionSuffix'), 9999);

        // Remove unnecessary header infos
        add_action('init', array( $this, 'RemoveHeaderInfo'));
    }

    ##############################
    #
    # Remove Pingback
    #
    ##############################

    public function RemovePingback($headers)
    {
        unset($headers['X-Pingback']);
        return $headers;
    }

    
    ##############################
    #
    # Hide WordPress Version
    #
    ##############################

    public function HideWordPressVersion()
    {
        return '';
    }

    public function RemoveWordPressVersionSuffix($src)
    {
        if (strpos($src, 'ver=')) {
            $src = remove_query_arg('ver', $src);
        }
        return $src;
    }

    ##############################
    #
    # Remove Unnecessary Header Infos
    #
    ##############################

    public function RemoveHeaderInfo()
    {
        remove_action('wp_head', 'feed_links_extra', 3);
        remove_action('wp_head', 'rsd_link');
        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'start_post_rel_link');
        remove_action('wp_head', 'index_rel_link');
        remove_action('wp_head', 'parent_post_rel_link', 10, 0);
        remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0); // for WordPress >= 3.0
    }
}
