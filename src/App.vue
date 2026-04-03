<template>
  <v-app>
    <v-app-bar app color="white" elevation="1" height="64">
      <app-topbar></app-topbar>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer color="primary" dark class="app-footer">
      <div class="app-footer__inner">
        <div class="app-footer__brand">
          <span class="font-weight-semibold">Van-Code Store</span>
          <span class="app-footer__copy"
            >© {{ currentYear }} All rights reserved.</span
          >
        </div>
        <div class="app-footer__links">
          <router-link to="/">Shop</router-link>
          <router-link to="/cart">Cart</router-link>
          <router-link to="/signin">Sign In</router-link>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import AppTopbar from "./components/Topbar";

export default {
  name: "App",
  components: { AppTopbar },
  created() {
    this.$store.dispatch("fetchProducts");
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.app-footer {
  padding: 0;
}

.app-footer__inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.app-footer__brand {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.875rem;
}

.app-footer__copy {
  opacity: 0.7;
  font-size: 0.8rem;
}

.app-footer__links {
  display: flex;
  gap: 24px;
  font-size: 0.875rem;
}

.app-footer__links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.15s;
}

.app-footer__links a:hover {
  color: #ffffff;
}
</style>
