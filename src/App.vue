<template>
  <v-app>
    <!-- <v-navigation-drawer app>
      <app-sidebar :products="products"></app-sidebar>
    </v-navigation-drawer>-->

    <v-app-bar app>
      <app-topbar :products="products"></app-topbar>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view :products="products"></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import AppSidebar from "./components/Sidebar";
import AppTopbar from "./components/Topbar";

export default {
  name: "App",

  components: {
    AppSidebar,
    AppTopbar
  },
  created() {
    this.fetchProducts();
  },
  data: () => ({
    products: []
  }),
  methods: {
    fetchProducts: function() {
      const that = this;
      fetch(`./json/MOCK_DATA.json`)
        .then(response => {
          return response.json();
        })
        .then(data => (that.products = data));
    }
  }
};
</script>
