import Vuelidate from "@vuelidate/core";
import { createApp } from "vue";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import App from "./App.vue";
import messagePlugin from "@/utils/message.plugin";
import localizePlugin from "./utils/localize.plugin";
import datePlugin from "./utils/date.plugin";
import VueAwesomePaginate from "vue-awesome-paginate";
import Loader from "./components/app/AppLoader.vue";
import tooltipDirective from "@/directives/tooltip.directive";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import materializePlugin from "@/utils/materialize.plugin";
import "@/assets/index.css";
import "vue-awesome-paginate/dist/style.css";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const firebaseConfig = {
  apiKey: "AIzaSyBN29RJcjtsjsuHPhB2laQpct8RaGY017w",
  authDomain: "vue-crm-19ad9.firebaseapp.com",
  projectId: "vue-crm-19ad9",
  storageBucket: "vue-crm-19ad9.appspot.com",
  messagingSenderId: "357039396968",
  appId: "1:357039396968:web:dceaf99772880ca8c203dd",
  measurementId: "G-4JFG31FMN5",
};

const fireApp = initializeApp(firebaseConfig);
const db = getDatabase(fireApp);
const auth = getAuth();

export { db };

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(Vuelidate)
      .use(messagePlugin)
      .use(materializePlugin)
      .use(localizePlugin)
      .use(datePlugin)
      .directive("tooltip", tooltipDirective)
      .use(store)
      .use(router)
      .use(VueAwesomePaginate)
      .component("Loader", Loader)
      .mount("#app");
  }
});
