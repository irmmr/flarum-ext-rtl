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

#### ignore

With the "ignore" command, you can make it so that your desired selector does not change at all.

```css
b { margin-right: 5px; }

/*rtl:ignore*/
a {
    float: left;
    color: red;
}
```
Output:
```css
b {margin-left: 5px;}
a {float: left;color: red;}
```

#### remove

The selector can be generally removed in the RTL version.

```css
b { margin-right: 5px; }

/*rtl:remove*/
a {
    float: left;
    color: red;
}
```
Output:
```css
b {margin-left: 5px;}
```

#### rename

You can change a selector in the RTL version.

```css
b { margin-right: 5px; }

/*rtl:rename:ul li*/
a {
    float: left;
    color: red;
}
```
Output:
```css
b {margin-left: 5px;}
ul li {float: right;color: red;}
```


#### raw

With the raw command, you can add a series of rules to the current CSS selector.

```css
b { margin-right: 5px; }

/*rtl:raw:
    padding: 6px;
    font-size: 15px;
*/
a {
    float: left;
    color: red;
}
```
Output:
```css
b {margin-left: 5px;}
a {float: right;color: red;padding: 6px;font-size: 15px;}
```

> You can also use all commands simultaneously.

```css
b { margin-right: 5px; }

/*rtl:rename:.app .drawer*/
/*rtl:ignore*/
/*rtl:raw:
    padding: 6px;
    font-size: 15px;
*/
a {
    float: left;
    color: red;
}
```
Output:
```css
b { margin-left: 5px; }
.app .drawer {float: left;color: red;padding: 6px;font-size: 15px;}
```
