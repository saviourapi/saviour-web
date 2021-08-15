<template>
  <div>
    <start :headers="headers" :values="values" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Start from "../components/Start.vue";
export default Vue.extend({
  name: "Home",

  components: {
    Start,
  },
  data() {
    return {
      headers: [],
      values: [],
    };
  },
  methods: {
    onLoadFile(headers: [], values: []) {
      this.headers = headers;
      this.values = values;
    },
  },
});
</script>
