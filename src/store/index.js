import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";
import caterogory from "./caterogory";
import record from "./record";

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(
        `https://api.currencyapi.com/v3/latest?apikey=${key}&base_currency=EUR&currencies=USD,EUR,RUB`
      );
      const { meta, data } = await res.json();

      const rates = [];

      Object.keys(data).forEach((key) => {
        rates[key] = data[key].value;
      });

      return {
        rates: rates,
        date: meta.last_updated_at,
      };
    },
  },
  modules: {
    auth,
    info,
    caterogory,
    record,
  },
});
