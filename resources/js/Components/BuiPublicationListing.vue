<template>
  <PkpTable>
    <template #label>
      <h3 class="">
        {{ t("plugins.generic.backendUiExample.publicationsListing") }}
      </h3>
    </template>
    <PkpTableHeader>
      <PkpTableColumn>{{
        t("plugins.generic.backendUiExample.publicationsListing.id")
      }}</PkpTableColumn>
      <PkpTableColumn>{{
        t("plugins.generic.backendUiExample.publicationsListing.title")
      }}</PkpTableColumn>
    </PkpTableHeader>
    <PkpTableBody>
      <PkpTableRow v-for="publication in submission.publications">
        <PkpTableCell>
          {{ publication.id }}
        </PkpTableCell>
        <PkpTableCell>
          {{ localizeSubmission(publication.fullTitle, submission.locale) }}
        </PkpTableCell>
      </PkpTableRow>
    </PkpTableBody>
  </PkpTable>
</template>

<script setup>
const { useLocalize } = pkp.modules.useLocalize;

const { t, localizeSubmission } = useLocalize();
const props = defineProps({ submission: { type: Object, required: true } });
</script>
