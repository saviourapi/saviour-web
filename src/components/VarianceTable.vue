<template>
  <v-dialog>
    <template v-slot:activator="{ on, attrs }">
      <v-btn small color="#0caadc" outlined dark v-bind="attrs" v-on="on">
        Ver correlación
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Correlación de variables</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="values"
          dense
          class="elevation-1"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import store from "@/store";
import Vue from "vue";
export default Vue.extend({
  store: store,
  computed: {
    headers() {
      return this.$store.getters.headers;
    },
    values() {
      const values = this.$store.getters.values;
      for (const i in values) {
        const val = values[i];
        const keys = Object.keys(val);
        for (const j in keys) {
          const v = values[i][keys[j]];
          if (v !== "nan") values[i][keys[j]] = (v as number).toFixed(2);
          else values[i][keys[j]] = "-";
        }
      }
      return values;
    },
  },
});
</script>
