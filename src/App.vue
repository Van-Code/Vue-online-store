<template>
  <v-app>
    <v-app-bar app>
      <app-topbar></app-topbar>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import AppTopbar from "./components/Topbar";

export default {
  name: "App",

  components: {
    AppTopbar
  },
  created() {
    this.$store.dispatch("fetchProducts");
  }
};
</script>
