import Home from "../views/Home.vue";
import QuizPage from "../views/QuizPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/question/:id",
      component: QuizPage,
    },
  ],
});

export default routes;
