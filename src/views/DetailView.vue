<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          $translate("Menu_History")
        }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ $translate(record.typeName) }}
        </a>
      </div>

      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.class">
            <div class="card-content white-text">
              <p>{{ $translate("Description") }}: {{ record.description }}</p>
              <p>
                {{ $translate("Amount") }}: {{ currencyFilter(record.amount) }}
              </p>
              <p>{{ $translate("Category") }}: {{ record.categoryName }}</p>

              <small>{{
                $normalizeDate(
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  },
                  record.date
                )
              }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{ $translate("NoRecord") }}</p>
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
      typeName: record.type === "income" ? "Income" : "Outcome",
    };

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
