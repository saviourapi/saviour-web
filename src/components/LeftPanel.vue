<template>
  <v-navigation-drawer
    app
    v-model="drawerState"
    bottom
    fixed
    width="25%"
    color="#F5FAF4"
  >
    <v-container>
      <h4>1. Seleccione el algoritmo</h4>
      <br />
      <v-select
        :items="modelName"
        outlined
        v-model="modelSelected.value"
        item-text="text"
        item-value="value"
      ></v-select>

      <h5 class="ml-2">Escoger porcentaje para el testeo:</h5>
      <v-slider
        v-model="slider"
        class="align-center"
        :max="max"
        :min="min"
        hide-details
      >
        <template v-slot:append>
          <v-text-field
            v-model="slider"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px"
          ></v-text-field>
        </template>
      </v-slider>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <h4>2. Carga de archivo CSV</h4>
      <br />
      <v-alert border="top" color="red lighten-2" dark>
        Observación: Los datos que debe ingresar en la página web deben de estar
        correctamente limpios y normalizados.
      </v-alert>
      <v-file-input
        accept=".csv,.xlsx,.xls"
        filled
        label="CSV/XLSX/XLS de datos"
        placeholder="Archivos hasta 100 mb"
        outlined
        show-size
        :prepend-icon="null"
        append-icon="mdi-file-delimited"
        :loading="loading"
        v-model="file"
        :rules="rules"
        @change="uploadFile"
      ></v-file-input>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <h4 class="mb-4">3. Seleccionar variables</h4>

      <v-container fluid v-if="sumarize.columns.length > 0">
        <variance-table />

        <v-select
          class="mt-5"
          :items="sumarize.columns"
          label="Campo fecha"
          outlined
          v-model="campox"
          @change="onChangeSelects"
        ></v-select>

        <v-select
          :items="sumarize.columns"
          label="Campo Y"
          outlined
          v-model="campoy"
          @change="onChangeSelects"
        ></v-select>

        <v-select
          :items="sumarize.columns"
          label="Campo de agrupación"
          outlined
          v-model="groupby"
          @change="onChangeSelects"
        ></v-select>

        <div
          v-if="campox.length > 0 && campoy.length > 0 && groupby.length > 0"
        >
          <h5>Labels</h5>
          <v-checkbox
            class="mb-2"
            label="Seleccionar todo"
            dense
            :indeterminate="!selectedAll"
            v-model="selectedAll"
            @change="onChange"
          />
          <v-select
            :items="selectedLabels"
            v-model="selected"
            chips
            multiple
            outlined
          />
        </div>
      </v-container>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <v-btn
        elevation="2"
        class="mt-4"
        color="success"
        block
        :loading="loadingTraining"
        @click="training"
        >Entrenar</v-btn
      >
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import store from "@/store";
import Vue from "vue";
import { CsvSumarizeDto, CsvService } from "../api/csv-service";
import { TrainingService } from "../api/training-service";
import VarianceTable from "./VarianceTable.vue";
const csvService = new CsvService();
const trainingService = new TrainingService();

interface DataI {
  file: File | null;
  loading: boolean;
  sumarize: CsvSumarizeDto;
  selected: string[];
  rules: ((value: File) => boolean | string)[];
  campox: string;
  campoy: string;
  groupby: string;
  selectedLabels: string[];
  modelName: { value: number; text: string }[];
  modelSelected: { value: number; text: string };
  loadingTraining: boolean;
  min: number;
  max: number;
  slider: number;
}
export default Vue.extend({
  components: { VarianceTable },
  store: store,
  props: {
    drawer: {
      type: Boolean,
      default: () => false,
    },
  },
  data(): DataI {
    return {
      file: null,
      loading: false,
      sumarize: {
        _id: "",
        columns: [],
        corr: {},
      },
      selected: [],
      rules: [
        (value) =>
          !value ||
          value.size < 100 * 1024 * 1024 ||
          "El archivo debe de ser menor de 100 mb",
      ],
      campox: "",
      campoy: "",
      groupby: "",
      selectedLabels: [],
      modelName: [
        { value: 1, text: "Regresión Polinomial" },
        { value: 2, text: "Random Forest" },
      ],
      modelSelected: { value: 1, text: "Regresión Polinomial" },
      loadingTraining: false,
      min: 10,
      max: 90,
      slider: 20,
    };
  },
  methods: {
    async uploadFile() {
      if (this.file && this.file.size < 100 * 1024 * 1024) {
        this.loading = true;
        const res = await csvService.uploadFile(
          (this.file || new File([], "")) as File
        );
        this.loading = false;
        if (res) {
          this.sumarize = res;
          // this.selected = this.sumarize.columns;
          this.$store.commit("storeData", this.sumarize);
        } else {
          this.resetData();
          this.file = null;
          this.$store.commit("showError", "No se pudo cargar el archivo.");
        }
      } else this.resetData();
    },
    async training() {
      if (
        this.file &&
        this.file.size < 100 * 1024 * 1024 &&
        this.campox.length > 0 &&
        this.campoy.length > 0 &&
        this.groupby.length > 0 &&
        this.selected.length > 0
      ) {
        this.loadingTraining = true;
        const res = await trainingService.training({
          _id: this.sumarize._id,
          x_plot: this.campox,
          y_plot: this.campoy,
          group_by: this.groupby,
          labels: this.selected,
          algorithm: this.modelSelected.value,
          test: this.slider / 100,
        });
        this.loadingTraining = false;
        if (res) {
          this.$store.commit("storeModel", res);
          this.resetData(false);
        } else {
          this.$store.commit("showError", "No se pudo entrenar el modelo.");
        }
      }
    },
    resetData(dropStore = true) {
      this.sumarize = { _id: "", columns: [], corr: {} };
      this.selected = [];
      this.campox = "";
      this.campoy = "";
      this.groupby = "";
      this.selectedLabels = [];
      if (dropStore) {
        this.$store.commit("resetData");
      } else {
        this.file = null;
      }
    },
    onChange(value: boolean) {
      if (value) this.selected = this.selectedLabels;
      else this.selected = [];
    },
    onChangeSelects() {
      if (
        this.campox.length > 0 &&
        this.campoy.length > 0 &&
        this.groupby.length > 0
      ) {
        this.selectedLabels = [];
        for (let i of this.sumarize.columns) {
          if (!(this.campox === i || this.campoy === i || this.groupby === i))
            this.selectedLabels.push(i);
        }
        this.selected = this.selectedLabels;
      }
    },
  },
  computed: {
    drawerState: {
      get: function (): boolean {
        return this.drawer;
      },
      set: function (value: boolean) {
        this.$emit("onDrawer", value);
      },
    },
    selectedAll: {
      get: function (): boolean {
        return this.selected.length == this.selectedLabels?.length;
      },
      set: function (value: boolean): void {
        if (!value) this.selected = [];
      },
    },
  },
});
</script>
