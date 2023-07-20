<?php

require_once(dirname(__DIR__, 4) . '/vendor/autoload.php');

// Initialize Timber.
new Timber\Timber();

new WPBase\Optimizations();
new WPBase\Security();
new WPBase\ThemeSettings();
new WPBase\CustomPostTypes();
