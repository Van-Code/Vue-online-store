<template>
  <div class="page-container">
    <v-snackbar v-model="snackbar" top :timeout="3000" color="success">
      {{ successMsg }}
      <template v-slot:action>
        <v-btn text @click="snackbar = false">Dismiss</v-btn>
      </template>
    </v-snackbar>

    <div v-if="product" class="product-detail">
      <v-btn text small :to="'/'" class="product-detail__back">
        <v-icon small left>mdi-arrow-left</v-icon>
        Back to products
      </v-btn>

      <div class="product-detail__layout">
        <div class="product-detail__image-wrap">
          <v-img
            :src="product.image"
            :alt="product.name"
            max-height="480"
            contain
            class="product-detail__image"
          />
        </div>

        <div class="product-detail__info">
          <p class="product-detail__company">{{ product.company }}</p>
          <h1 class="product-detail__name">{{ product.name }}</h1>
          <p class="product-detail__description">{{ product.description }}</p>

          <div class="product-detail__price">${{ product.price.toFixed(2) }}</div>

          <div class="product-detail__actions">
            <v-select
              :items="quantityDDL"
              v-model="quantityModel"
              label="Qty"
              outlined
              dense
              hide-details
              class="product-detail__qty"
            ></v-select>

            <v-btn
              color="primary"
              large
              depressed
              class="product-detail__add-btn"
              @click="addProduct"
            >
              <v-icon left>mdi-cart-plus</v-icon>
              Add to Cart
            </v-btn>
          </div>

          <p class="product-detail__item-num">Item #{{ product.item_num }}</p>
        </div>
      </div>
    </div>

    <div v-else class="product-detail--not-found">
      <p>Product not found.</p>
      <v-btn color="primary" depressed to="/">Back to Shop</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantityDDL: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      quantityModel: 1,
      snackbar: false,
      successMsg: ""
    };
  },
  computed: {
    product() {
      return this.$store.getters.productById(this.$route.params.value1);
    }
  },
  methods: {
    addProduct() {
      this.$store.commit("addItem", {
        quantity: this.quantityModel,
        item_num: this.product.item_num,
        price: this.product.price
      });
      this.successMsg = `${this.product.name} added to cart`;
      this.snackbar = true;
    }
  }
};
</script>

<style scoped>
.product-detail__back {
  text-transform: none;
  letter-spacing: 0;
  margin-bottom: 24px;
  color: #6b7280 !important;
}

.product-detail__layout {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .product-detail__layout {
    flex-direction: column;
  }
}

.product-detail__image-wrap {
  flex: 1;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.product-detail__image {
  width: 100%;
}

.product-detail__info {
  flex: 1;
  padding-top: 8px;
}

.product-detail__company {
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.product-detail__name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  line-height: 1.3;
}

.product-detail__description {
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 24px;
}

.product-detail__price {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
}

.product-detail__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.product-detail__qty {
  max-width: 90px;
}

.product-detail__add-btn {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 600;
  flex: 1;
}

.product-detail__item-num {
  font-size: 0.78rem;
  color: #9ca3af;
}

.product-detail--not-found {
  text-align: center;
  padding: 80px 0;
  color: #6b7280;
}
</style>
