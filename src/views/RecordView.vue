<template>
  <div>
    <div class="page-title">
      <h3>{{ $translate("Menu_NewRecord") }}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{ $translate("NoCategories") }}
      <router-link to="/categories">{{
        $translate("AddNewCategory")
      }}</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
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

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ $translate("Income") }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ $translate("Outcome") }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: v$.amount.$error }"
        />
        <label for="amount">{{ $translate("Amount") }}</label>
        <span class="helper-text invalid" v-if="v$.amount.$error">
          {{ $translate("MinValue") }} {{ this.v$.amount.minValue.$params.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$error }"
        />
        <label for="description">{{ $translate("Description") }}</label>
        <span class="helper-text invalid" v-if="v$.description.$error">
          {{ $translate("Message_EnterDescription") }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $translate("Create") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "record-view",
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: "outcome",
    amount: 1,
    description: "",
  }),
  validations() {
    return {
      amount: { minValue: minValue(1) },
      description: { required },
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    setTimeout(() => {
      this.select = this.$M.FormSelect.init(this.$refs.select);
      this.$M.updateTextFields();
    }, 0);

    if (this.categories.length) {
      this.category = this.categories[0].key;
    }
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      if (!this.v$.$invalid) {
        try {
          if (this.canCreateRecord) {
            await this.$store.dispatch("createRecord", {
              categoryId: this.category,
              amount: this.amount,
              description: this.description,
              type: this.type,
              date: new Date().toJSON(),
            });

            const bill =
              this.type === "income"
                ? this.info.bill + this.amount
                : this.info.bill - this.amount;

            await this.$store.dispatch("updateInfo", { bill });
            this.$message(this.$translate("RecordCreated"));
            this.v$.$reset();
            this.amount = 1;
            this.description = "";
          } else {
            this.$message(`
          ${this.$translate("InsufficientFunds")} (${
              this.amount - this.info.bill
            })`);
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>
