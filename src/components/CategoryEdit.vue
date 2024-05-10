<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :key="category.key"
              :value="category.key"
            >
              {{ category.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="v$.title.$error">
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="v$.limit.$error">
            Минимальное значение {{ this.v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    select: null,
    title: "",
    limit: 1,
    current: null,
  }),
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(1) },
    };
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.key === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  methods: {
    async submitHandler() {
      try {
        this.v$.$validate();
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория успешно обновлена!");
        this.$emit("updated", categoryData);
      } catch (e) {
        console.log(e);
      }
    },
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  created() {
    const { key, title, limit } = this.categories[0];

    this.current = key;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = this.$M.FormSelect.init(this.$refs.select);
    this.$M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
