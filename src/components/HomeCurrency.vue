<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ $translate("CurrencyRate") }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ $translate("Currency") }}</th>
              <th>{{ $translate("Rate") }}</th>
              <th>{{ $translate("Date") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur].toFixed(5) }}</td>
              <td>
                {{
                  $normalizeDate(
                    {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    },
                    date
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates", "date"],
  data: () => ({
    currencies: ["RUB", "USD", "EUR"],
  }),
};
</script>
