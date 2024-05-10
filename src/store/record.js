import { ref, push, set, get } from "firebase/database";
import { db } from "./../main";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUId");
        const recordsRef = ref(db, `/users/${uid}/records/`);

        const newRecordRef = push(recordsRef);
        await set(newRecordRef, record);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUId");
        const recordsRef = ref(db, `/users/${uid}/records`);
        const snapshot = await get(recordsRef);
        const records = snapshot.val() || {};

        const recordsArray = Object.keys(records).map((key) => ({
          ...records[key],
          key: key,
        }));

        return recordsArray;
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUId");
        const recordRef = ref(db, `/users/${uid}/records/${id}`);
        const snapshot = await get(recordRef);
        const record = snapshot.val() || {};

        return { ...record, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
