<template>
  <div class="topbar container">
    <div class="flex row align-center">
      <v-btn class="d-flex col-1 align-center" to="/" fixed text icon color="blue lighten-2">
        <v-icon large>mdi-home</v-icon>
      </v-btn>
      <router-link to="/" class="d-flex col-2 offset-md-5">
        <h3>Van-Code Store</h3>
      </router-link>
      <div class="d-flex justify-end col-3 offset-md-2 justify-space-between align-center">
        <div>Hello{{ userName }}</div>
        <v-btn text to="/signin" v-if="!isLoggedIn">Sign In</v-btn>
        <v-btn text v-else @click="signOut">Sign Out</v-btn>
        <v-btn
          :to="{ path: '/cart', query: { redirectPath: 'checkout' } }"
          text
          icon
          large
          color="primary"
        >
          <v-badge color="pink" :content="cartBadge" :value="cartBadge > 0">
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </div>
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
    userName() {
      return this.$store.state.user.name
        ? `, ${this.$store.state.user.name}`
        : "!";
    }
  },
  methods: {
    signOut() {
      this.$store.commit("userData", { isLoggedIn: false });
      if (this.$route.name === "CheckOut") {
        this.$router.push("/");
      }
    }
  }
};
</script>
