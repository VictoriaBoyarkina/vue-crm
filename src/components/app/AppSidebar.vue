<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      v-slot="{ href, isActive }"
    >
      <li :class="[isActive && 'active', link.exact && 'exact-active']">
        <a :href="href" class="waves-effect waves-orange pointer">{{
          link.title
        }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["isOpen"],
  computed: {
    links() {
      return [
        { title: this.$translate("Menu_Bill"), url: "/", exact: true },
        { title: this.$translate("Menu_History"), url: "/history" },
        { title: this.$translate("Menu_Planning"), url: "/planning" },
        { title: this.$translate("Menu_NewRecord"), url: "/record" },
        { title: this.$translate("Menu_Categories"), url: "/categories" },
      ];
    },
  },
};
</script>
