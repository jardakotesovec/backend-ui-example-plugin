<template>
  <PkpTableCell>
    <span v-if="status">{{ status }} </span>
    <PkpSpinner v-else></PkpSpinner>
  </PkpTableCell>
</template>

<script setup>
import { computed } from "vue";
const { useLocalize } = pkp.modules.useLocalize;

const props = defineProps({ file: { type: Object, required: true } });

const { localize } = useLocalize();

const percentage = computed(() => localize(props.file.name).length);
const fileStore = pkp.registry.getPiniaStore("fileManager_SUBMISSION_FILES");
const status = computed(
  () => fileStore?.ithenticateStatus?.[props.file.id] || null
);
</script>
