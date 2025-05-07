<template>
  <div class="container">
    <h3>Simple Vue interaction</h3>
    <pkp-button @click="incrementCount">count is {{ count }}</pkp-button>

    <h3>Data from API</h3>
    <ul>
      <li v-for="(issue, index) in issues" :key="issue.id">
        <a :href="issue.publishedUrl">{{ issue.identification }}</a>
      </li>
    </ul>
    <h3>Usage of mixin for handling dialogs.</h3>
    <my-component-with-dialog />
    <h3>Extending component</h3>
    <button-extended class="button-extended"> Extended Button </button-extended>
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
<script>
function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

export default {
  props: {
    initData: Object,
  },
  data() {
    return {
      count: 0,
      issues: [],
    };
  },
  created() {
    fetch(`${this.initData.apiUrl}issues`)
      .then((response) => response.json())
      .then((issues) => {
        this.issues = issues?.items || [];
      });
  },
  methods: {
    incrementCount() {
      this.count += 2;
    },
  },
};
</script>
