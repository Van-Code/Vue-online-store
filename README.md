# Van-Code Store

A fully functional single-page ecommerce application built with Vue 2 and Vuetify. Covers the core shopping experience from product browsing to cart management, authentication, and shipping address management.

Live demo: https://van-code.github.io/Vue-online-store/#/

---

## Features

- **Product catalog** — grid layout with image, name, description, and price
- **Product detail page** — full description, quantity selector, add-to-cart with confirmation
- **Shopping cart** — line items with quantity and subtotals, order summary sidebar, empty state
- **Authentication** — sign in (demo) and create account with email/name validation
- **Checkout** — order review with shipping address and payment summary
- **Shipping address management** — add multiple addresses, set a default, delete with confirmation
- **Persistent cart badge** — live count of total items across the app
- **Responsive layout** — collapses gracefully on mobile viewports
- **Loading skeleton** — product grid shows placeholder cards during fetch

---

## Tech Stack

| Layer            | Library              |
| ---------------- | -------------------- |
| Framework        | Vue 2.6              |
| UI components    | Vuetify 2            |
| State management | Vuex 3               |
| Routing          | Vue Router 3         |
| Form validation  | Vuelidate 0.7        |
| Build tool       | Vue CLI 4            |
| Font             | Inter (Google Fonts) |

---

## Local Setup

```bash
# Install dependencies
npm install

# Start development server (http://localhost:8080)
npm run serve

# Production build
npm run build
```

> Node 14+ recommended. The project uses `node-sass` for the one scoped SASS block in the address components.

---

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run serve` | Start dev server with hot-reload |
| `npm run build` | Production build to `dist/`      |

---

## Folder Structure

```
src/
├── assets/
│   └── main.css          # Global base styles, typography, spacing utilities
├── components/
│   ├── ProductItem.vue   # Product card (grid) + cart row (shared component)
│   ├── ShippingAdd.vue   # Add/save a new shipping address (form with validation)
│   ├── ShippingList.vue  # Address picker dialog (select, add, delete)
│   └── Topbar.vue        # App navigation bar
├── plugins/
│   └── vuetify.js        # Vuetify theme configuration
├── router/
│   └── index.js          # Route definitions with auth guard on /checkout
├── store/
│   └── index.js          # Vuex store — products, cart, user state + getters
└── views/
    ├── Home.vue           # Product listing grid
    ├── ProductDetails.vue # Single product detail page
    ├── Cart.vue           # Cart with order summary sidebar
    ├── Checkout.vue       # Order review (address + payment + cart)
    ├── SignIn.vue         # Sign-in page
    └── Register.vue       # Create account page
```

---

## Architecture Notes

**State management** — All shared state lives in Vuex. Products are fetched once on app boot via `fetchProducts` action and stored in `state.products`. Cart items are normalized objects `{ item_num, quantity, price }`. The full product details are resolved via the `productById` getter at render time, keeping the cart lean.

**No prop-drilling** — The root `App.vue` does not pass data down through `<router-view>`. Every view reads what it needs directly from the store.

**Getters used throughout:**

- `productById(id)` — resolves a cart item to its full product object
- `cartTotal` — sum of `price × quantity` across all cart items
- `cartItemCount` — sum of all quantities (used for the cart badge)

**Component reuse** — `ProductItem.vue` serves double duty: it renders as a product card on the home/detail pages and as a compact cart row inside Cart and Checkout. The distinction is driven by a `isCartPage` computed property that checks `$route.name`.

---

## Authentication Flow

This project uses a demo authentication model (no backend).

1. **Sign In** (`/signin`) — user enters any name; app fetches `public/json/default_user.json` and `default_cart.json` to seed a realistic signed-in state.
2. **Register** (`/register`) — user enters name + email; Vuelidate validates both fields; on submit, a new user object is committed to Vuex.
3. **Sign Out** — clears user state in Vuex; redirects to home if on a protected route.
4. **Route guard** — `/checkout` has a `beforeEnter` guard that redirects unauthenticated users to `/signin` with a `redirectPath=checkout` query param, which returns them to checkout after sign-in.

> In a production app this would be replaced with real API calls and JWT session management.

---

## Cart & Checkout Flow

1. User adds items from the product detail page (with quantity selection).
2. The `addItem` mutation checks for an existing cart entry and increments quantity rather than adding a duplicate.
3. Cart page shows all items, a running subtotal, and a "Proceed to Checkout" button.
   - Unauthenticated users are redirected to sign in first.
4. Checkout page shows the cart (read-only), selected shipping address, and payment summary.
5. "Place Order" is intentionally disabled — order submission is not implemented (see Known Limitations).

---

## Address Management

1. Addresses are stored as an array on `state.user.shipping`.
2. The `ShippingList` dialog (triggered from Checkout) shows all saved addresses.
3. Selecting "Use this" commits `setDefaultAddress(index)` — replaces the array immutably with the chosen entry marked `default: true`.
4. Adding an address opens `ShippingAdd`, which validates all five fields before emitting the new address up to `ShippingList`, which commits the updated array.
5. Deleting an address shows an inline confirmation before committing the filtered array.

---

## Known Limitations

- **No backend** — all data is seeded from static JSON files in `public/json/`. State resets on page refresh.
- **Order placement not implemented** — the "Place Order" button on Checkout is intentionally disabled.
- **Payment not implemented** — the payment card shown on Checkout is demo data from `default_user.json`. No real card input exists.
- **Address editing not implemented** — the edit action on addresses is stubbed (button visible but inactive).
- **No search** — the search autocomplete in the navbar is commented out pending a proper filtering implementation.
- **Single user session** — there is no real authentication; "sign in" loads a fixed demo user.

---

## Future Improvements

- [ ] Replace static JSON auth with a real API (e.g. Express + JWT or a BaaS like Supabase)
- [ ] Persist cart and user session to `localStorage`
- [ ] Implement product search and category filtering
- [ ] Add address editing
- [ ] Add a payment form (Stripe Elements or similar)
- [ ] Implement order placement and a confirmation/thank-you page
- [ ] Add pagination or infinite scroll to the product grid
- [ ] Improve mobile navigation (hamburger menu)
- [ ] Migrate to Vue 3 + Pinia + Vite

---

## Screenshots

> Replace these placeholders with actual screenshots once the app is running.

| Page               | Preview        |
| ------------------ | -------------- |
| Product listing    | _(screenshot)_ |
| Product detail     | _(screenshot)_ |
| Shopping cart      | _(screenshot)_ |
| Checkout           | _(screenshot)_ |
| Sign in            | _(screenshot)_ |
| Address management | _(screenshot)_ |
