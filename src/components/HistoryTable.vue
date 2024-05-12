<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $translate("Amount") }}</th>
        <th>{{ $translate("Date") }}</th>
        <th>{{ $translate("Category") }}</th>
        <th>{{ $translate("Type") }}</th>
        <th>{{ $translate("Open") }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="record in records" :key="record">
        <td>{{ record.index + 1 }}</td>
        <td>{{ currencyFilter(record.amount) }}</td>
        <td>
          {{
            $normalizeDate(
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              },
              record.date
            )
          }}
        </td>
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
            v-tooltip="{ value: $translate('RecordsDetails') }"
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
    currencyFilter(value, currency = "RUB") {
      return new Intl.NumberFormat("ru-Ru", {
        style: "currency",
        currency,
      }).format(value);
    },
  },
};
</script>
