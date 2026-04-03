import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    user: {
      isLoggedIn: false,
      name: 'Customer',
      shipping: []
    }
  },
  getters: {
    productById: (state) => (id) => {
      return state.products.find(p => p.item_num === id)
    },
    cartTotal(state) {
      return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    cartItemCount(state) {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0)
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    userData(state, payload) {
      state.user = payload
    },
    cartData(state, payload) {
      state.cart = payload
    },
    addItem(state, payload) {
      const match = state.cart.find(item => item.item_num === payload.item_num)
      if (match) {
        match.quantity += payload.quantity
      } else {
        state.cart.push(payload)
      }
    },
    removeItem(state, payload) {
      state.cart = state.cart.filter(item => item.item_num !== payload)
    },
    updateAddressList(state, payload) {
      state.user.shipping = payload
    },
    setDefaultAddress(state, index) {
      state.user.shipping = state.user.shipping.map((addr, i) => ({
        ...addr,
        default: i === index
      }))
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return fetch('./json/MOCK_DATA.json')
        .then(res => res.json())
        .then(data => commit('setProducts', data))
    }
  },
  modules: {}
})
