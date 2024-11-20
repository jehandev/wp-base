<?php

namespace WPBase;

class Optimizations
{

    public function __construct()
    {

        // Remove WordPress Emojicons
        add_action('init', array( $this, 'disableWordPressEmojicons'));

        // Disable Auto Paragraphs
        add_filter('the_content', array( $this, 'disableAutoParagraphs'), 0);
        add_filter('wpcf7_autop_or_not', '__return_false');

        // Add slug in body class
        add_filter('body_class', array( $this, 'addPageSlugInBodyClass'));

        // Set Image Meta on Upload (Title / Description / Alt)
        add_action('add_attachment', array( $this, 'setImageMetaOnUpload'));

        // Disable Comments
        add_action('admin_init', [$this, 'disableComments']);
        add_action('admin_menu', [$this, 'removeCommentMenu']);
        add_action('init', [$this, 'removeCommentLinkAdminBar']);
        add_action('init', [$this, 'deregisterCommentJS']);
        add_filter('comments_open', '__return_false', 20, 2);
        add_filter('pings_open', '__return_false', 20, 2);
        add_filter('comments_array', '__return_empty_array', 10, 2);

        // Disable email verification
        add_filter('admin_email_check_interval', '__return_zero');

        // Remove jQuery Migrate
        add_filter('wp_default_scripts', [$this, 'removeJqueryMigrate']);

        // Allow SVG Uploads
        add_filter('upload_mimes', [$this, 'allowSvgUploads']);

        // Remove Contact Form 7 scripts and styles if no shortcode in the page
        add_action('wp_enqueue_scripts', [$this, 'removeContactForm7Scripts']);

        // Remove Dashicons on frontend if user is not admin
        add_action('wp_enqueue_scripts', [$this, 'removeDashicons']);
    }

    ##############################
    #
    # Remove WordPress Emojicons
    #
    ##############################

    public function disableWordPressEmojiconsTinyMCE($plugins): array
    {
        if (is_array($plugins)) {
            return array_diff($plugins, array( 'wpemoji' ));
        } else {
            return array();
        }
    }

    public function disableWordPressEmojicons(): void
    {

        // all actions related to emojis
        remove_action('admin_print_styles', 'print_emoji_styles');
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
        remove_filter('the_content_feed', 'wp_staticize_emoji');
        remove_filter('comment_text_rss', 'wp_staticize_emoji');

        // filter to remove TinyMCE emojis
        add_filter('tiny_mce_plugins', [$this, 'disableWordPressEmojiconsTinyMCE']);

        // Remove Dashboard Widgets
        add_action('wp_dashboard_setup', [$this, 'removeDashboardWidgets']);
    }

    ##############################
    #
    # Disable Auto Paragraphs
    #
    ##############################

    public function disableAutoParagraphs($content)
    {

        if (is_singular('page')) {
            remove_filter('the_content', 'wpautop');
            remove_filter('the_excerpt', 'wpautop');
        }
        return $content;
    }

    ##############################
    #
    # Add slug in body class
    #
    ##############################

    public function addPageSlugInBodyClass($classes)
    {

        if (is_singular('page')) {
            global $post;
            $classes[] = 'page-' . $post->post_name;
        }

        return $classes;
    }

    ##############################
    #
    # Set Image Meta on Upload (Title / Description / Alt)
    #
    ##############################

    public function setImageMetaOnUpload($post_ID): void
    {

        if (wp_attachment_is_image($post_ID)) {
            $ImageTitle = get_post($post_ID)->post_title;

            // Sanitize the title: remove hyphens, underscores & extra
            $ImageTitle = preg_replace('%\s*[-_\s]+\s*%', ' ', $ImageTitle);

            // Sanitize the title: capitalize first letter of every word
            $ImageTitle = ucwords(strtolower($ImageTitle));

            // Create an array with the image meta (Title, Description) to be updated
            $ImageMeta = array(
                // Specify the image (ID) to be updated
                'ID' => $post_ID,
                // Set image Title to sanitized title
                'post_title' => $ImageTitle,
                // Set image Description (Content) to sanitized title
                'post_content' => $ImageTitle,
            );

            // Set the image Alt-Text
            update_post_meta($post_ID, '_wp_attachment_image_alt', $ImageTitle);

            // Set the image meta
            wp_update_post($ImageMeta);
        }
    }

    ##############################
    #
    # Disable Comments
    #
    ##############################

    public function disableComments(): void
    {

        global $pagenow;

        if ($pagenow === 'edit-comments.php') {
            wp_redirect(admin_url());
            exit;
        }

        // Remove comments metabox from dashboard
        remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

        // Disable support for comments and trackbacks in post types
        foreach (get_post_types() as $post_type) {
            if (post_type_supports($post_type, 'comments')) {
                remove_post_type_support($post_type, 'comments');
                remove_post_type_support($post_type, 'trackbacks');
            }
        }
    }

    public function removeCommentMenu(): void
    {
        remove_menu_page('edit-comments.php');
    }

    public function removeCommentLinkAdminBar(): void
    {
        if (is_admin_bar_showing()) {
            remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
        }
    }

    public function deregisterCommentJS(): void
    {
        wp_deregister_script('comment-reply');
    }

    ##############################
    #
    # Remove jQuery Migrate
    #
    ##############################

    public function removeJqueryMigrate($scripts): void
    {
        if (isset($scripts->registered['jquery'])) :
            $script = $scripts->registered['jquery'];

            if ($script->deps) :
                $script->deps = array_diff($script->deps, array( 'jquery-migrate' ));
            endif;
        endif;
    }

    ##############################
    #
    # Remove Dashboard Widgets (WP Core + Plugins Pre-Installed with wp-base)
    #
    ##############################

    public function removeDashboardWidgets(): void
    {

        // Welcome Panel
        remove_action('welcome_panel', 'wp_welcome_panel');

        // Core
        remove_meta_box('dashboard_primary', 'dashboard', 'side');
        remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
        remove_meta_box('dashboard_activity', 'dashboard', 'normal');

        // Yoast
        remove_meta_box('wpseo-dashboard-overview', 'dashboard', 'side');

        // WordFence
        remove_meta_box('wordfence_activity_report_widget', 'dashboard', 'normal');
    }

    ##############################
    #
    # Allow SVG Uploads
    #
    ##############################
    public function allowSvgUploads($mimes)
    {

        $mimes['svg']  = 'image/svg+xml';
        $mimes['svgz'] = 'image/svg+xml';

        return $mimes;
    }

    ##############################
    #
    # Remove Contact Form 7 scripts and styles if no shortcode
    #
    ##############################
    public function removeContactForm7Scripts(): void
    {
        global $post;

        if (is_object($post) && has_shortcode($post->post_content, 'contact-form-7')) :
            wp_enqueue_script('contact-form-7');
            wp_enqueue_style('contact-form-7');
        else :
            wp_dequeue_script('contact-form-7');
            wp_dequeue_style('contact-form-7');
        endif;
    }

    ##############################
    #
    # Remove Dashicons on frontend for non-admin visitors
    #
    ##############################
    public function removeDashicons(): void
    {
        if (current_user_can('update_core')) {
            return;
        }
        wp_deregister_style('dashicons');
    }
}
