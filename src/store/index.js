import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productsLoading: false,
    productsError: null,
    cart: [],
    user: {
      isLoggedIn: false,
      name: "Customer",
      shipping: [],
    },
  },
  getters: {
    productById: (state) => (id) => {
      return state.products.find((p) => p.item_num === id);
    },
    cartTotal(state) {
      return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    cartItemCount(state) {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setProductsLoading(state, val) {
      state.productsLoading = val;
    },
    setProductsError(state, err) {
      state.productsError = err;
    },
    userData(state, payload) {
      state.user = payload;
    },
    cartData(state, payload) {
      state.cart = payload;
    },
    addItem(state, payload) {
      const match = state.cart.find((item) => item.item_num === payload.item_num);
      if (match) {
        match.quantity += payload.quantity;
      } else {
        state.cart.push(payload);
      }
    },
    removeItem(state, payload) {
      state.cart = state.cart.filter((item) => item.item_num !== payload);
    },
    updateAddressList(state, payload) {
      state.user.shipping = payload;
    },
    setDefaultAddress(state, index) {
      state.user.shipping = state.user.shipping.map((addr, i) => ({
        ...addr,
        default: i === index,
      }));
    },
  },
  actions: {
    fetchProducts({ commit }) {
      commit("setProductsLoading", true);
      commit("setProductsError", null);
      return fetch("https://dummyjson.com/products?limit=40")
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
          return res.json();
        })
        .then((data) => {
          const normalized = data.products.map((p) => ({
            id: p.id,
            item_num: p.sku,
            name: p.title,
            company: p.brand,
            image: p.thumbnail,
            price: p.price,
            stock: p.stock,
            description: p.description,
            category: p.category,
          }));
          commit("setProducts", normalized);
        })
        .catch((err) => {
          commit("setProductsError", err.message || "Could not load products.");
        })
        .finally(() => {
          commit("setProductsLoading", false);
        });
    },
  },
  modules: {},
});
