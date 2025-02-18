<template>
  <PkpTableCell>
    <span>{{ percentage }}% </span>
  </PkpTableCell>
</template>

<script setup>
import { computed } from "vue";
const { useLocalize } = pkp.modules.useLocalize;

const props = defineProps({ file: { type: Object, required: true } });

const { localize } = useLocalize();

const percentage = computed(() => localize(props.file.name).length);
</script>
