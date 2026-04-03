import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:value1",
    name: "ProductDetails",
    component: () => import("../views/ProductDetails.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/checkout",
    name: "CheckOut",
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if (!store.state.user.isLoggedIn) {
        next({ path: "/signin", query: { redirectPath: "checkout" } });
      } else {
        next();
      }
    },
    component: () => import("../views/Checkout.vue"),
  },
];

const router = new VueRouter({ routes });

export default router;
