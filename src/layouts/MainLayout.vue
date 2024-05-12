<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <AppNavbar @myclick="isOpen = !isOpen" />
      <AppSidebar v-bind:isOpen="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="{ value: 'Создать новую запись', position: 'left' }"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/app/AppNavbar.vue";
import AppSidebar from "@/components/app/AppSidebar.vue";

export default {
  name: "main-layout",
  components: {
    AppNavbar,
    AppSidebar,
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  },
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(this.$translate(fbError.code) || "Что-то пошло не так");
    },
  },
};
</script>
