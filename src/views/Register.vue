<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-card__title">Create Account</h1>
      <p class="auth-card__subtitle">Fill in your details to get started.</p>

      <v-text-field
        v-model="name"
        label="Full name"
        outlined
        dense
        hide-details="auto"
        :error-messages="nameErrors"
        class="auth-card__field"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="Email address"
        outlined
        dense
        hide-details="auto"
        :error-messages="emailErrors"
        class="auth-card__field"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-btn
        color="primary"
        large
        depressed
        block
        :disabled="$v.$invalid"
        class="auth-card__submit"
        @click="submit"
      >
        Create Account
      </v-btn>

      <p class="auth-card__alt">
        Already have an account?
        <router-link to="/signin" class="auth-card__link">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import { validationMixin } from "vuelidate";
const { required, maxLength, email } = require("vuelidate/lib/validators");

Vue.use(Vuelidate);

export default Vue.extend({
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(60) },
    email: { required, email }
  },
  data: () => ({
    name: "",
    email: ""
  }),
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push("Name must be under 60 characters.");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Please enter a valid email address.");
      !this.$v.email.required && errors.push("Email is required.");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.$store.commit("userData", {
        name: this.name,
        email: this.email,
        isLoggedIn: true,
        shipping: [],
        cards: []
      });
      const redirectTo = this.$route.query.redirectPath
        ? `/${this.$route.query.redirectPath}`
        : "/";
      this.$router.push({ path: redirectTo });
    }
  }
});
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 128px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 40px 36px;
}

.auth-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}

.auth-card__subtitle {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 28px;
}

.auth-card__field {
  margin-bottom: 16px;
}

.auth-card__submit {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 20px;
}

.auth-card__alt {
  font-size: 0.85rem;
  color: #6b7280;
  text-align: center;
  margin: 0;
}

.auth-card__link {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
}

.auth-card__link:hover {
  text-decoration: underline;
}
</style>
