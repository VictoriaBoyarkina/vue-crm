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
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model="state.name"
          :class="{
            invalid: v$.name.$error,
          }"
        />
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="v$.name.$error">{{
          v$.name.$errors[0].$message
        }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="state.agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "registerApp",
  setup() {
    const state = reactive({
      email: "",
      password: "",
      name: "",
      agree: false,
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
        name: {
          required: helpers.withMessage(
            "Поле Имя не должно быть пустым",
            required
          ),
        },
        agree: {
          checked: (value) => value,
        },
      };
    });
    const v$ = useVuelidate(rules, state);
    return {
      state,
      v$,
    };
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      const formData = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      };
      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
