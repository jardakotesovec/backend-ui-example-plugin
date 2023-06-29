<script>
export default {
  // Most cases should be possible to handle just using components api (props, slots, events). Or creating own component.
  // Extending component is last resort and should be rare. As its overriding its internal methods, it might
  // stop working with future versions of given component. If you have such use case
  // please let us know your use case - often it means there is opportunity to improve components API.

  extends: pkp.Vue.component("PkpButton"),
  methods: {
    click() {
      alert("hi there!");
    },
  },
};
</script>
