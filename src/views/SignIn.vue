<template>
  <div class="signin">
    <v-container>
      <v-text-field v-model="model" label="Name"></v-text-field>
      <v-btn @click="getUser">Continue</v-btn>
      <div>
        Not you?
        <v-btn to="/register" text>Create Account</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      model: "some body"
    };
  },
  computed: {
    items: function() {
      return this.$store.state.cart;
    }
  },
  methods: {
    getUser: function() {
      const that = this;
      fetch(`./json/default_user.json`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          data.isLoggedIn = true;
          this.$store.commit("userData", data);
          return fetch(`./json/default_cart.json`).then(response =>
            response.json()
          );
        })
        .then(data => {
          console.log(data);
          this.$store.commit("cartData", data);
          let redirectTo = this.$route.query.redirectPath
            ? `/${this.$route.query.redirectPath}`
            : "/";
          this.$router.push({
            path: redirectTo
          });
        });
    }
  }
};
</script>
