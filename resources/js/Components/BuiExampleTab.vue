<template>
  <div class="container">
    <h3>{{ t("plugins.generic.backendUiExample.localizedTitle") }}</h3>
    <p>{{ t("plugins.generic.backendUiExample.localizedTitleDescription") }}</p>
    <h3>Simple Vue interaction</h3>
    <pkp-button @click="incrementCount">count is {{ count }}</pkp-button>

    <h3>More complex component from ui-library with data from API</h3>
    <pkp-list>
      <pkp-list-item
        v-for="(issue, index) in issues?.items || []"
        :key="issue.id"
      >
        <a :href="issue.publishedUrl">{{ issue.identification }}</a>
        <pkp-orderer
          :isDraggable="false"
          :itemId="index"
          :itemTitle="issue.identification"
          @down="down"
          @up="up"
        />
      </pkp-list-item>
    </pkp-list>
    <h3>Usage of composable for handling dialogs.</h3>
    <bui-my-component-with-dialog />
    <h3 class="custom-text-styling-heading">Custom styles when needed</h3>
    <div class="custom-styling"></div>
  </div>
</template>

<style scoped>
.custom-styling {
  margin-top: 2rem;
  height: 3rem;
  background-color: var(--color-stage-in-review);
}

.custom-text-styling-heading {
  margin-top: 1rem;
  font: var(--font-3xl-bold);
  color: var(--text-color-heading);
}
</style>
<script setup>
import { ref, watch } from "vue";
const { useUrl } = pkp.modules.useUrl;
const { useFetch } = pkp.modules.useFetch;
const { useLocalize } = pkp.modules.useLocalize;

const { t } = useLocalize();

function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

const props = defineProps({ initData: { type: Object, required: true } });

const count = ref(0);

const { apiUrl } = useUrl("issues");

const { data: issues, fetch: fetchIssues } = useFetch(apiUrl);

fetchIssues();

function incrementCount() {
  count.value += 2;
}
function up(itemIndex) {
  if (itemIndex > 0) {
    arraymove(issues.value?.items, itemIndex, itemIndex - 1);
  }
}
function down(itemIndex) {
  if (itemIndex < issues.value?.items.length - 1) {
    arraymove(issues.value?.items, itemIndex, itemIndex + 1);
  }
}
</script>
