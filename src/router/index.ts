import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import Layout from "@/layout/index.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/page/home/index.vue'),
    meta: { title: '首页', type: 'single', icon: 'House' },
  },
  {
    path: '/testing',
    name: 'testing',
    component: () => import('@/page/testing/index.vue'),
    meta: { title: '测试', type: 'single', icon: 'House' },
  },
  // {
  //   path: "/",
  //   name: "home",
  //   component: Layout,
  //   meta: { title: "首页", type: "single", icon: "House" },
  //   redirect: "/dashboard",
  //   children: [
  //     {
  //       path: "dashboard",
  //       component: () => import("@/views/dashboard/index.vue"),
  //       meta: { title: "首页" },
  //     },
  //   ],
  // },
  // {
  //   path: "/111221",
  //   component: Layout,
  //   meta: { title: "xx1管理", type: "multiple", icon: "Setting" },
  //   children: [
  //     {
  //       path: "userManagement",
  //       component: () => import("@/views/system/userManagement.vue"),
  //       meta: { title: "用户管理" },
  //     },
  //     {
  //       path: "logs",
  //       component: () => import("@/views/system/logs.vue"),
  //       meta: { title: "日志管理" },
  //     },
  //   ],
  // },
];
const router = createRouter({ history: createWebHistory(), routes });
export default router;
