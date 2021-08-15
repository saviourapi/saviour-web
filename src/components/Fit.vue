<template>
  <v-container>
    <div v-if="getIdModel.length > 0">
      <v-container>
        <v-row align-center>
          <h4 class="mt-1 mr-auto">Resultado de entrenamiento:</h4>
          <v-btn
            elevation="2"
            color="success"
            :loading="loadingDrop"
            @click="dropModel"
          >
            Eliminar modelo
          </v-btn>
        </v-row>
      </v-container>

      <v-container>
        <p><strong>Puntaje:</strong> {{ score }}</p>

        <!-- <v-expansion-panels class="mt-4">
          <v-expansion-panel>
            <v-expansion-panel-header> -->
        <strong>Gráficos de entrenamiento:</strong>
        <!-- </v-expansion-panel-header>
            <v-expansion-panel-content> -->
        <v-container>
          <v-row v-for="(item, i) in formatData" :key="i">
            <v-container>
              <!-- <p>score: {{ item.score }}</p> -->
              <h5>{{ item.title }}</h5>
              <planet-chart
                :data="item.data"
                :id="i"
                :nameX="item.xlabel"
                :nameY="item.ylabel"
              ></planet-chart>
            </v-container>
          </v-row>
        </v-container>
        <!-- </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels> -->
      </v-container>

      <v-divider></v-divider>

      <v-divider></v-divider>
    </div>
    <v-divider></v-divider>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrainingService } from "@/api/training-service";
import store, { StoreState } from "@/store";
import Vue from "vue";
import PlanetChart from "./charts/PlanetChart.vue";
const trainingService = new TrainingService();

export default Vue.extend({
  name: "Fit",
  store: store,
  components: {
    PlanetChart,
  },
  data() {
    return {
      options: null,
      loadingDrop: false,
    };
  },
  mounted: function () {
    // this.fillData();
  },
  methods: {
    async dropModel() {
      (this as any).loadingDrop = true;
      const res = await trainingService.deleteModal(
        localStorage.getItem("_id")?.toString() as string
      );

      (this as any).loadingDrop = false;
      if (res) {
        localStorage.removeItem("_id");
        localStorage.removeItem("model");
        this.$store.commit("resetData");
      } else {
        this.$store.commit("showError", "No se pudo eliminar el modelo.");
      }
    },
  },
  computed: {
    getIdModel(): string {
      return (this.$store.state as StoreState).data._id.length > 0
        ? (this.$store.state as StoreState).data._id
        : localStorage.getItem("_id")
        ? (localStorage.getItem("_id")?.toString() as string)
        : "";
    },
    score() {
      return (this.$store.state as StoreState).model.score > -1
        ? (this.$store.state as StoreState).model.score
        : localStorage.getItem("model")
        ? JSON.parse(localStorage.getItem("model") as string).score
        : "";
    },
    formatData() {
      let arr = [];

      let arrPredict =
        (this.$store.state as StoreState).model.score > -1
          ? (this.$store.state as StoreState).model.predictions
          : localStorage.getItem("model")
          ? JSON.parse(localStorage.getItem("model") as string).predictions
          : [];

      for (let i of arrPredict) {
        arr.push({
          data: { datasets: i.datasets },
          score: i.score,
          xlabel: i.xlabel,
          ylabel: i.ylabel,
          title: i.title,
        });
      }
      return arr;
    },
  },
});
</script>
