<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $translate("Edit") }}</h4>
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
          <label>{{ $translate("ChooseCategory") }}</label>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">{{ $translate("Name") }}</label>
          <span class="helper-text invalid" v-if="v$.title.$error">
            {{ $translate("Message_EnterCategoryName") }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">{{ $translate("Limit") }}</label>
          <span class="helper-text invalid" v-if="v$.limit.$error">
            {{ $translate("MinValue") }}
            {{ this.v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $translate("Update") }}
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
      this.v$.$validate();
      if (!this.v$.$invalid) {
        try {
          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit,
          };
          await this.$store.dispatch("updateCategory", categoryData);
          this.$message(this.$translate("CategoryUpdated"));
          this.$emit("updated", categoryData);
        } catch (e) {
          console.log(e);
        }
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
