<?php

namespace WPBase;

class ThemeSettings
{

    public function __construct()
    {

        // Add Theme Supports
        add_theme_support('post-thumbnails');
        add_theme_support('html5', ['comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script']);
        add_theme_support('custom-logo');
        add_theme_support('responsive-embeds');

        // Theme Translations
        add_action('after_setup_theme', [$this, 'themeTranslations']);
    }

    ##############################
    #
    # Theme Translations
    #
    ##############################

    public function themeTranslations(): void
    {
        load_theme_textdomain('wpbase', get_template_directory() . '/languages');
    }
}
