<template>
  <div class="page-container">
    <h1 class="page-title">All Products</h1>

    <!-- Error state -->
    <div v-if="productsError" class="products-error">
      <v-icon size="48" color="#d1d5db">mdi-wifi-off</v-icon>
      <h2 class="products-error__title">Couldn't load products</h2>
      <p class="products-error__sub">{{ productsError }}</p>
      <v-btn color="primary" depressed @click="retry">Try Again</v-btn>
    </div>

    <!-- Loading skeletons -->
    <v-row v-else-if="productsLoading">
      <v-col
        v-for="n in 12"
        :key="n"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-skeleton-loader type="card" height="280"></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- Product grid -->
    <v-row v-else>
      <v-col
        v-for="product in products"
        :key="product.item_num"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <product-item :product="product"></product-item>
      </v-col>
    </v-row>
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
    },
    productsLoading() {
      return this.$store.state.productsLoading;
    },
    productsError() {
      return this.$store.state.productsError;
    }
  },
  methods: {
    retry() {
      this.$store.dispatch("fetchProducts");
    }
  }
};
</script>

<style scoped>
.products-error {
  text-align: center;
  padding: 80px 0;
}

.products-error__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 16px 0 8px;
}

.products-error__sub {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 24px;
}
</style>
