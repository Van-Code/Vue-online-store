<template>
  <v-dialog v-model="dialog" fullscreen white hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <form class="col-5 offset-md-3">
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <div class="row col-6 justify-space-between">
          <v-btn @click="$router.back()">cancel</v-btn>
          <v-btn class="white--text" @click="submit" color="black">submit</v-btn>
        </div>
      </form>
    </v-card>
    <!-- <v-card-title class="col-12">Enter an address</v-card-title>
    <v-card-text>
      <v-text-field label="Full Name" single-line></v-text-field>
      <v-text-field label="Street Address" single-line></v-text-field>
      <v-text-field label="Zip code" single-line></v-text-field>
      <v-text-field label="City" single-line></v-text-field>
      <v-text-field label="State" single-line></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn class="col-2 offset-md-8">Cancel</v-btn>
      <v-btn class="col-2 white--text black" @click="submit">Create Account</v-btn>
    </v-card-actions>-->
  </v-dialog>
</template>
<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
const { required, maxLength, email } = require("vuelidate/lib/validators");
import { validationMixin } from "vuelidate";

Vue.use(Vuelidate);
export default Vue.extend({
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email }
  },
  data: () => ({
    name: "",
    email: "",
    dialog: true
  }),
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  methods: {
    submit() {
      //this.$v.$touch();
      this.$store.commit("userData", {
        name: this.name,
        email: this.email,
        isLoggedIn: true,
        shipping: [],
        cards: []
      });
      let redirectTo = this.$route.query.redirectPath
        ? `/${this.$route.query.redirectPath}`
        : "/";
      this.$router.push({
        path: redirectTo
      });
    }
  }
});
</script>