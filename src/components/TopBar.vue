<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({ products: { type: Array, required: true } })

const cartBadge = computed(() => {
  return store.state.cart.length
})
const isLoggedIn = computed(() => {
  return store.state.user.isLoggedIn
})
const list = computed(() => {
  return props.products.map((product) => product.name)
})
const userName = computed(() => {
  return store.state.user.name ? `, ${store.state.user.name}` : '!'
})

function signOut() {
  store.commit('userData', { isLoggedIn: false })
  if (this.$router.name === 'CheckOut') {
    this.$router.push('/')
  }
}
</script>
<template>
  <v-app-bar>
    <v-app-bar-nav-icon>
      <v-btn class="d-flex col-1 align-center" to="/" fixed text icon color="blue lighten-2">
        <v-icon large>mdi-home</v-icon>
      </v-btn>
    </v-app-bar-nav-icon>
    <!-- <v-autocomplete
        :items="list"
        class="d-flex col-4 align-center"
        placeholder="Start typing to search"
      ></v-autocomplete>-->

    <v-app-bar-title class="flex row align-center">
      <router-link to="/" class="d-flex col-2 offset-md-5">
        <h3>Vue Online Store</h3>
      </router-link>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <div class="d-flex justify-end col-3 offset-md-2 justify-space-between align-center">
      <div>Hello {{ userName }}</div>
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
          <v-icon class="right">mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </div>
  </v-app-bar>
</template>
