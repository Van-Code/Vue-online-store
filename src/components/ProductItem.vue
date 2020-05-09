 <template>
  <router-link :to="`product/${product.item_num}`" class="product-item">
    <v-card
      :ref="product.item_num"
      :class="{'cartRow mb-4 align-center':isCartPage,'notCart':!isCartPage}"
    >
      <v-img
        class="white--text"
        :class="{'d-flex':isCartPage}"
        :height="height"
        :width="width"
        :src="product.image"
        :cols="isCartPage ? 3 :'auto'"
      />
      <v-col :cols="isCartPage ? 6 :'auto'">
        <v-card-title :class="{'text-left':isCartPage}">{{product.name}}</v-card-title>
        <v-card-text class="text-left">{{product.description}}</v-card-text>
        <div class="row col-12 text-left" v-if="isCartPage">
          <v-btn text @click.prevent="clickRemove">Remove</v-btn>
        </div>
      </v-col>
      <v-col :cols="isCartPage ? 3 :'auto'" :class="{'align-center':isCartPage}">
        <v-card-text :class="{'text--primary':true,'text-right':isCartPage}">
          <div class :class="{'col-12 d-flex text-right':isCartPage, 'text-left': !isCartPage}">
            <div v-if="isCartPage" class="col-6">Qty: {{quantity}}</div>
            <strong
              :class="{'col-6':isCartPage }"
            >${{isCartPage ? product.price * quantity : product.price}}</strong>
          </div>
          <em v-if="quantity>1" class="col-12">(${{product.price}} each)</em>
        </v-card-text>
      </v-col>
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: "ProductItem",
  props: { product: { type: Object, default: Object, required: true } },
  components: {},
  data() {
    const isCartPage =
      this.$route.name === "Cart" || this.$route.name === "CheckOut";
    return {
      isCartPage: isCartPage,
      width: isCartPage ? "100" : "auto",
      height: isCartPage ? "100" : "200"
    };
  },
  computed: {
    quantity: function() {
      if (this.$store.state.cart.length > 0) {
        const item = this.$store.state.cart.find(item => {
          return this.product.item_num === item.item_num;
        });
        if (item) {
          return item.quantity;
        }
      }
    }
  },
  methods: {
    clickRemove: function() {
      this.$store.commit("removeItem", this.product.item_num);
    }
  }
};
</script>
<style lang="sass" scoped>
.product-item
  text-decoration: none
  color: initial
.cartRow
  display: flex
  box-shadow: none
  border-bottom: 1px solid #ccc
  .v-image
    display: inline-block

.notCart .v-card__title
  display: -webkit-box
  -webkit-line-clamp: 2
  overflow: hidden
  text-overflow: ellipsis
  -webkit-box-orient: vertical
  overflow: hidden
  position: relative
  cursor: pointer
  max-height: 80px
  min-height: 80px
  line-height: 20px

.notCart .v-card__text
  display: -webkit-box
  -webkit-line-clamp: 2
  overflow: hidden
  text-overflow: ellipsis
  -webkit-box-orient: vertical
  overflow: hidden
  position: relative
  cursor: pointer
  max-height: 32px
  font-size: 12px
  line-height: 16px
</style>