<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
import ProductItem from '../components/ProductItem.vue'

const props = defineProps({ products: { type: Array, default: Array, required: true } })

const isLoggedIn = store.state.user.isLoggedIn

const items = ref(store.state.cart)

const isCheckOut = route.name === 'CheckOut'

function getProductById(id) {
  return props.products.find((product) => product.item_num === id)
}
function getSubtotal() {
  let subtotal = 0
  store.state.cart.filter((item) => {
    subtotal += item.quantity * item.price
  })
  return subtotal
}
function getCartCount() {
  let itemCount = 0
  store.state.cart.filter((item) => {
    itemCount += item.quantity
  })
  return itemCount
}
</script>

<template>
  <div class="cart">
    <v-container>
      <v-row class="text-center" v-if="items.length > 0" justify="space-between">
        <v-col cols="12" class="text-left title">Shopping Cart</v-col>
        <v-col cols="9" class="text-right">
          <ProductItem
            :product="getProductById(item.item_num)"
            v-for="(item, i) in items"
            :key="i"
          ></ProductItem>
          <strong class="text-right"
            >Total ({{ getCartCount() }} items): ${{ getSubtotal() }}</strong
          >
        </v-col>
        <v-col align-start>
          <strong>Total ({{ getCartCount() }} items): ${{ getSubtotal() }}</strong>
          <v-btn
            cols="3"
            class="d-flex"
            :disabled="isCheckOut"
            :to="{
              path: isLoggedIn ? '/checkout' : '/signin',
              query: { redirectPath: 'checkout' }
            }"
            >{{ isCheckOut ? 'Place Order' : 'Check Out' }}</v-btn
          >
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12">You cart is empty</v-col>
        <v-btn cols="12" to="/">Continue Shopping</v-btn>
      </v-row>
    </v-container>
  </div>
</template>
