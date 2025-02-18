<template>
  <div>
    <pkp-button @click="openExampleDialog">openDialog</pkp-button>
  </div>
</template>

<script setup>
const { useModal } = pkp.modules.useModal;

const { openDialog } = useModal();

function openExampleDialog() {
  openDialog({
    name: "example",
    title: "Submit Article",
    message: "Are you sure you want to submit this article?",
    actions: [
      {
        label: "Yes",
        isPrimary: true,
        callback: (close) => {
          close();
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
}
</script>
