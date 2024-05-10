<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="record in records" :key="record">
        <td>{{ record.index + 1 }}</td>
        <td>{{ currencyFilter(record.amount) }}</td>
        <td>{{ normalizeDate(record.date) }}</td>
        <td>{{ record.caterogoryName }}</td>
        <td>
          <span class="white-text badge" :class="record.typeClass">
            {{ record.typeText }}
          </span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detail/${record.key}`)"
            v-tooltip="{ value: 'Посмотреть запись' }"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
  methods: {
    normalizeDate(date) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const data = new Date(Date.parse(date));
      return new Intl.DateTimeFormat("ru-RU", options).format(data);
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
