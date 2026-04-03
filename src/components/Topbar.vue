<template>
  <div class="topbar">
    <router-link to="/" class="topbar__brand">
      Van-Code Store
    </router-link>

    <nav class="topbar__nav">
      <span v-if="isLoggedIn" class="topbar__greeting">Hello, {{ displayName }}</span>

      <v-btn
        v-if="!isLoggedIn"
        to="/signin"
        text
        class="topbar__nav-btn"
      >Sign In</v-btn>

      <v-btn
        v-else
        text
        class="topbar__nav-btn"
        @click="signOut"
      >Sign Out</v-btn>

      <v-btn
        :to="{ path: '/cart' }"
        icon
        large
        class="topbar__cart-btn"
        aria-label="Shopping cart"
      >
        <v-badge
          color="accent"
          :content="cartBadge"
          :value="cartBadge > 0"
          overlap
        >
          <v-icon color="primary">mdi-cart-outline</v-icon>
        </v-badge>
      </v-btn>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Topbar",
  computed: {
    cartBadge() {
      return this.$store.getters.cartItemCount;
    },
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
    displayName() {
      return this.$store.state.user.name || "there";
    }
  },
  methods: {
    signOut() {
      this.$store.commit("userData", { isLoggedIn: false, name: "Customer", shipping: [] });
      if (this.$route.name === "CheckOut") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.topbar {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.topbar__brand {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.topbar__nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.topbar__greeting {
  font-size: 0.875rem;
  color: #6b7280;
  margin-right: 8px;
}

.topbar__nav-btn {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}

.topbar__cart-btn {
  margin-left: 4px;
}
</style>
