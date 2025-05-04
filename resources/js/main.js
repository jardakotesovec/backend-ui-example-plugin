import BuiExampleTab from "./Components/BuiExampleTab.vue";
import BuiMyComponentWithDialog from "./Components/BuiMyComponentWithDialog.vue";
import BuiFileManagerCellIthenticate from "./Components/BuiFileManagerCellIthenticate.vue";
import BuiPublicationListing from "./Components/BuiPublicationListing.vue";
import { computed, watch } from "vue";
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
pkp.registry.storeExtend("fileManager_SUBMISSION_FILES", (piniaContext) => {
  const { useUrl } = pkp.modules.useUrl;
  const { useFetch } = pkp.modules.useFetch;

  const fileStore = piniaContext.store;

  const ithenticateQueryParams = computed(() => {
    const fileIds = fileStore?.files?.map((file) => file.id) || [];

    return { fileIds };
  });

  const { apiUrl } = useUrl(`submissions/ithenticate`);

  const { fetch: fetchIthenticateStatus, data: ithenticateStatus } = useFetch(
    apiUrl,
    {
      query: ithenticateQueryParams,
    }
  );

  watch(ithenticateQueryParams, (newQueryParams) => {
    if (newQueryParams?.fileIds?.length) {
      fetchIthenticateStatus();
    }
  });

  fileStore.ithenticateStatus = ithenticateStatus;

  fileStore.extender.extendFn("getColumns", (columns, args) => {
    // adding new column last to the end
    console.log("extending getColumn");
    const newColumns = [...columns];

    const { useLocalize } = pkp.modules.useLocalize;
    const { t } = useLocalize();

    console.log("columns:");
    console.log(columns);

    // to get prop passed to FileManager
    console.log("submission:");
    console.log(fileStore.props.submission);

    // to get anything thats not available in args/props, but its available on particular store.
    console.log("files:");
    console.log(fileStore.files);

    newColumns.splice(newColumns.length - 1, 0, {
      // header label of new column
      header: t("plugins.generic.backendUiExample.ithenticate"),
      // component responsible for rendering that table cell
      component: "BuiFileManagerCellIthenticate",
      props: {},
    });

    return newColumns;
  });

  fileStore.extender.extendFn("getItemActions", (originalResult, args) => {
    console.log("getItemActions");
    console.log("file:");
    console.log(args.file);

    console.log("submission from props:");
    console.log(fileStore.props.submission);

    if (args.file) {
      console.log(
        "ithenticate status:",
        ithenticateStatus.value?.[args.file.id] || null
      );
    }
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
  });
});

pkp.registry.storeExtend("workflow", (piniaContext) => {
  const workflowStore = piniaContext.store;

  // Extending workflow menu
  workflowStore.extender.extendFn("getMenuItems", (menuItems, args) => {
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
  workflowStore.extender.extendFn("getPrimaryItems", (primaryItems, args) => {
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
  });

  // Render custom component in custom menu
  workflowStore.extender.extendFn("getPrimaryItems", (primaryItems, args) => {
    if (args?.selectedMenuState?.primaryMenuItem === "buiCustomMenu") {
      return [
        {
          component: "BuiPublicationListing",
          props: { submission: args.submission },
        },
      ];
    }
    return primaryItems;
  });
});
