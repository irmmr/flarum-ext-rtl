<p align="center">
    <a href="https://packagist.org/packages/irmmr/flarum-ext-rtl" target="_blank">
        <img src="https://img.shields.io/packagist/v/irmmr/flarum-ext-rtl?style=flat-square">
    </a>
    <a href="https://github.com/flarum/core" target="_blank">
        <img src="https://img.shields.io/badge/flarum%2Fcore-%5Ev2.0.0@rc.1-blue?style=flat-square">
    </a>
    <img src="https://i.postimg.cc/0yfcq73t/Screenshot-2024-11-18-at-12-38-50-Flarum-Community.png">
</p>

---

### Flarum RTL extension

This extension is for adding RTL support to Flarum. Unlike previous versions, you no longer need to write additional `LESS/CSS` for your forum.

This extension tries to change the directions from `LTR` to `RTL` as much as possible.
This project focuses on the Flarum core user interface and other known extensions.

### Install

Installation is like all flarum extensions.

```
composer require irmmr/flarum-ext-rtl
```

You can also use the latest changes.

```
composer require irmmr/flarum-ext-rtl:dev-main
```

### Update

```
composer update irmmr/flarum-ext-rtl
```

This plugin adds an RTL version alongside all compiled CSS files. While using this method has many advantages, it can also come with some issues. If you encounter a serious problem while using this plugin, you can visit the `issue` section.

### Commands

With a series of commands, you can control the generated codes for RTL (right-to-left). Essentially, each selector accepts a set of commands. Due to the lack of support for all types of comments in "sabberworm/php-css-parser," it is not possible to use commands as before.

Please see `rtl-css`


[https://github.com/irmmr/rtl-css](https://github.com/irmmr/rtl-css)

### Asset Mapping Rules

Asset Mapping Rules let you control how original `LTR` assets are converted to their `RTL` versions. This is useful when file names do not follow a simple convention, when assets come from a CDN, or when you want to manually define which `CSS` or `JS` file should be replaced.

Each rule contains:

- a **Pattern**
- a **Replace**
- a **Type** (`Auto`, `CSS`, or `JS`)

#### How it works

When the extension processes an asset, it checks the defined rules **from top to bottom**.  
The **first matching rule wins** and its replacement is used to build the RTL asset path.

This means:

- more specific rules should be placed **before** general ones
- exact file matches should usually come before wildcard rules like `*.css`
- once a rule matches, the remaining rules are ignored for that asset

#### Supported behavior

- **Wildcard matching** using `*`
- Matching against:
  - just the filename/path
  - or the full asset URL
- Type filtering:
  - `Auto` → applies regardless of file type
  - `CSS` → applies only to CSS assets
  - `JS` → applies only to JavaScript assets
- Preservation of the original:
  - query string, such as `?v=123`
  - fragment, such as `#theme`

If the replacement value is a full absolute URL, the extension uses it directly.

#### Configuration

You can define Asset Mapping Rules from the admin panel:

`Admin → Extensions → RTL → Asset Mapping Rules`

Each rule has the following fields:

##### Pattern
The original asset path or URL to match.

Examples:

- `*.css`
- `assets/vendor/*.js`
- `https://cdn.example.com/*.min.css`

##### Replace
The RTL version that should replace the matched asset.

Examples:

- `*.rtl.css`
- `rtl-*.js`
- `https://cdn.example.com/rtl/*.min.css`

##### Type
Controls which assets the rule applies to:

- `Auto`
- `CSS`
- `JS`

#### Examples

##### 1. Add `.rtl` before `.css`
If you want all CSS files to be replaced with an RTL version:

- **Pattern:** `*.css`
- **Replace:** `*.rtl.css`
- **Type:** `CSS`

Example:

- `forum.css` → `forum.rtl.css`

##### 2. Replace a specific CDN stylesheet
If a library provides a separate RTL file on a CDN:

- **Pattern:** `https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css`
- **Replace:** `https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.rtl.min.css`
- **Type:** `CSS`

##### 3. Rewrite JavaScript asset names
If your build process creates mirrored JS file names:

- **Pattern:** `assets/*.js`
- **Replace:** `assets/rtl-*.js`
- **Type:** `JS`

Example:

- `assets/app.js` → `assets/rtl-app.js`

##### 4. Use a generic rule for mixed assets
If you want a rule to apply regardless of extension:

- **Pattern:** `theme-*`
- **Replace:** `rtl-theme-*`
- **Type:** `Auto`

#### Important notes

- Rules are processed in order, and **the first match wins**
- Put **specific rules before generic rules**
- After changing rules, you should **clear the Flarum cache**
- These rules affect how payload assets and mapped RTL resources are resolved
- Incorrect patterns may prevent the correct RTL asset from loading

> [!NOTE]
> **Important behavior when using the `rtlcss` driver**
>
> If the RTL driver is set to `rtlcss`, asset mapping rules are only used when a compiled RTL version of the requested file is **not already available**.  
> If the extension can already resolve and return the compiled RTL asset directly, that compiled file will be used first and the mapping rules will not override it.
>
> In other words:
>
> - if a compiled RTL version exists, it is returned directly
> - if no compiled RTL version exists, the extension tries the asset mapping rules
>
> Also, be careful when creating mapping rules for Flarum’s core JavaScript files.  
> If you are not fully sure what you are doing, it is strongly recommended **not** to add rules for core `JS` assets. A wrong rule may make the admin panel fail to load because the required JavaScript files can no longer be resolved correctly.
