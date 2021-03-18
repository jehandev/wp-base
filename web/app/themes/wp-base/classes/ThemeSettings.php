<?php

namespace WPBase;

class ThemeSettings {

    public function __construct() {

        // Add Theme Supports
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'html5' );
        add_theme_support( 'custom-logo' );
        add_theme_support( 'responsive-embeds' );

        // Theme Translations
        add_action( 'after_setup_theme', [$this, 'ThemeTranslations'] );

    }

    ##############################
    #
    # Theme Translations
    #
    ##############################

    public function ThemeTranslations(){
        load_theme_textdomain( 'wpbase', get_template_directory() . '/languages' );
    }

}