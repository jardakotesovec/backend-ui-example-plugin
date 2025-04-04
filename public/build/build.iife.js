(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _hoisted_1$1 = { class: "container" };
  const _hoisted_2 = ["href"];
  const _sfc_main$3 = {
    __name: "BuiExampleTab",
    props: { initData: { type: Object, required: true } },
    setup(__props) {
      const { useUrl } = pkp.modules.useUrl;
      const { useFetch } = pkp.modules.useFetch;
      const { useLocalize } = pkp.modules.useLocalize;
      const { t } = useLocalize();
      function arraymove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
      }
      const count = vue.ref(0);
      const { apiUrl } = useUrl("issues");
      const { data: issues, fetch: fetchIssues } = useFetch(apiUrl);
      fetchIssues();
      function incrementCount() {
        count.value += 2;
      }
      function up(itemIndex) {
        var _a;
        if (itemIndex > 0) {
          arraymove((_a = issues.value) == null ? void 0 : _a.items, itemIndex, itemIndex - 1);
        }
      }
      function down(itemIndex) {
        var _a, _b;
        if (itemIndex < ((_a = issues.value) == null ? void 0 : _a.items.length) - 1) {
          arraymove((_b = issues.value) == null ? void 0 : _b.items, itemIndex, itemIndex + 1);
        }
      }
      return (_ctx, _cache) => {
        const _component_pkp_button = vue.resolveComponent("pkp-button");
        const _component_pkp_orderer = vue.resolveComponent("pkp-orderer");
        const _component_pkp_list_item = vue.resolveComponent("pkp-list-item");
        const _component_pkp_list = vue.resolveComponent("pkp-list");
        const _component_bui_my_component_with_dialog = vue.resolveComponent("bui-my-component-with-dialog");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
          vue.createElementVNode("h3", null, vue.toDisplayString(vue.unref(t)("plugins.generic.backendUiExample.localizedTitle")), 1),
          vue.createElementVNode("p", null, vue.toDisplayString(vue.unref(t)("plugins.generic.backendUiExample.localizedTitleDescription")), 1),
          _cache[0] || (_cache[0] = vue.createElementVNode("h3", null, "Simple Vue interaction", -1)),
          vue.createVNode(_component_pkp_button, { onClick: incrementCount }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("count is " + vue.toDisplayString(count.value), 1)
            ]),
            _: 1
          }),
          _cache[1] || (_cache[1] = vue.createElementVNode("h3", null, "More complex component from ui-library with data from API", -1)),
          vue.createVNode(_component_pkp_list, null, {
            default: vue.withCtx(() => {
              var _a;
              return [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(((_a = vue.unref(issues)) == null ? void 0 : _a.items) || [], (issue, index) => {
                  return vue.openBlock(), vue.createBlock(_component_pkp_list_item, {
                    key: issue.id
                  }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("a", {
                        href: issue.publishedUrl
                      }, vue.toDisplayString(issue.identification), 9, _hoisted_2),
                      vue.createVNode(_component_pkp_orderer, {
                        isDraggable: false,
                        itemId: index,
                        itemTitle: issue.identification,
                        onDown: down,
                        onUp: up
                      }, null, 8, ["itemId", "itemTitle"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }),
            _: 1
          }),
          _cache[2] || (_cache[2] = vue.createElementVNode("h3", null, "Usage of composable for handling dialogs.", -1)),
          vue.createVNode(_component_bui_my_component_with_dialog),
          _cache[3] || (_cache[3] = vue.createElementVNode("h3", { class: "custom-text-styling-heading" }, "Custom styles when needed", -1)),
          _cache[4] || (_cache[4] = vue.createElementVNode("div", { class: "custom-styling" }, null, -1))
        ]);
      };
    }
  };
  const BuiExampleTab = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-cc142055"]]);
  const _sfc_main$2 = {
    __name: "BuiMyComponentWithDialog",
    setup(__props) {
      const { useModal } = pkp.modules.useModal;
      const { useLocalize } = pkp.modules.useLocalize;
      const { t } = useLocalize();
      const { openDialog } = useModal();
      function openExampleDialog() {
        openDialog({
          title: t("plugins.generic.backendUiExample.exampleDialog.title"),
          message: t("plugins.generic.backendUiExample.exampleDialog.message"),
          actions: [
            {
              label: t("plugins.generic.backendUiExample.exampleDialog.yes"),
              isPrimary: true,
              callback: (close) => {
                close();
              }
            },
            {
              label: t("plugins.generic.backendUiExample.exampleDialog.no"),
              isWarnable: true,
              callback: (close) => {
                close();
              }
            }
          ]
        });
      }
      return (_ctx, _cache) => {
        const _component_pkp_button = vue.resolveComponent("pkp-button");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(_component_pkp_button, { onClick: openExampleDialog }, {
            default: vue.withCtx(() => _cache[0] || (_cache[0] = [
              vue.createTextVNode("openDialog")
            ])),
            _: 1
          })
        ]);
      };
    }
  };
  const _sfc_main$1 = {
    __name: "BuiFileManagerCellIthenticate",
    props: { file: { type: Object, required: true } },
    setup(__props) {
      const { useLocalize } = pkp.modules.useLocalize;
      const props = __props;
      const { localize } = useLocalize();
      const percentage = vue.computed(() => localize(props.file.name).length);
      return (_ctx, _cache) => {
        const _component_PkpTableCell = vue.resolveComponent("PkpTableCell");
        return vue.openBlock(), vue.createBlock(_component_PkpTableCell, null, {
          default: vue.withCtx(() => [
            vue.createElementVNode("span", null, vue.toDisplayString(percentage.value) + "% ", 1)
          ]),
          _: 1
        });
      };
    }
  };
  const _hoisted_1 = { class: "" };
  const _sfc_main = {
    __name: "BuiPublicationListing",
    props: { submission: { type: Object, required: true } },
    setup(__props) {
      const { useLocalize } = pkp.modules.useLocalize;
      const { t, localizeSubmission } = useLocalize();
      return (_ctx, _cache) => {
        const _component_PkpTableColumn = vue.resolveComponent("PkpTableColumn");
        const _component_PkpTableHeader = vue.resolveComponent("PkpTableHeader");
        const _component_PkpTableCell = vue.resolveComponent("PkpTableCell");
        const _component_PkpTableRow = vue.resolveComponent("PkpTableRow");
        const _component_PkpTableBody = vue.resolveComponent("PkpTableBody");
        const _component_PkpTable = vue.resolveComponent("PkpTable");
        return vue.openBlock(), vue.createBlock(_component_PkpTable, null, {
          label: vue.withCtx(() => [
            vue.createElementVNode("h3", _hoisted_1, vue.toDisplayString(vue.unref(t)("plugins.generic.backendUiExample.publicationsListing")), 1)
          ]),
          default: vue.withCtx(() => [
            vue.createVNode(_component_PkpTableHeader, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_PkpTableColumn, null, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(t)("plugins.generic.backendUiExample.publicationsListing.id")), 1)
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_PkpTableColumn, null, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(t)("plugins.generic.backendUiExample.publicationsListing.title")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            vue.createVNode(_component_PkpTableBody, null, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.submission.publications, (publication) => {
                  return vue.openBlock(), vue.createBlock(_component_PkpTableRow, null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_PkpTableCell, null, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(publication.id), 1)
                        ]),
                        _: 2
                      }, 1024),
                      vue.createVNode(_component_PkpTableCell, null, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(vue.unref(localizeSubmission)(publication.fullTitle, __props.submission.locale)), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 256))
              ]),
              _: 1
            })
          ]),
          _: 1
        });
      };
    }
  };
  pkp.registry.registerComponent("BuiPublicationListing", _sfc_main);
  pkp.registry.registerComponent("BuiExampleTab", BuiExampleTab);
  pkp.registry.registerComponent(
    "BuiMyComponentWithDialog",
    _sfc_main$2
  );
  pkp.registry.registerComponent("BuiPublicationListing", _sfc_main);
  pkp.registry.registerComponent(
    "BuiFileManagerCellIthenticate",
    _sfc_main$1
  );
  pkp.registry.storeExtendFn(
    "fileManager_SUBMISSION_FILES",
    "getColumns",
    (columns, args) => {
      const newColumns = [...columns];
      newColumns.splice(newColumns.length - 1, 0, {
        header: "iThenticate",
        component: "BuiFileManagerCellIthenticate",
        props: {}
      });
      return newColumns;
    }
  );
  pkp.registry.storeExtendFn(
    "fileManager_SUBMISSION_FILES",
    "getItemActions",
    (originalResult, args) => {
      return [
        ...originalResult,
        {
          label: "custom action",
          name: "buiCustomAction",
          icon: "Globe",
          actionFn: ({ file }) => {
            const { useModal } = pkp.modules.useModal;
            const { useLocalize } = pkp.modules.useLocalize;
            const { openDialog } = useModal();
            const { localize, localizeSubmission } = useLocalize();
            const workflowStore = pkp.registry.getPiniaStore("workflow");
            openDialog({
              title: "Custom action on file",
              message: `Do you want to make custom action on file:${localize(file.name)}. With submission title ${localizeSubmission(workflowStore.submission.publications[0].fullTitle, workflowStore.submission.locale)}`,
              actions: [
                {
                  label: "Yes",
                  isPrimary: true,
                  callback: (close) => {
                    close();
                    workflowStore.workflowViewLibrary();
                  }
                },
                {
                  label: "No",
                  isWarnable: true,
                  callback: (close) => {
                    close();
                  }
                }
              ]
            });
          }
        }
      ];
    }
  );
  pkp.registry.storeExtendFn("workflow", "getMenuItems", (menuItems, args) => {
    const updatedMenuItems = [
      ...menuItems,
      {
        key: "buiCustomMenu",
        label: "Custom menu",
        action: "selectMenu",
        actionArgs: { primaryMenuItem: "buiCustomMenu" }
      }
    ];
    return updatedMenuItems;
  });
  pkp.registry.storeExtendFn(
    "workflow",
    "getPrimaryItems",
    (primaryItems, args) => {
      var _a, _b;
      if (((_a = args == null ? void 0 : args.selectedMenuState) == null ? void 0 : _a.primaryMenuItem) === "workflow" && ((_b = args == null ? void 0 : args.selectedMenuState) == null ? void 0 : _b.stageId) === pkp.const.WORKFLOW_STAGE_ID_SUBMISSION) {
        return [
          ...primaryItems,
          {
            component: "BuiPublicationListing",
            props: { submission: args.submission }
          }
        ];
      } else {
        return primaryItems;
      }
    }
  );
  pkp.registry.storeExtendFn(
    "workflow",
    "getPrimaryItems",
    (primaryItems, args) => {
      var _a;
      if (((_a = args == null ? void 0 : args.selectedMenuState) == null ? void 0 : _a.primaryMenuItem) === "buiCustomMenu") {
        return [
          {
            component: "BuiPublicationListing",
            props: { submission: args.submission }
          }
        ];
      }
      return primaryItems;
    }
  );
})(pkp.modules.vue);
