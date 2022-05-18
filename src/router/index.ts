import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Test from "../views/test/index.vue";
import Edge from "../views/edge/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/edge",
    name: "edge",
    component: Edge,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
