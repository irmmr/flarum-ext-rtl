module.exports=function(e){var o={};function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)t.d(n,r,function(o){return e[o]}.bind(null,r));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=6)}([,function(e,o){e.exports=flarum.core.compat.app},function(e,o){e.exports=flarum.core.compat["components/DiscussionListPane"]},function(e,o){e.exports=flarum.core.compat["components/DiscussionPage"]},function(e,o){e.exports=flarum.core.compat.extend},function(e,o){e.exports=flarum.core.compat["common/components/Navigation"]},function(e,o,t){"use strict";t.r(o);var n=t(1),r=t.n(n),c=t(2),i=t.n(c),u=t(3),a=t.n(u),s=function(e){var o=95*document.body.offsetWidth/100;e.pageX>=o&&r.a.pane.show()},f=t(4),p=t(5),l=t.n(p);r.a.initializers.add("irmmr-flarum-rtl-ext",(function(){"rtl"===document.dir&&(i.a.prototype.onremove=function(e){r.a.cache.discussionListPaneScrollTop=$(e.dom).scrollTop(),$(document).off("mousemove",s)},i.a.prototype.oncreate=function(e){var o=$(e.dom),t=r.a.pane;if(o.hover(t.show.bind(t),t.onmouseleave.bind(t)),$(document).on("mousemove",s),r.a.previous.matches(a.a)){var n=r.a.cache.discussionListPaneScrollTop||0;o.scrollTop(n)}else{var c=o.find(".DiscussionListItem.active");if(c.length){var i=o.offset().top,u=i+o.outerHeight(),f=c.offset().top,p=f+c.outerHeight();(f<i||p>u)&&o.scrollTop(o.scrollTop()-i+f)}}},Object(f.extend)(l.a.prototype,"getBackButton",(function(e){e.attrs&&(e.attrs.icon="fas fa-chevron-right")})))}))}]);
//# sourceMappingURL=forum.js.map