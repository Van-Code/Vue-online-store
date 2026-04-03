<template>
  <div class="addr-form">
    <div class="addr-form__header">
      <h2 class="addr-form__title">Add an Address</h2>
      <v-btn icon @click="$emit('close')" aria-label="Close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <div class="addr-form__body">
      <v-text-field
        v-model="fields.name"
        label="Full Name"
        outlined
        dense
        hide-details="auto"
        :error-messages="errors.name"
        class="addr-form__field"
        @blur="touch('name')"
      ></v-text-field>

      <v-text-field
        v-model="fields.address"
        label="Street Address"
        outlined
        dense
        hide-details="auto"
        :error-messages="errors.address"
        class="addr-form__field"
        @blur="touch('address')"
      ></v-text-field>

      <div class="addr-form__row">
        <v-text-field
          v-model="fields.city"
          label="City"
          outlined
          dense
          hide-details="auto"
          :error-messages="errors.city"
          class="addr-form__field"
          @blur="touch('city')"
        ></v-text-field>

        <v-text-field
          v-model="fields.state"
          label="State"
          outlined
          dense
          hide-details="auto"
          :error-messages="errors.state"
          class="addr-form__field addr-form__field--sm"
          @blur="touch('state')"
        ></v-text-field>

        <v-text-field
          v-model="fields.zip"
          label="ZIP"
          outlined
          dense
          hide-details="auto"
          :error-messages="errors.zip"
          class="addr-form__field addr-form__field--sm"
          @blur="touch('zip')"
        ></v-text-field>
      </div>
    </div>

    <div class="addr-form__actions">
      <v-btn text @click.prevent="$emit('close')">Cancel</v-btn>
      <v-btn
        color="primary"
        depressed
        :disabled="!isValid"
        @click="saveAddress"
      >Save Address</v-btn>
    </div>
  </div>
</template>

<script>
const REQUIRED = "This field is required.";

export default {
  props: {
    addresses: { type: Array, default: () => [] }
  },
  data() {
    return {
      fields: { name: "", address: "", city: "", state: "", zip: "" },
      touched: { name: false, address: false, city: false, state: false, zip: false }
    };
  },
  computed: {
    errors() {
      return {
        name:    this.touched.name    && !this.fields.name.trim()    ? [REQUIRED] : [],
        address: this.touched.address && !this.fields.address.trim() ? [REQUIRED] : [],
        city:    this.touched.city    && !this.fields.city.trim()    ? [REQUIRED] : [],
        state:   this.touched.state   && !this.fields.state.trim()   ? [REQUIRED] : [],
        zip:     this.touched.zip     && !this.fields.zip.trim()     ? [REQUIRED] : []
      };
    },
    isValid() {
      return Object.values(this.fields).every(v => v.trim().length > 0);
    }
  },
  methods: {
    touch(field) {
      this.touched[field] = true;
    },
    saveAddress() {
      Object.keys(this.touched).forEach(k => (this.touched[k] = true));
      if (!this.isValid) return;
      this.$emit("add", { ...this.fields });
    }
  }
};
</script>

<style scoped>
.addr-form {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.addr-form__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid #e5e7eb;
}

.addr-form__title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.addr-form__body {
  padding: 20px;
}

.addr-form__field {
  margin-bottom: 14px;
}

.addr-form__row {
  display: flex;
  gap: 10px;
}

.addr-form__row .addr-form__field {
  flex: 1;
}

.addr-form__field--sm {
  flex: 0 0 90px !important;
}

.addr-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 20px 16px;
  border-top: 1px solid #e5e7eb;
}

.addr-form__actions .v-btn {
  text-transform: none;
  letter-spacing: 0;
}
</style>
