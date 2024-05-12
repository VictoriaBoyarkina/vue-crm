<template>
  <div>
    <div class="page-title">
      <h3>{{ $translate("Menu_Planning") }}</h3>
      <h4>{{ currencyFilter(info.bill) }}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{ $translate("NoCategories") }}
      <router-link to="/categories">{{
        $translate("AddNewCategory")
      }}</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.key">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ currencyFilter(cat.spent) }} {{ $translate("Outof") }}
          {{ currencyFilter(cat.limit) }}
        </p>
        <div
          class="progress"
          v-tooltip="{
            value: `${$translate(cat.tooltipText)} ${cat.tooltipAmount}`,
          }"
        >
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "planning-view",
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(["info"]),
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map((cat) => {
      const spent = records
        .filter((rec) => rec.categoryId === cat.key)
        .filter((rec) => rec.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);

      const percent = (100 * spent) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltipValue = cat.limit - spent;
      const tooltipText = `${tooltipValue < 0 ? "Excess" : "Left"}`;
      const tooltipAmount = `${this.currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spent,
        tooltipText,
        tooltipAmount,
      };
    });

    this.loading = false;
  },
  methods: {
    currencyFilter(value, currency = "RUB") {
      return new Intl.NumberFormat("ru-Ru", {
        style: "currency",
        currency,
      }).format(value);
    },
  },
};
</script>
