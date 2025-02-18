<template>
  <div class="container">
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
    <h3>Usage of mixin for handling dialogs.</h3>
    <bui-my-component-with-dialog />
    <h3>Custom styles when needed</h3>

    <div class="custom-styling"></div>
  </div>
</template>

<style scoped>
.custom-styling {
  margin-top: 10px;
  height: 30px;
  background-color: blue;
}
</style>
<script setup>
import { ref, watch } from "vue";
const { useUrl } = pkp.modules.useUrl;
const { useFetch } = pkp.modules.useFetch;

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
