import { ref, onValue, update } from "firebase/database";
import { db } from "./../main";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUId");
        return onValue(
          ref(db, `/users/${uid}/info`),
          (snapshot) => {
            const info = snapshot.val() || {};
            commit("setInfo", info);
          },
          {
            onlyOnce: true,
          }
        );
      } catch (e) {
        commit("setError", e);
        throw new Error();
      }
    },
    async updateInfo({ commit, dispatch, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUId");

        const updatedData = { ...getters.info, ...toUpdate };

        const infoRef = ref(db, `/users/${uid}/info`);
        await update(infoRef, updatedData);

        commit("setInfo", updatedData);
      } catch (e) {
        commit("setError", e);
        throw new Error();
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
