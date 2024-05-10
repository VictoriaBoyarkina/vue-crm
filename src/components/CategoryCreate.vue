<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="v$.title.$error">
            Введите название
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
          Создать
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
    title: "",
    limit: 1,
  }),
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(1) },
    };
  },
  methods: {
    async submitHandler() {
      try {
        this.v$.$validate();
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit,
        });
        this.title = "";
        this.limit = 1;
        this.v$.$reset();
        this.$message("Категория создана!");
        this.$emit("created", category);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.$M.updateTextFields();
  },
};
</script>
