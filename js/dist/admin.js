/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/components/SettingsPage.tsx"
/*!***********************************************!*\
  !*** ./src/admin/components/SettingsPage.tsx ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RtlSettingsPage)
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Form */ "flarum/common/components/Form");
/* harmony import */ var flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_admin_components_FormSection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/admin/components/FormSection */ "flarum/admin/components/FormSection");
/* harmony import */ var flarum_admin_components_FormSection__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_FormSection__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_admin_components_FormSectionGroup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/admin/components/FormSectionGroup */ "flarum/admin/components/FormSectionGroup");
/* harmony import */ var flarum_admin_components_FormSectionGroup__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_FormSectionGroup__WEBPACK_IMPORTED_MODULE_7__);








function convertToList(raw) {
  if (!raw) {
    return [];
  }
  if (typeof raw === 'string') {
    return JSON.parse(raw);
  }
  return raw;
}
class RtlSettingsPage extends (flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default()) {
  oninit(vnode) {
    super.oninit(vnode);
    this.forcedRefreshKey = 0;
    this.loading = false;
    const rules = this.setting('irmmr-rtl.asset_rules')();
    this.rules = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2___default()(convertToList(rules));
    const payloads = this.setting('irmmr-rtl.payloads')();
    this.payloads = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_2___default()(convertToList(payloads));
  }
  addRule() {
    const rule = {
      pattern: '',
      replace: '',
      type: 'css'
    };
    this.rules([...this.rules(), rule]);
  }
  removeRule(index) {
    const rules = [...this.rules()];
    rules.splice(index, 1);
    this.rules(rules);
    this.updateAssetRulesSettings();
  }
  addPayload() {
    this.payloads([...this.payloads(), '']);
  }
  removePayload(index) {
    const payloads = [...this.payloads()];
    payloads.splice(index, 1);
    this.payloads(payloads);
    this.updatePayloadsSettings();
  }
  updateRule(index, field, value) {
    const rules = [...this.rules()];
    rules[index][field.trim()] = value.trim();
    this.rules(rules);
    this.updateAssetRulesSettings();
  }
  updatePayload(index, value) {
    const payloads = [...this.payloads()];
    payloads[index] = value.trim();
    this.payloads(payloads);
    this.updatePayloadsSettings();
  }
  updateAssetRulesSettings() {
    const rules = this.rules().filter(i => i.pattern.trim() !== '' && i.replace.trim() !== '' && ['css', 'js', 'auto'].includes(i.type));
    this.setting('irmmr-rtl.asset_rules')(JSON.stringify(rules));
  }
  updatePayloadsSettings() {
    const payloads = this.payloads().filter(i => i !== '');
    this.setting('irmmr-rtl.payloads')(JSON.stringify(payloads));
  }
  content() {
    return m("div", {
      className: "RtlSettings-page"
    }, m("div", {
      className: "container",
      key: this.forcedRefreshKey
    }, m((flarum_common_components_Form__WEBPACK_IMPORTED_MODULE_3___default()), null, this.buildSettingComponent({
      type: 'boolean',
      setting: 'irmmr-rtl.lang_base',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.lang_base_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.lang_base_text')
    }), this.buildSettingComponent({
      type: 'boolean',
      setting: 'irmmr-rtl.fm_status',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.fm_status_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.fm_status_text')
    }), this.buildSettingComponent({
      type: 'boolean',
      setting: 'irmmr-rtl.ad_status',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.ad_status_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.ad_status_text')
    }), this.buildSettingComponent({
      type: 'boolean',
      setting: 'irmmr-rtl.css_minify',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.minify_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.minify_text')
    }), this.buildSettingComponent({
      type: 'select',
      setting: 'irmmr-rtl.driver',
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.driver_label'),
      help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.driver_text'),
      options: {
        rtlcss: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.driver_options.rtlcss'),
        custom: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.driver_options.custom')
      }
    })), m("hr", null), m((flarum_admin_components_FormSectionGroup__WEBPACK_IMPORTED_MODULE_7___default()), {
      className: "RtlSectionGroup"
    }, m((flarum_admin_components_FormSection__WEBPACK_IMPORTED_MODULE_6___default()), {
      className: "RtlGroup",
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.mappings.section_title')
    }, m("div", {
      className: "RtlList"
    }, this.rules().length ? this.rules().map((rule, i) => m("div", {
      className: "AssetRuleItem",
      key: i
    }, m("input", {
      className: "FormControl AssetRuleItem-pattern ForceLtrField",
      placeholder: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.mappings.pattern_placeholder'),
      value: rule.pattern,
      onchange: e => this.updateRule(i, 'pattern', e.target.value)
    }), m("input", {
      className: "FormControl AssetRuleItem-replace ForceLtrField",
      placeholder: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.mappings.replace_placeholder'),
      value: rule.replace,
      onchange: e => this.updateRule(i, 'replace', e.target.value)
    }), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_4___default()), {
      className: "AssetRuleItem-type",
      value: rule.type || 'css',
      onchange: selected => this.updateRule(i, 'type', selected),
      options: {
        auto: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.mappings.type_options.auto'),
        css: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.mappings.type_options.css'),
        js: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.mappings.type_options.js')
      }
    }), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      icon: "fas fa-times",
      onclick: () => this.removeRule(i),
      className: "Button Button--icon Button--danger AssetRuleItem-remove"
    }))) : m("p", {
      className: "RtlList-empty"
    }, m("i", {
      className: "fa-solid fa-diagram-project"
    }), m("span", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.mappings.empty_text')))), m("div", {
      className: "Form-controls"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "Button RtlList-button",
      icon: "fas fa-plus",
      onclick: () => this.addRule()
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.mappings.add_button'))), m("div", {
      className: "RtlGroupText helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.mappings.help_text'))), m((flarum_admin_components_FormSection__WEBPACK_IMPORTED_MODULE_6___default()), {
      className: "RtlGroup",
      label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.payloads.section_title')
    }, m("div", {
      className: "RtlList"
    }, this.payloads().length ? this.payloads().map((payload, i) => m("div", {
      className: "PayloadItem ForceLtrField",
      key: i
    }, m("input", {
      className: "FormControl Payload-value ForceLtrField",
      value: payload,
      onchange: e => this.updatePayload(i, e.target.value)
    }), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      icon: "fas fa-times",
      onclick: () => this.removePayload(i),
      className: "Button Button--icon Button--danger Payload-remove"
    }))) : m("p", {
      className: "RtlList-empty"
    }, m("i", {
      className: "fa-regular fa-folder-open"
    }), m("span", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.payloads.empty_text')))), m("div", {
      className: "Form-controls"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "Button RtlList-button",
      icon: "fas fa-plus",
      onclick: () => this.addPayload()
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.payloads.add_button'))), m("div", {
      className: "RtlGroupText helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('irmmr-rtl.admin.settings.payloads.help_text')))), m("div", {
      className: "Form-group Form-controls",
      style: {
        marginTop: '25px'
      }
    }, this.submitButton())));
  }
}
flarum.reg.add('irmmr-rtl', 'admin/components/SettingsPage', RtlSettingsPage);

