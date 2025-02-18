<template>
  <PkpTable>
    <template #label>
      <h3 class="">
        {{ "Publications listing" }}
      </h3>
    </template>

    <PkpTableHeader>
      <PkpTableColumn>Id</PkpTableColumn>
      <PkpTableColumn>Title</PkpTableColumn>
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

const { localizeSubmission } = useLocalize();
const props = defineProps({ submission: { type: Object, required: true } });
</script>
