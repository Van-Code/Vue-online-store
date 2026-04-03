<template>
  <router-link :to="`product/${product.item_num}`" class="product-item">
    <v-card
      :ref="product.item_num"
      :class="{ 'cartRow mb-4 align-center': isCartPage, 'notCart': !isCartPage }"
    >
      <v-img
        class="white--text"
        :class="{ 'd-flex': isCartPage }"
        :height="isCartPage ? 100 : 200"
        :width="isCartPage ? 100 : 'auto'"
        :src="product.image"
      />
      <v-col :cols="isCartPage ? 6 : 'auto'">
        <v-card-title :class="{ 'text-left': isCartPage }">{{ product.name }}</v-card-title>
        <v-card-text class="text-left">{{ product.description }}</v-card-text>
        <div class="row col-12 text-left" v-if="isCartPage">
          <v-btn text @click.prevent="clickRemove">Remove</v-btn>
        </div>
      </v-col>
      <v-col :cols="isCartPage ? 3 : 'auto'" :class="{ 'align-center': isCartPage }">
        <v-card-text :class="{ 'text--primary': true, 'text-right': isCartPage }">
          <div :class="{ 'col-12 d-flex text-right': isCartPage, 'text-left': !isCartPage }">
            <div v-if="isCartPage" class="col-6">Qty: {{ quantity }}</div>
            <strong :class="{ 'col-6': isCartPage }">
              ${{ isCartPage ? product.price * quantity : product.price }}
            </strong>
          </div>
          <em v-if="quantity > 1" class="col-12">(${{ product.price }} each)</em>
        </v-card-text>
      </v-col>
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    product: { type: Object, required: true }
  },
  computed: {
    isCartPage() {
      return this.$route.name === "Cart" || this.$route.name === "CheckOut";
    },
    quantity() {
      const item = this.$store.state.cart.find(
        item => item.item_num === this.product.item_num
      );
      return item ? item.quantity : 0;
    }
  },
  methods: {
    clickRemove() {
      this.$store.commit("removeItem", this.product.item_num);
    }
  }
};
</script>

<style lang="sass" scoped>
.product-item
  text-decoration: none
  color: initial

.cartRow
  display: flex
  box-shadow: none
  border-bottom: 1px solid #ccc
  .v-image
    display: inline-block

.notCart .v-card__title
  display: -webkit-box
  -webkit-line-clamp: 2
  overflow: hidden
  text-overflow: ellipsis
  -webkit-box-orient: vertical
  position: relative
  cursor: pointer
  max-height: 80px
  min-height: 80px
  line-height: 20px

.notCart .v-card__text
  display: -webkit-box
  -webkit-line-clamp: 2
  overflow: hidden
  text-overflow: ellipsis
  -webkit-box-orient: vertical
  position: relative
  cursor: pointer
  max-height: 32px
  font-size: 12px
  line-height: 16px
</style>
