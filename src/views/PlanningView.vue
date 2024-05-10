<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ currencyFilter(info.bill) }}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.key">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ currencyFilter(cat.spent) }} из {{ currencyFilter(cat.limit) }}
        </p>
        <div class="progress" v-tooltip="{ value: cat.tooltip }">
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
      const tooltip = `${
        tooltipValue < 0 ? "Превышение на" : "Осталось"
      } ${this.currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spent,
        tooltip,
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
