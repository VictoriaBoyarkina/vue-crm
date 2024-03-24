<template>
  <div class="app-main-layout">
    <app-navbar @myclick="isOpen = !isOpen" />
    <app-sidebar v-bind:isOpen="isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
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
  data: () => ({
    isOpen: true,
  }),
};
</script>
