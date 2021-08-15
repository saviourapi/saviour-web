<template>
  <v-app>
    <left-panel :drawer="drawer" @onDrawer="onDrawer" />
    <v-app-bar app color="#034748" dark short :elevation="0">
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <h2>SAVIOUR</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
        <v-snackbar v-model="snackbar">
          {{ error }}
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Cerrar
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LeftPanel from "./components/LeftPanel.vue";
import store, { StoreState } from "./store";

export default Vue.extend({
  components: { LeftPanel },
  name: "App",
  store: store,
  data: () => ({
    drawer: true,
  }),
  methods: {
    onDrawer(value: boolean) {
      this.drawer = value;
    },
  },
  computed: {
    snackbar: {
      get: function (): boolean {
        return (this.$store.state as StoreState).error;
      },
      set: function (value: boolean): void {
        (this.$store.state as StoreState).error = value;
      },
    },
    error() {
      return (this.$store.state as StoreState).errorText;
    },
  },
});
</script>
