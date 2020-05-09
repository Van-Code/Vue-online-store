<template>
  <div class="checkout container">
    <h2>Double check your order details</h2>
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto" flat>
          <v-card-title>Shipping Address</v-card-title>
          <v-card-text>
            <div>{{currentShipTo.name}}</div>
            <div>{{currentShipTo.address}}</div>
            <div>{{currentShipTo.city}}</div>
            <div>{{currentShipTo.state}}</div>
            <div>{{currentShipTo.zip}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              @click.prevent="showAddresses=true"
            >{{currentShipTo.address?'Change' :'Add'}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" flat>
          <v-card-title>Payment Method</v-card-title>
          <v-card-text v-if="card">
            <div>{{card.type}}</div>
            <div>ending in {{card.number.slice(-4)}}</div>
            <div>Exp: {{card.exp}}</div>
          </v-card-text>
          <v-card-text v-else>
            <v-btn>Add Card</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <hr />
        <app-cart :products="products"></app-cart>
      </v-col>
    </v-row>
    <shipping-list
      v-if="showAddresses"
      :openDialog="showAddresses"
      v-on:close="showAddresses=false"
    ></shipping-list>
  </div>
</template>
<script>
import AppCart from "@/views/Cart";
import ShippingList from "@/views/ShippingList";
export default {
  props: { products: { type: Array, default: Array, required: true } },
  components: { AppCart, ShippingList },
  data() {
    return {
      showAddresses: false
    };
  },
  computed: {
    user: function() {
      return this.$store.state.user;
    },
    card: function() {
      return this.$store.state.user.cards
        ? this.$store.state.user.cards[0]
        : false;
    },
    currentShipTo: function() {
      let currentShipTo = this.$store.state.user;
      if (this.$store.state.user.shipping.length > 0) {
        currentShipTo = this.$store.state.user.shipping.find(x => x.default);
      }
      return currentShipTo;
    }
  }
};
</script>