<?php

require_once(dirname(__DIR__, 4) . '/vendor/autoload.php');

// Initialize Timber.
new Timber\Timber();

new JehanDev\Optimizations();
new JehanDev\Security();
new JehanDev\ThemeSettings();
new JehanDev\CustomPostTypes();