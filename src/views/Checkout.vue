<template>
  <div class="page-container">
    <h1 class="page-title">Review Your Order</h1>

    <div class="checkout-layout">
      <!-- Left: order details -->
      <div class="checkout-main">
        <!-- Cart items -->
        <div class="checkout-section">
          <h2 class="checkout-section__title">Items</h2>
          <app-cart :embedded="true"></app-cart>
        </div>
      </div>

      <!-- Right: sidebar -->
      <div class="checkout-sidebar">
        <!-- Shipping address -->
        <div class="checkout-card">
          <div class="checkout-card__header">
            <h2 class="checkout-card__title">Shipping Address</h2>
            <v-btn
              text
              x-small
              color="accent"
              class="checkout-card__action"
              @click.prevent="showAddresses = true"
            >
              {{ currentShipTo.address ? 'Change' : 'Add' }}
            </v-btn>
          </div>

          <div v-if="currentShipTo.address" class="checkout-address">
            <p>{{ currentShipTo.name }}</p>
            <p>{{ currentShipTo.address }}</p>
            <p>{{ currentShipTo.city }}, {{ currentShipTo.state }} {{ currentShipTo.zip }}</p>
          </div>
          <p v-else class="checkout-card__empty">No address on file.</p>
        </div>

        <!-- Payment -->
        <div class="checkout-card">
          <div class="checkout-card__header">
            <h2 class="checkout-card__title">Payment</h2>
          </div>

          <div v-if="card" class="checkout-payment">
            <v-icon small color="secondary" class="mr-1">mdi-credit-card-outline</v-icon>
            <span>{{ card.type }} ending in {{ card.number.slice(-4) }}</span>
            <p class="checkout-payment__exp">Exp: {{ card.exp }}</p>
          </div>
          <p v-else class="checkout-card__empty checkout-card__demo-note">
            Payment is not implemented in this demo.
          </p>
        </div>

        <!-- Place order -->
        <v-btn
          color="primary"
          large
          depressed
          block
          class="checkout-place-order"
          disabled
        >
          Place Order
        </v-btn>
        <p class="checkout-demo-note">
          Order placement is not implemented in this demo.
        </p>
      </div>
    </div>

    <shipping-list
      v-if="showAddresses"
      :openDialog="showAddresses"
      v-on:close="showAddresses = false"
    ></shipping-list>
  </div>
</template>

<script>
import AppCart from "@/views/Cart";
import ShippingList from "@/components/ShippingList";

export default {
  components: { AppCart, ShippingList },
  data() {
    return { showAddresses: false };
  },
  computed: {
    card() {
      return this.$store.state.user.cards
        ? this.$store.state.user.cards[0]
        : null;
    },
    currentShipTo() {
      const user = this.$store.state.user;
      if (user.shipping && user.shipping.length > 0) {
        return user.shipping.find(x => x.default) || user;
      }
      return user;
    }
  }
};
</script>

<style scoped>
.checkout-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .checkout-layout {
    flex-direction: column-reverse;
  }
}

.checkout-main {
  flex: 1;
  min-width: 0;
}

.checkout-sidebar {
  width: 300px;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .checkout-sidebar {
    width: 100%;
  }
}

.checkout-section__title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
}

.checkout-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px 20px;
  background: #fff;
  margin-bottom: 16px;
}

.checkout-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.checkout-card__title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
}

.checkout-card__action {
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.8rem;
}

.checkout-card__empty {
  font-size: 0.85rem;
  color: #9ca3af;
  margin: 0;
}

.checkout-card__demo-note {
  font-style: italic;
}

.checkout-address p,
.checkout-payment span {
  font-size: 0.875rem;
  color: #374151;
  margin: 2px 0;
}

.checkout-payment {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #374151;
  flex-wrap: wrap;
}

.checkout-payment__exp {
  width: 100%;
  font-size: 0.78rem;
  color: #9ca3af;
  margin: 4px 0 0;
}

.checkout-place-order {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 600;
}

.checkout-demo-note {
  font-size: 0.75rem;
  color: #9ca3af;
  text-align: center;
  margin-top: 8px;
  font-style: italic;
}
</style>
