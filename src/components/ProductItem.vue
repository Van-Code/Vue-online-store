<template>
  <!-- Cart / checkout row layout -->
  <div v-if="isCartPage" class="cart-row">
    <v-img
      :src="product.image"
      width="80"
      height="80"
      class="cart-row__img"
    />
    <div class="cart-row__info">
      <div class="cart-row__name">{{ product.name }}</div>
      <div class="cart-row__meta">Qty: {{ quantity }}</div>
      <v-btn
        text
        x-small
        color="error"
        class="cart-row__remove"
        @click.prevent="clickRemove"
      >Remove</v-btn>
    </div>
    <div class="cart-row__price">
      <strong>${{ (product.price * quantity).toFixed(2) }}</strong>
      <span v-if="quantity > 1" class="cart-row__unit">${{ product.price.toFixed(2) }} each</span>
    </div>
  </div>

  <!-- Product grid card -->
  <router-link v-else :to="`product/${product.item_num}`" class="product-card-link">
    <v-card class="product-card" outlined>
      <v-img
        :src="product.image"
        height="200"
        class="product-card__img"
      />
      <div class="product-card__body">
        <div class="product-card__name">{{ product.name }}</div>
        <div class="product-card__desc">{{ product.description }}</div>
        <div class="product-card__footer">
          <span class="product-card__price">${{ product.price.toFixed(2) }}</span>
        </div>
      </div>
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

<style scoped>
/* ─── Product grid card ─── */
.product-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10) !important;
  transform: translateY(-2px);
}

.product-card__img {
  border-radius: 7px 7px 0 0;
  background: #f3f4f6;
}

.product-card__body {
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-card__name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em;
  margin-bottom: 4px;
}

.product-card__desc {
  font-size: 0.78rem;
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  flex: 1;
  margin-bottom: 12px;
}

.product-card__footer {
  margin-top: auto;
}

.product-card__price {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}

/* ─── Cart row ─── */
.cart-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
}

.cart-row__img {
  border-radius: 6px;
  background: #f3f4f6;
  flex-shrink: 0;
}

.cart-row__info {
  flex: 1;
  min-width: 0;
}

.cart-row__name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.cart-row__meta {
  font-size: 0.8rem;
  color: #6b7280;
}

.cart-row__remove {
  padding: 0 !important;
  margin-top: 4px;
  text-transform: none;
  letter-spacing: 0;
}

.cart-row__price {
  text-align: right;
  flex-shrink: 0;
}

.cart-row__price strong {
  display: block;
  font-size: 0.95rem;
  color: #111827;
}

.cart-row__unit {
  display: block;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 2px;
}
</style>
