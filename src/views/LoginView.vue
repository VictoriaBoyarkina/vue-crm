<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ $translate("HomeBookkeeping") }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="state.email"
          :class="{
            invalid: v$.email.$error,
          }"
        />
        <label for="email">{{ $translate("Email") }}</label>
        <small class="helper-text invalid" v-if="v$.email.$error">
          {{ $translate(v$.email.$errors[0].$message) }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="state.password"
          :class="{
            invalid: v$.password.$error,
          }"
        />
        <label for="password">{{ $translate("Password") }}</label>
        <small class="helper-text invalid" v-if="v$.password.$error">{{
          $translate(v$.password.$errors[0].$message)
        }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ $translate("Login") }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $translate("NoAccount") }}
        <router-link to="/register">{{ $translate("Signup") }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "loginApp",
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        email: {
          required: helpers.withMessage("Message_EmptyEmailField", required),
          email: helpers.withMessage("Message_EnterValidEmail", email),
        },
        password: {
          required: helpers.withMessage("Message_EmptyPasswordField", required),
          minLength: helpers.withMessage(
            "Message_PasswordMinValue",
            minLength(6)
          ),
        },
      };
    });
    const v$ = useVuelidate(rules, state);
    return {
      state,
      v$,
    };
  },
  mounted() {
    if (this.$route.query.message) {
      this.$message(this.$translate(this.$route.query.message));
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      if (!this.v$.$invalid) {
        const formData = {
          email: this.state.email,
          password: this.state.password,
        };
        try {
          await this.$store.dispatch("login", formData);
          this.$router.push("/");
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>
