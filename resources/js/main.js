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
  // pinia store name
  "fileManager_SUBMISSION_FILES",
  // function to extend
  "getColumns",
  // columns is the result from the original function, which can be adjusted
  // args are the arguments that the getColumns function retrieved to calculate the columns

  (columns, args, context) => {
    // adding new column last to the end
    const newColumns = [...columns];

    const { useLocalize } = pkp.modules.useLocalize;
    const { t } = useLocalize();

    // to get file object
    console.log(args.file);

    // to get prop passed to FileManager
    console.log(context.props.submission);

    // to get anything thats not available in args/props, but its available on particular store.
    const store = pkp.registry.getPiniaStore("fileManager_SUBMISSION_FILES");
    console.log(store.files);

    newColumns.splice(newColumns.length - 1, 0, {
      // header label of new column
      header: t("plugins.generic.backendUiExample.ithenticate"),
      // component responsible for rendering that table cell
      component: "BuiFileManagerCellIthenticate",
      props: {},
    });

    return newColumns;
  }
);

pkp.registry.storeExtendFn(
  "fileManager_SUBMISSION_FILES",
  "getItemActions",
  (originalResult, args, context) => {
    console.log("backend plugin");
    console.log(args);
    const fileStore = pkp.registry.getPiniaStore(
      "fileManager_SUBMISSION_FILES"
    );
    console.log(fileStore.title);
    console.log(context.props.submission);
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

  return updatedMenuItems;
});

// Render custom component in existing menu
pkp.registry.storeExtendFn(
  "workflow",
  "getPrimaryItems",
  (primaryItems, args) => {
    if (
      args?.selectedMenuState?.primaryMenuItem === "workflow" &&
      args?.selectedMenuState?.stageId ===
        pkp.const.WORKFLOW_STAGE_ID_SUBMISSION
    ) {
      return [
        ...primaryItems,
        {
          component: "BuiPublicationListing",
          props: { submission: args.submission },
        },
      ];
    } else {
      return primaryItems;
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
