<template>
  <div class="cart">
    <v-container>
      <v-row class="text-center" v-if="items.length > 0" justify="space-between">
        <v-col cols="12" class="text-left title">Shopping Cart</v-col>
        <v-col cols="9">
          <product-item
            :product="productById(item.item_num)"
            v-for="(item, i) in items"
            :key="i"
          ></product-item>
          <strong class="text-right">Total ({{ cartItemCount }} items): ${{ cartTotal }}</strong>
        </v-col>
        <v-col cols="3">
          <strong>Total ({{ cartItemCount }} items): ${{ cartTotal }}</strong>
          <v-btn
            class="d-flex"
            :disabled="isCheckOut"
            :to="{ path: isLoggedIn ? '/checkout' : '/signin', query: { redirectPath: 'checkout' } }"
          >{{ isCheckOut ? 'Place Order' : 'Check Out' }}</v-btn>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12">Your cart is empty.</v-col>
        <v-btn cols="12" to="/">Continue Shopping</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductItem from "../components/ProductItem";

export default {
  name: "Cart",
  components: { ProductItem },
  computed: {
    items() {
      return this.$store.state.cart;
    },
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
    isCheckOut() {
      return this.$route.name === "CheckOut";
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    },
    productById() {
      return this.$store.getters.productById;
    }
  }
};
</script>
