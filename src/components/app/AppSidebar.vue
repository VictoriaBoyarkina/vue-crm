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
  created() {
    console.log(this.isOpen); //undefined;
  },
  props: ["isOpen"],
  data: () => ({
    links: [
      { title: "Счет", url: "/", exact: true },
      { title: "История", url: "/history" },
      { title: "Планирование", url: "/planning" },
      { title: "Новая запись", url: "/record" },
      { title: "Категории", url: "/categories" },
    ],
  }),
};
</script>
