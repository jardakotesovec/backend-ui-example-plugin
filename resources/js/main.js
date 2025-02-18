import BuiExampleTab from "./Components/BuiExampleTab.vue";
import BuiMyComponentWithDialog from "./Components/BuiMyComponentWithDialog.vue";
import BuiFileManagerCellIthenticate from "./Components/BuiFileManagerCellIthenticate.vue";
import BuiPublicationListing from "./Components/BuiPublicationListing.vue";

pkp.registry.registerComponent("BuiPublicationListing", BuiPublicationListing);
pkp.registry.registerComponent("BuiExampleTab", BuiExampleTab);
pkp.registry.registerComponent(
  "BuiMyComponentWithDialog",
  BuiMyComponentWithDialog
);
pkp.registry.registerComponent("BuiPublicationListing", BuiPublicationListing);
pkp.registry.registerComponent(
  "BuiFileManagerCellIthenticate",
  BuiFileManagerCellIthenticate
);

// File manager extensions

// Adding iThenticate column
pkp.registry.storeExtendFn(
  "fileManager_SUBMISSION_FILES",
  "getColumns",
  (columns, args) => {
    const newColumns = [...columns];
    newColumns.splice(newColumns.length - 1, 0, {
      header: "iThenticate",
      component: "BuiFileManagerCellIthenticate",
      props: {},
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
                  // user has confirmed
                },
              },
              {
                label: "No",
                isWarnable: true,
                callback: (close) => {
                  close();
                  // user has cancelled. close the modal
                },
              },
            ],
          });
        },
      },
    ];
  }
);

// Extending workflow menu
//const workflowStore = pkp.registry.getPiniaStore("workflow");
//console.log("workflow fns list");
//console.log(pkp.registry.storeListExtendableFns());
pkp.registry.storeExtendFn("workflow", "getMenuItems", (menuItems, args) => {
  const updatedMenuItems = [
    ...menuItems,
    {
      key: "buiCustomMenu",
      label: "Custom menu",
      action: "selectMenu",
      actionArgs: { primaryMenuItem: "buiCustomMenu" },
    },
  ];
  console.log("menuItems:", menuItems);

  return updatedMenuItems;
});

// Render custom component in existing menu
pkp.registry.storeExtendFn(
  "workflow",
  "getPrimaryItems",
  (originalResult, args) => {
    if (
      args?.selectedMenuState?.primaryMenuItem === "workflow" &&
      args?.selectedMenuState?.stageId ===
        pkp.const.WORKFLOW_STAGE_ID_SUBMISSION
    ) {
      return [
        ...originalResult,
        {
          component: "BuiPublicationListing",
          props: { submission: args.submission },
        },
      ];
    } else {
      return originalResult;
    }
  }
);

// Render custom component in custom menu
pkp.registry.storeExtendFn(
  "workflow",
  "getPrimaryItems",
  (primaryItems, args) => {
    if (args?.selectedMenuState?.primaryMenuItem === "buiCustomMenu") {
      return [
        {
          component: "BuiPublicationListing",
          props: { submission: args.submission },
        },
      ];
    }
    return primaryItems;
  }
);
