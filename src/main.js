import Vuelidate from "@vuelidate/core";
import { createApp } from "vue";
// import { initializeApp } from "firebase/app";
import App from "./App.vue";
import messagePlugin from "@/utils/message.plugin";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyCQwpeFffXHnp0InZyRjre2u_EdpZx7RjI",
//   authDomain: "vue-crm-b7711.firebaseapp.com",
//   projectId: "vue-crm-b7711",
//   storageBucket: "vue-crm-b7711.appspot.com",
//   messagingSenderId: "503550488619",
//   appId: "1:503550488619:web:0248317bb9c93c511bfa6e",
//   measurementId: "G-MEDPM6C8E2",
// };

// const app = initializeApp(firebaseConfig);
// export default app;

createApp(App)
  .use(Vuelidate)
  .use(messagePlugin)
  .use(store)
  .use(router)
  .mount("#app");
//   .initializeApp(firebaseConfig)
