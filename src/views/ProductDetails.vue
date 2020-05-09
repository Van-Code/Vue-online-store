<template>
  <div class="product_detail" v-if="product">
    <v-snackbar v-model="snackbar" top :timeout="3000" color="cyan darken-3">
      {{ successMsg }}
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-card :ref="product.item_num">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="6">
            <v-img class="white--text align-end" :height="500" :width="500" :src="product.image" />
          </v-col>
          <v-col cols="6">
            <v-card-title>{{product.name}}</v-card-title>
            <v-card-subtitle>{{product.description}}</v-card-subtitle>
            <v-card-subtitle>Item {{product.item_num}}</v-card-subtitle>
            <v-card-text class="text--primary">
              <div>${{product.price}}</div>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn color="orange" text>Share</v-btn> -->

              <v-select
                :items="quantityDDL"
                :v-model="quantityModel"
                placeholder="Qty: 1"
                class="col-2 pb-0"
                @change="updateQty"
              ></v-select>

              <v-btn @click.prevent="addProduct">Add to Cart</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  props: { products: { type: Array, default: Array, required: true } },
  data() {
    const QuantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return {
      quantityDDL: QuantityArray,
      quantityModel: QuantityArray[0],
      snackbar: false,
      successMsg: ""
    };
  },
  computed: {
    product: function() {
      const that = this;
      return this.products.find(product => {
        return product.item_num === that.$route.params.value1;
      });
    }
  },
  methods: {
    addProduct: function() {
      this.$store.commit("addItem", {
        quantity: this.quantityModel,
        item_num: this.product.item_num,
        price: this.product.price
      });
      this.successMsg = `${this.product.name} has been added to your cart`;
      this.snackbar = true;
    },
    updateQty: function(num) {
      this.quantityModel = num;
    }
  }
};
</script>