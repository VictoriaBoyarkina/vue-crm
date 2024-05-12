<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Pie } from "vue-chartjs";

export default {
  components: {
    Pie,
  },
  props: ["categories", "records"],
  data: () => ({
    chartData: {
      labels: [],
      datasets: [{ data: [48, 20, 12] }],
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  created() {
    this.chartData.labels = this.categories.map((c) => c.title);

    this.chartData.datasets = [
      {
        data: this.categories.map((c) => {
          return this.records.reduce((total, r) => {
            if (r.categoryId === c.key && r.type === "outcome") {
              total += +r.amount;
            }
            return total;
          }, 0);
        }),
      },
    ];
  },
};
</script>
