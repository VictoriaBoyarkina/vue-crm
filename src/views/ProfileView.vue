<template>
  <div>
    <div class="page-title">
      <h3>{{ $translate("ProfileTitle") }}</h3>
    </div>

    <Loader v-if="loading" />

    <form class="form" @submit.prevent="submitHandler" v-else>
      <div class="input-field">
        <input
          id="userName"
          type="text"
          v-model="name"
          :class="{ invalid: v$.name.$error }"
        />
        <label for="userName" class="active">{{
          $translate("UserName")
        }}</label>
        <small class="helper-text invalid" v-if="v$.name.$error">{{
          $translate("Message_EnterUserName")
        }}</small>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $translate("Update") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      name: { required },
    };
  },
  data: () => ({
    name: "",
    isRuLocale: true,
    loading: true,
  }),
  mounted() {
    this.isRuLocale = this.info.locale === "ru-Ru";
    this.name = this.info.name;
    this.$M.updateTextFie;
    this.loading = false;
  },
  computed: {
    ...mapGetters(["info"]),
  },
  watch: {
    info() {
      this.isRuLocale = this.info.locale === "ru-Ru";
      this.name = this.info.name;
      this.$M.updateTextFie;
      this.loading = false;
    },
  },
  methods: {
    async submitHandler() {
      try {
        this.v$.$validate();
        await this.$store.dispatch("updateInfo", {
          name: this.name,
          locale: this.isRuLocale ? "ru-Ru" : "en-Us",
        });
        document.title =
          this.$translate(this.$route.meta.title) ||
          this.$translate(process.env.VUE_APP_TITLE);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
