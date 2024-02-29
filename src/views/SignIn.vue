<template>
  <div class="signin">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="model" label="Name"></v-text-field>
          <v-btn @click="getUser">Continue</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div>
            Not you?
            <v-btn to="/register" text>Create Account</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      model: 'some body'
    }
  },
  computed: {
    items: function () {
      return this.$store.state.cart
    }
  },
  methods: {
    getUser: function () {
    
      fetch(`./json/default_user.json`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          data.isLoggedIn = true
          this.$store.commit('userData', data)
          return fetch(`./json/default_cart.json`).then((response) => response.json())
        })
        .then((data) => {
          console.log(data)
          this.$store.commit('cartData', data)
          let redirectTo = this.$route.query.redirectPath
            ? `/${this.$route.query.redirectPath}`
            : '/'
          this.$router.push({
            path: redirectTo
          })
        })
    }
  }
}
</script>
