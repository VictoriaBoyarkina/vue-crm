import { ref, push, set, get, update } from "firebase/database";
import { db } from "./../main";

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUId");
        const categoriesRef = ref(db, `/users/${uid}/categories/`);

        const newCategoryRef = push(categoriesRef);
        await set(newCategoryRef, {
          title,
          limit,
        });

        const categoryId = newCategoryRef.key;

        return {
          title,
          limit,
          id: categoryId,
        };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUId");
        const categoriesRef = ref(db, `/users/${uid}/categories`);
        const snapshot = await get(categoriesRef);
        const categories = snapshot.val() || {};

        const categoriesArray = Object.keys(categories).map((key) => ({
          ...categories[key],
          key: key,
        }));

        return categoriesArray;
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUId");
        const categoryRef = ref(db, `/users/${uid}/categories/${id}`);
        const snapshot = await get(categoryRef);
        const category = snapshot.val() || {};

        return { ...category, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUId");
        const categoryRef = ref(db, `/users/${uid}/categories/${id}`);
        await update(categoryRef, {
          title: title,
          limit: limit,
        });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
