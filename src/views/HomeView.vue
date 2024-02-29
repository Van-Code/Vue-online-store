<script setup>
import ProductItem from '../components/ProductItem.vue'
import SideBar from '../components/SideBar.vue'

const props = defineProps({ products: { type: Array, required: true } })
</script>

<template>
  <v-row class="text-center">
    <v-col cols="3">
      <SideBar :products="products"></SideBar>
    </v-col>
    <v-col cols="9">
      <v-row>
        <product-item
          :product="product"
          v-for="product in products"
          :key="product.item_num"
          cols="3"
          :products="props.products"
        ></product-item>
      </v-row>
    </v-col>
  </v-row>
</template>
