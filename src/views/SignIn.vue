<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-card__title">Sign In</h1>
      <p class="auth-card__subtitle">Enter any name to continue as a demo user.</p>

      <v-text-field
        v-model="name"
        label="Your name"
        outlined
        dense
        hide-details="auto"
        class="auth-card__field"
        @keyup.enter="getUser"
      ></v-text-field>

      <v-btn
        color="primary"
        large
        depressed
        block
        :loading="loading"
        :disabled="!name.trim() || loading"
        class="auth-card__submit"
        @click="getUser"
      >
        Continue
      </v-btn>

      <p class="auth-card__alt">
        Don't have an account?
        <router-link to="/register" class="auth-card__link">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      name: "",
      loading: false
    };
  },
  methods: {
    getUser() {
      if (!this.name.trim()) return;
      this.loading = true;
      fetch("./json/default_user.json")
        .then(res => res.json())
        .then(data => {
          data.isLoggedIn = true;
          data.name = this.name.trim();
          this.$store.commit("userData", data);
          const redirectTo = this.$route.query.redirectPath
            ? `/${this.$route.query.redirectPath}`
            : "/";
          this.$router.push({ path: redirectTo });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
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
