module.exports=function(t){var r={};function e(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var a in t)e.d(n,a,function(r){return t[r]}.bind(null,a));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=7)}({0:function(t,r){t.exports=flarum.core.compat["admin/app"]},7:function(t,r,e){"use strict";e.r(r);var n=e(0),a=e.n(n);a.a.initializers.add("irmmr-flarum-rtl-adm",(function(){a.a.extensionData.for("irmmr-rtl").registerSetting({setting:"irmmr-rtl.lang_base",label:a.a.translator.trans("irmmr-rtl.admin.settings.lang_base_label"),type:"boolean",help:a.a.translator.trans("irmmr-rtl.admin.settings.lang_base_text")}).registerSetting({setting:"irmmr-rtl.fm_status",label:a.a.translator.trans("irmmr-rtl.admin.settings.fm_status_label"),type:"boolean",help:a.a.translator.trans("irmmr-rtl.admin.settings.fm_status_text")}).registerSetting({setting:"irmmr-rtl.ad_status",label:a.a.translator.trans("irmmr-rtl.admin.settings.ad_status_label"),type:"boolean",help:a.a.translator.trans("irmmr-rtl.admin.settings.ad_status_text")})}))}});
//# sourceMappingURL=admin.js.map