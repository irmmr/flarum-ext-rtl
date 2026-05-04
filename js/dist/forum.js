/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/changeNavigationBackBtn.js"
/*!***********************************************!*\
  !*** ./src/common/changeNavigationBackBtn.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_Navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Navigation */ "flarum/common/components/Navigation");
/* harmony import */ var flarum_common_components_Navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Navigation__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_common_components_Navigation__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'getBackButton', function (vdom) {
    if (vdom.attrs) {
      vdom.attrs.icon = 'fas fa-chevron-right';
    }
  });
}

/***/ },

/***/ "./src/common/extendTooltip.js"
/*!*************************************!*\
  !*** ./src/common/extendTooltip.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/components/Tooltip */ "flarum/common/components/Tooltip");
/* harmony import */ var flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_0___default().prototype), 'view', function () {
    const attrs = this.attrs;
    if (!attrs || attrs['data-rtl-flipped']) return;
    if (attrs.position === 'left') {
      attrs.position = 'right';
    } else if (attrs.position === 'right') {
      attrs.position = 'left';
    }
    attrs['data-rtl-flipped'] = true;
  });
}

/***/ },

/***/ "./src/forum/changePaneShowX.js"
/*!**************************************!*\
  !*** ./src/forum/changePaneShowX.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_components_DiscussionListPane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/DiscussionListPane */ "flarum/forum/components/DiscussionListPane");
/* harmony import */ var flarum_forum_components_DiscussionListPane__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_DiscussionListPane__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/DiscussionPage */ "flarum/forum/components/DiscussionPage");
/* harmony import */ var flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__);




/*
 * see here: https://github.com/flarum/core/blob/master/js/src/forum/components/DiscussionListPane.js
 */

/**
 * new version of hotEdge
 * @param e
 */
const hotEdgeRtl = e => {
  let width = document.body.offsetWidth;
  let fip = width * 95 / 100;
  let ex = e.pageX;
  if (ex >= fip) {
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().pane.show();
  }
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  /**
   * @param vnode
   */
  (flarum_forum_components_DiscussionListPane__WEBPACK_IMPORTED_MODULE_1___default().prototype).onremove = vnode => {
    (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().cache).discussionListPaneScrollTop = $(vnode.dom).scrollTop();
    $(document).off('mousemove', hotEdgeRtl);
  };

  /**
   * @param vnode
   */
  (flarum_forum_components_DiscussionListPane__WEBPACK_IMPORTED_MODULE_1___default().prototype).oncreate = vnode => {
    const $list = $(vnode.dom);
    const pane = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().pane);
    $list.hover(pane.show.bind(pane), pane.onmouseleave.bind(pane));
    $(document).on('mousemove', hotEdgeRtl);
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().previous.matches((flarum_forum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default()))) {
      const top = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().cache).discussionListPaneScrollTop || 0;
      $list.scrollTop(top);
    } else {
      const $discussion = $list.find('.DiscussionListItem.active');
      if ($discussion.length) {
        const listTop = $list.offset().top;
        const listBottom = listTop + $list.outerHeight();
        const discussionTop = $discussion.offset().top;
        const discussionBottom = discussionTop + $discussion.outerHeight();
        if (discussionTop < listTop || discussionBottom > listBottom) {
          $list.scrollTop($list.scrollTop() - listTop + discussionTop);
        }
      }
    }
  };
}

/***/ },

/***/ "./src/forum/index.js"
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _changePaneShowX__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changePaneShowX */ "./src/forum/changePaneShowX.js");
/* harmony import */ var _common_changeNavigationBackBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/changeNavigationBackBtn */ "./src/common/changeNavigationBackBtn.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_extendTooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/extendTooltip */ "./src/common/extendTooltip.js");




flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().initializers.add('irmmr-rtl', () => {
  if (document.dir === 'rtl') {
    (0,_changePaneShowX__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_common_changeNavigationBackBtn__WEBPACK_IMPORTED_MODULE_1__["default"])();
    // extendDiscussionListItem();
    (0,_common_extendTooltip__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
});

/***/ },

/***/ "flarum/common/components/Navigation"
/*!*************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Navigation')" ***!
  \*************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Navigation');

/***/ },

/***/ "flarum/common/components/Tooltip"
/*!**********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Tooltip')" ***!
  \**********************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Tooltip');

/***/ },

/***/ "flarum/common/extend"
/*!**********************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extend')" ***!
  \**********************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/extend');

/***/ },

/***/ "flarum/forum/app"
/*!******************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/app')" ***!
  \******************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'forum/app');

/***/ },

/***/ "flarum/forum/components/DiscussionListPane"
/*!********************************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/components/DiscussionListPane')" ***!
  \********************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'forum/components/DiscussionListPane');

/***/ },

/***/ "flarum/forum/components/DiscussionPage"
/*!****************************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/components/DiscussionPage')" ***!
  \****************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'forum/components/DiscussionPage');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		flarum.reg._webpack_runtimes["irmmr-rtl"] ||= __webpack_require__;// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map