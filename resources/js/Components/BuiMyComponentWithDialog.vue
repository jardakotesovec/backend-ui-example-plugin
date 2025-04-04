<template>
  <div>
    <pkp-button @click="openExampleDialog">openDialog</pkp-button>
  </div>
</template>

<script setup>
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
          // user has confirmed
        },
      },
      {
        label: t("plugins.generic.backendUiExample.exampleDialog.no"),
        isWarnable: true,
        callback: (close) => {
          close();
          // user has cancelled. close the modal
        },
      },
    ],
  });
}
</script>
