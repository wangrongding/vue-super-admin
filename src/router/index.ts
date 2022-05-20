import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/page/error/404.vue'),
  },
]
const router = createRouter({ history: createWebHistory(), routes })
export default router
