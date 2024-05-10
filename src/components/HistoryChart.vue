<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Pie } from "vue-chartjs";

export default {
  components: {
    Pie,
  },
  props: ["categories"],
  data: () => ({
    chartData: {
      labels: [],
      datasets: [{ data: [48, 20, 12] }],
    },
    chartOptions: {
      responsive: true,
    },
  }),
  created() {
    this.chartData.labels = this.categories.map((c) => c.title);
    console.log(this.chartData.labels);
  },
};
</script>
