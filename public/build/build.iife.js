(function() {
  "use strict";
  const ExampleTab_vue_vue_type_style_index_0_scoped_d9cee71c_lang = "";
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        );
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main$1 = {
    props: {
      initData: Object
    },
    data() {
      return {
        count: 0,
        issues: []
      };
    },
    created() {
      fetch(`${this.initData.apiUrl}issues`).then((response) => response.json()).then((issues) => {
        this.issues = (issues == null ? void 0 : issues.items) || [];
      });
    },
    methods: {
      incrementCount() {
        this.count += 2;
      }
    }
  };
  var _sfc_render$1 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { staticClass: "container" }, [_c("h3", [_vm._v("Simple Vue interaction")]), _c("pkp-button", { on: { "click": _vm.incrementCount } }, [_vm._v("count is " + _vm._s(_vm.count))]), _c("h3", [_vm._v("Data from API")]), _c("ul", _vm._l(_vm.issues, function(issue, index) {
      return _c("li", { key: issue.id }, [_c("a", { attrs: { "href": issue.publishedUrl } }, [_vm._v(_vm._s(issue.identification))])]);
    }), 0), _c("h3", [_vm._v("Usage of mixin for handling dialogs.")]), _c("my-component-with-dialog"), _c("h3", [_vm._v("Extending component")]), _c("button-extended", { staticClass: "button-extended" }, [_vm._v(" Extended Button ")]), _c("h3", [_vm._v("Custom styles when needed")]), _c("div", { staticClass: "custom-styling" })], 1);
  };
  var _sfc_staticRenderFns$1 = [];
  var __component__$1 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$1,
    _sfc_render$1,
    _sfc_staticRenderFns$1,
    false,
    null,
    "d9cee71c",
    null,
    null
  );
  const ExampleTab = __component__$1.exports;
  const _sfc_main = {
    // Most cases should be possible to handle just using components api (props, slots, events). Or creating own component.
    // Extending component is last resort and should be rare. As its overriding its internal methods, it might
    // stop working with future versions of given component. If you have such use case
    // please let us know your use case - often it means there is opportunity to improve components API.
    extends: pkp.Vue.component("PkpButton"),
    methods: {
      click() {
        alert("hi there!");
      }
    }
  };
  const _sfc_render = null;
  const _sfc_staticRenderFns = null;
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns,
    false,
    null,
    null,
    null,
    null
  );
  const ButtonExtended = __component__.exports;
  pkp.Vue.component("ExampleTab", ExampleTab);
  pkp.Vue.component("ButtonExtended", ButtonExtended);
})();
