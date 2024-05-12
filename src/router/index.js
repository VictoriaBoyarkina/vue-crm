import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import { nextTick } from "vue";
import localize from "@/locales/localize";

const routes = [
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty", title: "Signup" },
    component: () => import("./../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty", title: "Login" },
    component: () => import("./../views/LoginView.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: { layout: "main", auth: true, title: "Menu_Bill" },
    component: () => import("./../views/HomeView.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true, title: "Menu_Categories" },
    component: () => import("./../views/CategoriesView.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { layout: "main", auth: true, title: "Details" },
    component: () => import("./../views/DetailView.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true, title: "Menu_History" },
    component: () => import("./../views/HistoryView.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true, title: "Menu_Planning" },
    component: () => import("./../views/PlanningView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: true, title: "ProfileTitle" },
    component: () => import("./../views/ProfileView.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", auth: true, title: "Menu_NewRecord" },
    component: () => import("./../views/RecordView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

router.afterEach((to) => {
  nextTick(() => {
    document.title =
      localize(to.meta.title) || localize(process.env.VUE_APP_TITLE);
  });
});

export default router;
