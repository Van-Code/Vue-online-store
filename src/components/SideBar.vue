<template>
  <div class="sidebar">
    Company:
    <v-checkbox
      type="checkbox"
      v-model="model"
      v-for="(product, i) in products"
      :key="i"
      :label="product.company"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  props: { products: { type: Array, default: Array, required: true } },
  data() {
    return { model: false }
  }
}
</script>
