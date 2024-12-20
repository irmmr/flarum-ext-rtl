<p align="center">
    <a href="https://packagist.org/packages/irmmr/flarum-ext-rtl" target="_blank">
        <img src="https://img.shields.io/packagist/v/irmmr/flarum-ext-rtl?style=flat-square">
    </a>
    <a href="https://github.com/flarum/core" target="_blank">
        <img src="https://img.shields.io/badge/flarum%2Fcore-%5Ev1.1.1-blue?style=flat-square">
    </a>
    <img src="https://i.postimg.cc/0yfcq73t/Screenshot-2024-11-18-at-12-38-50-Flarum-Community.png">
</p>
<hr>

<center><h4>Flarum RTL extension</h4></center>

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
