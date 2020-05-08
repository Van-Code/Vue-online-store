<template>
  <div class="cart">
    <v-container>
      <v-row class="text-center" v-if="items.length>0" justify="space-between">
        <v-col cols="9">
          <product-item :product="getProductById(item.item_num)" v-for="(item,i) in items" :key="i"></product-item>
        </v-col>
        <v-col cols="3" align-start>
          <div>Subtotal({{getCartCount()}} items): ${{getSubtotal()}}</div>
          <v-btn
            cols="3"
            class="d-flex"
            :to="{path: isLoggedIn? '/checkout' : '/signin',query:{'redirectPath':'checkout'}}"
          >Check Out</v-btn>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12">You cart is empty</v-col>
        <v-btn cols="12" to="/">Continue Shopping</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductItem from "../components/ProductItem";
export default {
  props: { products: { type: Array, default: Array, required: true } },
  name: "Cart",
  components: {
    ProductItem
  },
  data() {
    return {
      isLoggedIn: this.$store.state.user.isLoggedIn
    };
  },
  computed: {
    items: function() {
      return this.$store.state.cart;
    }
  },
  methods: {
    getProductById: function(id) {
      return this.products.find(product => product.item_num === id);
    },
    getSubtotal: function() {
      let subtotal = 0;
      this.$store.state.cart.filter(item => {
        subtotal += item.quantity * item.price;
      });
      return subtotal;
    },
    getCartCount: function() {
      let itemCount = 0;
      this.$store.state.cart.filter(item => {
        itemCount += item.quantity;
      });
      return itemCount;
    }
  }
};
</script>
