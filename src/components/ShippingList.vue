<template>
  <v-dialog width="560" v-model="showAddresses">
    <!-- Address list -->
    <div v-if="!createNewAddress" class="addr-dialog">
      <div class="addr-dialog__header">
        <h2 class="addr-dialog__title">Your Addresses</h2>
        <v-btn icon @click="showAddresses = false" aria-label="Close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="addr-dialog__body">
        <!-- Empty state -->
        <div v-if="addresses.length === 0" class="addr-dialog__empty">
          <v-icon size="40" color="#d1d5db">mdi-map-marker-off-outline</v-icon>
          <p>No addresses saved yet.</p>
        </div>

        <!-- Address rows -->
        <div
          v-for="(addy, i) in addresses"
          :key="i"
          class="addr-row"
          :class="{ 'addr-row--default': addy.default }"
        >
          <div class="addr-row__info">
            <div class="addr-row__name">
              {{ addy.name }}
              <span v-if="addy.default" class="addr-row__badge">Default</span>
            </div>
            <div class="addr-row__line">{{ addy.address }}</div>
            <div class="addr-row__line">{{ addy.city }}, {{ addy.state }} {{ addy.zip }}</div>
          </div>

          <div class="addr-row__actions">
            <v-btn
              small
              depressed
              color="primary"
              class="addr-row__use-btn"
              :disabled="addy.default"
              @click="selectAddress(i)"
            >
              {{ addy.default ? 'Selected' : 'Use this' }}
            </v-btn>

            <v-btn
              icon
              small
              color="error"
              :aria-label="`Delete ${addy.name}`"
              @click="askConfirmDel(i)"
            >
              <v-icon small>mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>

          <!-- Inline delete confirmation -->
          <div v-if="deleteNum === i" class="addr-row__confirm">
            <span>Delete this address?</span>
            <div class="addr-row__confirm-actions">
              <v-btn text x-small @click.prevent="deleteNum = false">Cancel</v-btn>
              <v-btn text x-small color="error" @click.prevent="deleteAddress(addy)">Delete</v-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="addr-dialog__footer">
        <v-btn
          text
          small
          color="accent"
          class="addr-dialog__add-btn"
          @click="createNewAddress = true"
        >
          <v-icon small left>mdi-plus</v-icon>
          Add a new address
        </v-btn>
      </div>
    </div>

    <!-- Add new address form -->
    <shipping-add
      v-if="createNewAddress"
      :addresses="addresses"
      v-on:close="createNewAddress = false"
      v-on:add="onAddAddress"
    ></shipping-add>
  </v-dialog>
</template>

<script>
import ShippingAdd from "@/components/ShippingAdd";

export default {
  props: { openDialog: { type: Boolean, default: false } },
  data() {
    return {
      showAddresses: this.openDialog,
      deleteNum: false,
      createNewAddress: false
    };
  },
  components: { ShippingAdd },
  computed: {
    addresses() {
      return this.$store.state.user.shipping;
    }
  },
  watch: {
    showAddresses(val) {
      if (!val) this.$emit("close");
    }
  },
  methods: {
    selectAddress(i) {
      this.$store.commit("setDefaultAddress", i);
      this.$emit("close");
    },
    askConfirmDel(i) {
      this.deleteNum = i;
    },
    deleteAddress(model) {
      const filtered = this.addresses.filter(item => item !== model);
      this.$store.commit("updateAddressList", filtered);
      this.deleteNum = false;
    },
    onAddAddress(newAddress) {
      const updated = [...this.addresses, newAddress];
      this.$store.commit("updateAddressList", updated);
      this.createNewAddress = false;
    }
  }
};
</script>

<style scoped>
.addr-dialog {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.addr-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid #e5e7eb;
}

.addr-dialog__title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.addr-dialog__body {
  padding: 8px 0;
  max-height: 400px;
  overflow-y: auto;
}

.addr-dialog__empty {
  text-align: center;
  padding: 32px 20px;
  color: #9ca3af;
  font-size: 0.875rem;
}

.addr-dialog__empty p {
  margin-top: 8px;
}

/* ─── Address row ─── */
.addr-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.15s;
  gap: 12px;
}

.addr-row:last-child {
  border-bottom: none;
}

.addr-row--default {
  background: #f8faff;
}

.addr-row__info {
  flex: 1;
  min-width: 0;
}

.addr-row__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.addr-row__badge {
  font-size: 0.7rem;
  font-weight: 600;
  background: #dbeafe;
  color: #1d4ed8;
  padding: 1px 6px;
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.addr-row__line {
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.5;
}

.addr-row__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.addr-row__use-btn {
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.8rem;
}

/* ─── Inline delete confirm ─── */
.addr-row__confirm {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.96);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.875rem;
  color: #111827;
  font-weight: 500;
}

.addr-row__confirm-actions {
  display: flex;
  gap: 4px;
}

.addr-row__confirm-actions .v-btn {
  text-transform: none;
  letter-spacing: 0;
}

/* ─── Footer ─── */
.addr-dialog__footer {
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
}

.addr-dialog__add-btn {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 500;
}
</style>
