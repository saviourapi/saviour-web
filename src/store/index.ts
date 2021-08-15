import Vue from "vue";
import Vuex from "vuex";
import { CsvSumarizeDto } from "../api/csv-service";
import { ModelDto } from "../api/training-service";

Vue.use(Vuex);

export type StoreState = {
  data: CsvSumarizeDto;
  error: boolean;
  errorText: string;
  headers: {
    text: string;
    value: string;
    align?: string;
    sortable?: boolean;
  }[];
  values: Record<string, number | string>[];
  model: ModelDto;
};

export default new Vuex.Store<StoreState>({
  state: {
    data: {
      _id: "",
      columns: [],
      corr: {},
    },
    error: false,
    errorText: "",
    headers: [],
    values: [],
    model: {
      score: -1,
      predictions: [],
    },
  },
  mutations: {
    storeData(state: StoreState, data: CsvSumarizeDto) {
      localStorage.setItem("_id", data._id);
      // state.data = data;
      state.data.columns = data.columns;
      state.data.corr = data.corr;
      const keys = Object.keys(state.data.corr);
      state.headers.push({
        text: "",
        value: "variables",
        align: "start",
        sortable: false,
      });
      for (const i in keys) {
        state.headers.push({ text: keys[i], value: keys[i] });
        Object.defineProperty(state.data.corr[keys[i]], "variables", {
          value: keys[i],
        });
        state.values.push(state.data.corr[keys[i]]);
      }
    },
    storeModel(state: StoreState, data: ModelDto) {
      state.data._id = localStorage.getItem("_id") as string;
      const modelB: ModelDto = {
        score: -1,
        predictions: [],
      };
      modelB.score = Math.round(data.score * 100) / 100;
      modelB.predictions = data.predictions;
      localStorage.setItem("model", JSON.stringify(modelB));
      state.model = modelB;
    },
    resetData(state: StoreState) {
      state.data = {
        _id: "",
        columns: [],
        corr: {},
      };
      state.model = {
        score: -1,
        predictions: [],
      };
      state.headers = [];
      state.values = [];
    },
    showError(state: StoreState, error: string) {
      state.error = true;
      state.errorText = error;
    },
  },
  getters: {
    headers: (state) => {
      return state.headers;
    },
    values: (state) => {
      return state.values;
    },
    getscore: (state) => {
      return state.model.score;
    },
  },
  actions: {},
  modules: {},
});