/***/ },

/***/ "./src/admin/extend.ts"
/*!*****************************!*\
  !*** ./src/admin/extend.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_SettingsPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/SettingsPage */ "./src/admin/components/SettingsPage.tsx");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Admin)().page(_components_SettingsPage__WEBPACK_IMPORTED_MODULE_1__["default"])]);

/***/ },

/***/ "./src/admin/index.js"
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _extend__WEBPACK_IMPORTED_MODULE_4__["default"])
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_changeNavigationBackBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/changeNavigationBackBtn */ "./src/common/changeNavigationBackBtn.js");
/* harmony import */ var _common_changePaginationIcons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/changePaginationIcons */ "./src/common/changePaginationIcons.js");
/* harmony import */ var _common_extendTooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/extendTooltip */ "./src/common/extendTooltip.js");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extend */ "./src/admin/extend.ts");





flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('irmmr-rtl', () => {
  if (document.dir === 'rtl') {
    (0,_common_changeNavigationBackBtn__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_common_changePaginationIcons__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_common_extendTooltip__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
});

/***/ },

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

/***/ "./src/common/changePaginationIcons.js"
/*!*********************************************!*\
  !*** ./src/common/changePaginationIcons.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_Pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Pagination */ "flarum/common/components/Pagination");
/* harmony import */ var flarum_common_components_Pagination__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Pagination__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_common_components_Pagination__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'view', function (vdom) {
    const children = vdom.children;
    if (!Array.isArray(children)) {
      return;
    }
    children.forEach(child => {
      if (!child?.attrs?.icon || child.attrs['data-rtl-flipped']) {
        return;
      }
      const icon = child.attrs.icon;
      const flipMap = {
        'fas fa-chevron-left': 'fas fa-chevron-right',
        'fas fa-chevron-right': 'fas fa-chevron-left',
        'fas fa-step-backward': 'fas fa-step-forward',
        'fas fa-step-forward': 'fas fa-step-backward'
      };
      if (flipMap[icon]) {
        child.attrs.icon = flipMap[icon];
        child.attrs['data-rtl-flipped'] = 'true';
      }
    });
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

/***/ "flarum/admin/app"
/*!******************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/app')" ***!
  \******************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'admin/app');

/***/ },

/***/ "flarum/admin/components/ExtensionPage"
/*!***************************************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/components/ExtensionPage')" ***!
  \***************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'admin/components/ExtensionPage');

/***/ },

/***/ "flarum/admin/components/FormSection"
/*!*************************************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/components/FormSection')" ***!
  \*************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'admin/components/FormSection');

/***/ },

/***/ "flarum/admin/components/FormSectionGroup"
/*!******************************************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/components/FormSectionGroup')" ***!
  \******************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'admin/components/FormSectionGroup');

/***/ },

/***/ "flarum/common/components/Button"
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Button')" ***!
  \*********************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Button');

/***/ },

/***/ "flarum/common/components/Form"
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Form')" ***!
  \*******************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Form');

/***/ },

/***/ "flarum/common/components/Navigation"
/*!*************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Navigation')" ***!
  \*************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Navigation');

/***/ },

/***/ "flarum/common/components/Pagination"
/*!*************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Pagination')" ***!
  \*************************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Pagination');

/***/ },

/***/ "flarum/common/components/Select"
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Select')" ***!
  \*********************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Select');

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

/***/ "flarum/common/extenders"
/*!*************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extenders')" ***!
  \*************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/extenders');

/***/ },

/***/ "flarum/common/utils/Stream"
/*!****************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/Stream')" ***!
  \****************************************************************/
(module) {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/Stream');

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
  !*** ./admin.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _src_admin__WEBPACK_IMPORTED_MODULE_0__.extend)
/* harmony export */ });
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map