import Vue from 'vue'
import Vuex from 'vuex'
import { resolveInclude } from 'ejs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [
    ],
    user: {
      isLoggedIn: false,
      name: 'Customer',
      shipping: []
    }
  },
  mutations: {
    userData(state, payload) {
      state.user = payload
    },
    cartData(state, payload) {
      state.cart = payload
    },
    addItem(state, payload) {
      var match = state.cart.find(item => {
        return item.item_num === payload.item_num
      });
      if (match) {
        match.quantity += payload.quantity
      } else {
        state.cart.push(payload);
      }
    },
    removeItem(state, payload) {
      state.cart = state.cart.filter(item => item.item_num !== payload)
    },
    updateAddressList(state, payload) {
      state.user.shipping = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
