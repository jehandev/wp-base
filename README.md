# WP-Base - jehan.dev

## Installation

1. `git clone git@github.com:jehandev/wp-base.git`
2. `cd` into the project
3. `composer install`
4. `npm install`
5. `cp .env.example .env` and enter your variables in this new file :
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_HOST`
  - `WP_ENV` (`development`, `staging` or `production`)
  - `WP_HOME`
  - `WP_SITEURL`
6. Generate Salts with [Roots App](https://roots.io/salts.html) and copy/paste them in `.env`
7. Activate all Plugins : `wp plugin activate --all`
8. Remove every default posts, comments, pages : `wp site empty`

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
- Remove Dashicons on frontend if user is not admin

### Security
- Remove Pingback
- Disable XML-RPC
- Hide WordPress Version
- Remove Unnecessary Header Infos

### Theme Settings
- Supports : `post-thumbnails`, `html5`, `custom-logo`, `responsive-embeds`
- Text domain for translations : `wpbase`

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

### Task Runner : Laravel Mix

- Use `mix` or `mix watch` to compile assets for development
- Use `mix --production` to compile assets for production

#### Details & features
`@Todo : providing a way to import files from node_modules in css`
- PostCSS must be located in the `assets/postcss` of the `wp-base-child` folder
- JavaScript must be located in the `assets/js` of the `wp-base-child` folder
- Images are processed in the `assets/js` of the `wp-base-child` folder and optimized with `imagemin`, `imagemin-mozjpeg`, `imagemin-pngquant`, `imagemin-svgo`, `imagemin-webp` and `imagemin-gifsicle`
- Fonts are copied from the `assets/fonts` to the `dist/fonts` folder

### Pre-bundled frameworks
- TailwindCSS

### Linters

These linters are applied when processing files with Laravel Mix.

#### Eslint Rules

`@help-needed : probably far from being perfect and way too permissive I think`

```
{
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules" : {
        "camelcase": 1,
        "comma-dangle": 2,
        "quotes": 0
    }
}
```

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
