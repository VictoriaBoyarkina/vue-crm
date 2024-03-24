import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("./../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("./../views/LoginView.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: () => import("./../views/HomeView.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main" },
    component: () => import("./../views/CategoriesView.vue"),
  },
  {
    path: "/detailrecord",
    name: "detailrecord",
    meta: { layout: "main" },
    component: () => import("./../views/DetailView.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main" },
    component: () => import("./../views/HistoryView.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main" },
    component: () => import("./../views/PlanningView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main" },
    component: () => import("./../views/ProfileView.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main" },
    component: () => import("./../views/RecordView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
