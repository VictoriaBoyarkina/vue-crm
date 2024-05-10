<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb"> {{ record.typeName }} </a>
      </div>

      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.class">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ currencyFilter(record.amount) }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ normalizeDate(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Такой записи нет</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    category: null,
    record: null,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.title,
      class: record.type === "income" ? "green" : "red",
      typeName: record.type === "income" ? "Доход" : "Расход",
    };

    this.loading = false;
  },
  methods: {
    normalizeDate(date) {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      };
      return new Intl.DateTimeFormat("ru-RU", options).format(date);
    },
    currencyFilter(value, currency = "RUB") {
      return new Intl.NumberFormat("ru-Ru", {
        style: "currency",
        currency,
      }).format(value);
    },
  },
};
</script>
