<script setup>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getProducts } from '../api'

const store = useStore()
const route = useRoute()
const props = defineProps({ products: { type: Array, required: true } })

const QuantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const quantityDDL = QuantityArray
let quantityModel = ref(QuantityArray[0])
let snackbar = false
let successMsg = ''
let product = ref({})
let products = ref(props.products)

watchEffect(async () => {
  if (products.value.length === 0) {
    products.value = await getProducts()
  }
  product.value = products.value.find((x) => {
    return x.item_num === route.params.value1
  })
})

function addProduct() {
  store.commit('addItem', {
    quantity: quantityModel.value,
    item_num: product.value.item_num,
    price: product.value.price
  })
  successMsg = `${product.value.name} has been added to your cart`
  snackbar = true
}
function updateQty(num) {
  quantityModel.value = num
}
</script>
<template>
  <v-row class="product_detail">
    <v-col>
      <v-snackbar v-model="snackbar" top :timeout="3000" color="cyan darken-3">
        {{ successMsg }}
        <v-btn text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-card :ref="product.item_num" elevation="0">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="6">
              <v-img
                class="white--text align-end"
                :height="500"
                :width="500"
                :src="product.image"
              />
            </v-col>
            <v-col cols="6">
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle>{{ product.description }}</v-card-subtitle>
              <v-card-subtitle>Item {{ product.item_num }}</v-card-subtitle>
              <v-card-text class="text--primary">
                <div>${{ product.price }}</div>
              </v-card-text>
              <v-card-actions>
                <v-select
                  :items="quantityDDL"
                  :v-model="quantityModel"
                  placeholder="Qty: 1"
                  class="col-2 pb-0"
                  @change="updateQty"
                ></v-select>

                <v-btn @click.prevent="addProduct">Add to Cart</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
