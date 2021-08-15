<template>
  <div>
    <div v-if="getIdModel.length > 0">
      <v-tabs v-model="tab">
        <v-tab key="item1">Resultado de entrenamiento</v-tab>
        <v-tab key="item2">Predecir</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="item1">
          <fit></fit>
        </v-tab-item>
        <v-tab-item key="item2">
          <prediction></prediction>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <div v-if="getIfModelTraining">
      <prediction></prediction>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Fit from "./Fit.vue";
import Prediction from "./Prediction.vue";
import store, { StoreState } from "@/store";

export default Vue.extend({
  name: "TabsPages",
  store: store,
  components: {
    Fit,
    Prediction,
  },
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    getIdModel(): string {
      return (this.$store.state as StoreState).data._id.length > 0
        ? (this.$store.state as StoreState).data._id
        : localStorage.getItem("model")
        ? (localStorage.getItem("_id")?.toString() as string)
        : "";
    },
    getIfModelTraining() {
      return !(
        (this.$store.state as StoreState).data._id.length > 0 ||
        localStorage.getItem("model")
      );
    },
  },
});
</script>
