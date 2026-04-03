import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#111827",
        secondary: "#6b7280",
        accent: "#2563eb",
        error: "#dc2626",
        success: "#16a34a",
        info: "#0ea5e9",
        warning: "#d97706",
        background: "#f9fafb",
      },
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
