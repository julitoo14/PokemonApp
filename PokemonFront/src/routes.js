import { createRouter, createWebHistory } from "vue-router";
import Team from "./views/Team.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Home from "./views/Home.vue"
import About from './views/About.vue'

const routes = [
  {
    path: "/team",
    component: Team,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: '/about',
    component: About,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
