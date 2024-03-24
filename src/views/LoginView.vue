<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="state.email"
          :class="{
            invalid: v$.email.$error,
          }"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</small>
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
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import messages from "@/utils/messages";
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
          required: helpers.withMessage(
            "Поле Email не должно быть пустым",
            required
          ),
          email: helpers.withMessage("Введите корректный Email", email),
        },
        password: {
          required: helpers.withMessage(
            "Поле Пароль не должно быть пустым",
            required
          ),
          minLength: helpers.withMessage(
            `Пароль дожен содержать более 6 символов`,
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
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    submitHandler() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$router.push("/");
      }
      const formData = {
        email: this.state.email,
        password: this.state.password,
      };
      console.log(formData);
    },
  },
};
</script>
