import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "./../main";
import { ref, set } from "firebase/database";

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({ commit, dispatch }, { email, password }) {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (e) {
        commit("setError", e);
        throw new Error();
      }
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
        const uid = await dispatch("getUId");
        await set(ref(db, `/users/${uid}/info`), {
          bill: 10000,
          name: name,
        });
      } catch (e) {
        commit("setError", e);
        throw new Error();
      }
    },
    getUId() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await signOut(getAuth());
      commit("clearInfo");
    },
  },
};
