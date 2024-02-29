<template>
  <div>
    <v-toolbar flat dark color="primary">
      <v-toolbar-title>Enter an address</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-text-field label="Full Name" single-line v-model="name"></v-text-field>
        <v-text-field label="Street Address" single-line v-model="address"></v-text-field>
        <v-text-field label="Zip code" single-line v-model="zip"></v-text-field>
        <v-text-field label="City" single-line v-model="city"></v-text-field>
        <v-text-field label="State" single-line v-model="state"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn class="col-2 offset-md-8" @click.prevent="$emit('close')">Cancel</v-btn>
        <v-btn class="col-2 white--text black" @click="saveAddress">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: { addresses: Array, required: false, default: false },
  data() {
    //add your own validation
    return {
      addAddress: false,
      name: '',
      address: '',
      zip: '',
      city: '',
      state: ''
    }
  },
  methods: {
    saveAddress: function () {
      let obj = new Object()
      ;['name', 'address', 'zip', 'city', 'state'].forEach((prop) => {
        obj[prop] = this[prop]
      })
      this.addresses.push(obj)
      this.$store.commit('updateAddressList', this.addresses)
      this.$emit('close')
    }
  }
}
</script>
