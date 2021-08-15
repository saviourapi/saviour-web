<template>
  <div>
    <v-container>
      <h4>Escoger modelo para predicir</h4>
      <v-select
        :items="modelName"
        outlined
        v-model="modelSelected.value"
        item-text="text"
        item-value="value"
        v-if="getIdModel.length > 0"
      ></v-select>
      <v-select
        :items="modelName2"
        outlined
        v-model="modelSelected.value"
        item-text="text"
        item-value="value"
        v-if="getIdModel.length == 0"
      ></v-select>

      <h4 class="mt-1">Predecir:</h4>
      <v-file-input
        accept=".csv"
        filled
        label="CSV de datos a predecir"
        placeholder="Archivos hasta 100 mb"
        outlined
        show-size
        :prepend-icon="null"
        append-icon="mdi-file-delimited"
        :loading="loading"
        v-model="file"
        :rules="rules"
      ></v-file-input>

      <v-btn
        elevation="2"
        class="mt-4"
        color="success"
        :loading="loadingTest"
        @click="prediction"
      >
        Predecir
      </v-btn>
    </v-container>

    <v-container v-if="response.score > 0">
      <h5>{{ response.title }}</h5>
      <!-- <p>Score de predicción: {{ response.score }}</p> -->
      <planet-chart
        :data="dataset"
        :id="response.score"
        :nameX="response.xlabel"
        :nameY="response.ylabel"
      ></planet-chart>
    </v-container>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import store, { StoreState } from "@/store";
import PlanetChart from "./charts/PlanetChart.vue";
import { PredictionService } from "../api/predict-service";
import { DataDto, PredictionDto } from "@/api/training-service";
const predictionService = new PredictionService();

interface DataIn {
  file: File | null;
  loading: boolean;
  rules: ((value: File) => boolean | string)[];
  modelName: { value: number; text: string }[];
  modelName2: { value: number; text: string }[];
  modelSelected: { value: number; text: string };
  loadingTest: boolean;
  response: PredictionDto;
  dataset: { datasets: DataDto[] };
}

export default Vue.extend({
  name: "Prediction",
  store: store,
  components: {
    PlanetChart,
  },
  data(): DataIn {
    return {
      file: null,
      loading: false,
      rules: [
        (value) =>
          !value ||
          value.size < 100 * 1024 * 1024 ||
          "El archivo debe de ser menor de 100 mb",
      ],
      modelName: [
        { value: 1, text: "Regresión Polinomial Preentrenado" },
        { value: 2, text: "Random Forest Preentrenado" },
        { value: 0, text: "Modelo entrenado" },
      ],
      modelName2: [
        { value: 1, text: "Regresión Polinomial Preentrenado" },
        { value: 2, text: "Random Forest Preentrenado" },
      ],
      modelSelected: { value: 1, text: "Regresión Polinomial Preentrenado" },
      loadingTest: false,
      response: {
        title: "",
        xlabel: "",
        ylabel: "",
        score: 0,
        datasets: [],
      },
      dataset: { datasets: [] },
    };
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
      return this.$store.state.model.score;
    },
  },
  methods: {
    async prediction() {
      let id = (this as any).getIdModel;
      if ((this as any).file && (this as any).file.size < 100 * 1024 * 1024) {
        (this as any).loadingTest = true;
        const res = await predictionService.prediction({
          _id: id.toString(),
          data: (this as any).file,
          algorithm: (this as any).modelSelected.value,
        });
        (this as any).loadingTest = false;

        if (res) {
          (this as any).response = res;
          (this as any).dataset = { datasets: res.datasets };
        } else {
          this.$store.commit("showError", "No se pudo realizar la predicción.");
        }
      }
    },
  },
});
</script>
