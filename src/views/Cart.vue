<template>
  <!-- Embedded mode: just the item list, no chrome (used inside Checkout) -->
  <div v-if="embedded" class="cart-items">
    <template v-for="(item, i) in items">
      <product-item
        v-if="productById(item.item_num)"
        :key="i"
        :product="productById(item.item_num)"
      ></product-item>
    </template>
  </div>

  <!-- Full page mode -->
  <div v-else class="page-container">
    <template v-if="items.length > 0">
      <h1 class="page-title">Shopping Cart</h1>

      <div class="cart-layout">
        <div class="cart-items">
          <template v-for="(item, i) in items">
            <product-item
              v-if="productById(item.item_num)"
              :key="i"
              :product="productById(item.item_num)"
            ></product-item>
          </template>
        </div>

        <div class="cart-summary">
          <div class="cart-summary__card">
            <h2 class="cart-summary__title">Order Summary</h2>

            <div class="cart-summary__row">
              <span>Items ({{ cartItemCount }})</span>
              <span>${{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="cart-summary__row">
              <span>Shipping</span>
              <span class="cart-summary__free">Free</span>
            </div>

            <hr class="section-divider" />

            <div class="cart-summary__row cart-summary__total">
              <span>Total</span>
              <span>${{ cartTotal.toFixed(2) }}</span>
            </div>

            <v-btn
              color="primary"
              large
              depressed
              block
              :to="{ path: isLoggedIn ? '/checkout' : '/signin', query: { redirectPath: 'checkout' } }"
              class="cart-summary__cta"
            >
              Proceed to Checkout
            </v-btn>

            <v-btn
              text
              block
              to="/"
              class="cart-summary__continue"
            >
              Continue Shopping
            </v-btn>
          </div>
        </div>
      </div>
    </template>

    <!-- Empty cart -->
    <div v-else class="cart-empty">
      <v-icon size="64" color="#d1d5db">mdi-cart-outline</v-icon>
      <h2 class="cart-empty__title">Your cart is empty</h2>
      <p class="cart-empty__sub">Looks like you haven't added anything yet.</p>
      <v-btn color="primary" depressed large to="/">Start Shopping</v-btn>
    </div>
  </div>
</template>

<script>
import ProductItem from "../components/ProductItem";

export default {
  name: "Cart",
  components: { ProductItem },
  props: {
    embedded: { type: Boolean, default: false }
  },
  computed: {
    items() {
      return this.$store.state.cart;
    },
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
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

<style scoped>
.cart-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .cart-layout {
    flex-direction: column;
  }
}

.cart-items {
  flex: 1;
  min-width: 0;
}

/* ─── Summary card ─── */
.cart-summary {
  width: 300px;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .cart-summary {
    width: 100%;
  }
}

.cart-summary__card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  background: #fff;
}

.cart-summary__title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.cart-summary__row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 10px;
}

.cart-summary__free {
  color: #16a34a;
  font-weight: 500;
}

.cart-summary__total {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0;
}

.cart-summary__cta {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 8px;
}

.cart-summary__continue {
  text-transform: none;
  letter-spacing: 0;
  color: #6b7280 !important;
  font-size: 0.85rem;
}

/* ─── Empty state ─── */
.cart-empty {
  text-align: center;
  padding: 80px 0;
}

.cart-empty__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 16px 0 8px;
}

.cart-empty__sub {
  color: #6b7280;
  margin-bottom: 24px;
}
</style>
