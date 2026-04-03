<template>
  <div class="home">
    <v-container>
      <v-row class="text-center">
        <v-col v-for="product in products" :key="product.item_num" cols="3">
          <product-item :product="product"></product-item>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductItem from "../components/ProductItem";

export default {
  name: "Home",
  components: { ProductItem },
  computed: {
    products() {
      return this.$store.state.products;
    }
  }
};
</script>
