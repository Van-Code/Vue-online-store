<template>
  <v-dialog width="600" v-model="showAddresses">
    <v-toolbar flat dark color="primary" v-if="!createNewAddress">
      <v-toolbar-title>Choose an address</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="showAddresses = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card v-if="!createNewAddress">
      <v-card-text v-for="(addy, i) in addresses" :key="i" class="d-flex row">
        <div class="col-7">
          <div>{{ addy.name }}</div>
          <div>{{ addy.address }}</div>
          <div>{{ addy.city }}</div>
          <div>{{ addy.state }}</div>
          <div>{{ addy.zip }}</div>
        </div>
        <div class="col-5 row">
          <v-btn class="col-12" @click="selectAddress(i)">Use this Address</v-btn>
          <v-row>
            <v-col cols="6">
              <v-btn class="col-12">Edit</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn class="col-12" @click="askConfirmDel(i)">Delete</v-btn>
            </v-col>
          </v-row>
        </div>
        <div v-if="deleteNum === i" class="col-12 text-center confirm">
          <v-card elevation="0">
            <v-card-title>Delete this address?</v-card-title>
            <div>
              <v-btn @click.prevent="deleteNum = false">No</v-btn>
              <v-btn @click.prevent="deleteAddress(addy)" color="black white--text">Delete</v-btn>
            </div>
          </v-card>
        </div>
      </v-card-text>
      <v-btn text link small @click="createNewAddress = true">+ Add an Address</v-btn>
    </v-card>

    <shipping-add
      :addresses="addresses"
      v-if="createNewAddress"
      v-on:close="createNewAddress = false"
    ></shipping-add>
  </v-dialog>
</template>
<script>
import ShippingAdd from '@/views/ShippingAdd'
export default {
  props: { openDialog: Boolean, required: false, default: false },
  data() {
    return {
      showAddresses: this.openDialog,
      deleteNum: false,
      createNewAddress: false
    }
  },
  components: { ShippingAdd },
  computed: {
    addresses: function () {
      return this.$store.state.user.shipping.length > 0 ? this.$store.state.user.shipping : []
    }
  },
  methods: {
    selectAddress: function (i) {
      this.$store.state.user.shipping.map((x) => (x.default = false))
      this.$store.state.user.shipping[i].default = true
      this.$emit('close')
    },
    askConfirmDel: function (i) {
      this.deleteNum = i
    },
    deleteAddress: function (model) {
      const filteredItems = this.addresses.filter((item) => item !== model)
      this.$store.commit('updateAddressList', filteredItems)
      this.deleteNum = false
    }
  }
}
</script>
<style lang="sass" scoped>
.confirm
  opacity: 0.8
  position: absolute
  background-color: #fff
</style>
