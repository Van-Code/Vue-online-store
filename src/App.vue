<script setup>
import { ref, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue'
import { getProducts } from './api'

let products = ref([])

watchEffect(async () => {
  products.value = await getProducts()
})
</script>

<template>
  <v-app>
    <v-container fill-height="100%">
      <TopBar :products="products"></TopBar>
    </v-container>
    <v-container>
      <RouterView :products="products" />
    </v-container>
    <v-footer>
      <!-- TODO -->
    </v-footer>
  </v-app>
</template>

<style scoped></style>
