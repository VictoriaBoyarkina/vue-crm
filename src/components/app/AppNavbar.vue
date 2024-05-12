<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.stop.prevent="$emit('myclick')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{
          $normalizeDate(
            {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              year: "numeric",
              month: "long",
              day: "2-digit",
            },
            date
          )
        }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i
                >{{ $translate("ProfileTitle") }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.stop.prevent="logout">
                <i class="material-icons">assignment_return</i
                >{{ $translate("Logout") }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = this.$M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
      coverTrigger: false,
    });
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
};
</script>
