# WP-Base - jehan.dev

## Installation

1. composer install
2. Enter Variables in `.env`
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_HOST`
  - `WP_ENV` (`development`, `staging` or `production`)
  - `WP_HOME`
  - `WP_SITEURL`
3. Generate Salts with [Roots App](https://roots.io/salts.html) and copy/paste them in `.env`
4. Activate all Plugins : `wp plugin activate --all`
5. Remove every default posts, comments, pages : `wp site empty`

## Features

### Base
- Bedrock
- Timber (Twig)

### Optimizations
- Remove WordPress Emojicons
- Disable Auto Paragraphs
- Add slug in body class
- Set Image Meta on Upload (Title / Description / Alt)
- Disable Comments
- Disable email verification
- Remove jQuery Migrate
- Remove Core, Yoast and WordFence dashboard widgets
- Allow SVG Uploads
- Remove Contact Form 7 scripts and styles if no CF7 shortcode in the content

### Security
- Remove Pingback
- Disable XML-RPC
- Hide WordPress Version
- Remove Unnecessary Header Infos

### Theme Settings
- Supports : `post-thumbnails`, `html5`, `custom-logo`, `responsive-embeds`
- Text domain for translations : `jehandev`

### Helpers
- Use [jjgrainger/posttypes](https://posttypes.jjgrainger.co.uk/) for easy OOP Custom Post Types creation without plugin

### Plugins :
- Contact Form 7
- Ewww Image Optimizer
- Query Monitor
- Regenerate Thumbnails
- WordFence
- WP Mail SMTP
- WPS Hide Login
- Yoast SEO

### Linters

These linters are applied when processing files with Gulp.

#### Stylelint Rules

Generated with [Stylelint Config Generator](https://maximgatilin.github.io/stylelint-config/)

```
"indentation": 4,
"string-quotes": "single",
"no-duplicate-selectors": true,
"color-hex-case": "lower",
"color-hex-length": "long",
"color-named": "never",
"selector-no-qualifying-type": true,
"selector-combinator-space-after": "always",
"selector-attribute-quotes": "always",
"selector-attribute-operator-space-before": "never",
"selector-attribute-operator-space-after": "never",
"selector-attribute-brackets-space-inside": "never",
"declaration-block-trailing-semicolon": "never",
"declaration-colon-space-before": "never",
"declaration-colon-space-after": "always",
"property-no-vendor-prefix": true,
"value-no-vendor-prefix": true,
"number-leading-zero": "always",
"function-url-quotes": "never",
"font-weight-notation": "numeric",
"font-family-name-quotes": "always-where-recommended",
"comment-whitespace-inside": "always",
"comment-empty-line-before": "always",
"at-rule-no-vendor-prefix": true,
"rule-empty-line-before": "always",
"selector-pseudo-element-colon-notation": "double",
"selector-pseudo-class-parentheses-space-inside": "never",
"selector-no-vendor-prefix": true,
"media-feature-range-operator-space-before": "always",
"media-feature-range-operator-space-after": "always",
"media-feature-parentheses-space-inside": "never",
"media-feature-colon-space-before": "never",
"media-feature-colon-space-after": "always"
```