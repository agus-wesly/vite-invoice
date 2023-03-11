import Home from "../views/Home/Home.vue";
import Invoice from "@/views/Invoice/Invoice.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/invoice/:id",
      component: Invoice,
      name: "Invoice",
    },
  ],
});

export default routes;
