<template>
  <div>
    <div class="page-title">
      <h3>{{ $translate("RecordsHistory") }}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ $translate("NoRecords") }}
      <router-link to="/record">{{ $translate("AddNewRecord") }}</router-link>
    </p>

    <div v-else>
      <div class="history-chart">
        <HistoryChart :categories="categories" :records="records" />
      </div>

      <section>
        <Table :records="items" />
        <vue-awesome-paginate
          :total-items="records.length"
          :items-per-page="pageSize"
          :max-pages-shown="5"
          v-model="currentPage"
          :on-click="handleClickPage"
          paginate-buttons-class="btn pagination-btn"
        />
      </section>
    </div>
  </div>
</template>

<script>
import Table from "@/components/HistoryTable.vue";
import HistoryChart from "@/components/HistoryChart.vue";
import _ from "lodash";

export default {
  components: {
    Table,
    HistoryChart,
  },
  data: () => ({
    loading: true,
    records: [],
    categories: [],
    currentPage: 1,
    pageSize: 5,
    pageCount: 0,
    allItems: [],
    items: [],
  }),
  async mounted() {
    this.currentPage = +this.$route.query.page || 1;

    this.categories = await this.$store.dispatch("fetchCategories");
    const records = await this.$store.dispatch("fetchRecords");

    this.records = records.map((record, index) => {
      return {
        ...record,
        caterogoryName: this.categories.find(
          (cat) => cat.key === record.categoryId
        ).title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
        index,
      };
    });

    this.allItems = _.chunk(this.records, this.pageSize);
    this.pageCount = this.items.length;
    this.items = this.allItems[this.currentPage - 1] || this.allItems[0];

    this.loading = false;
  },
  methods: {
    handleClickPage() {
      this.allItems = _.chunk(this.records, this.pageSize);
      this.pageCount = this.items.length;
      this.items = this.allItems[this.currentPage - 1] || this.allItems[0];
      this.$router.push(`${this.$route.path}?page=${this.currentPage}`);
    },
  },
};
</script>

<style>
.pagination-btn {
  height: 40px;
  width: 40px;
  border: none;
  margin-inline: 5px;
  cursor: pointer;
  text-align: center;
  padding: 0;
}
</style>
