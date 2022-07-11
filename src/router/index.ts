import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  Router,
} from 'vue-router'

const Layout = () => import('@/layout/index.vue')

export const routerList: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/page/home/index.vue'),
    meta: { title: '首页', type: 'single', icon: 'House' },
  },
  {
    path: '/testing',
    component: () => import('@/page/testing/index.vue'),
    meta: { title: '测试', type: 'single', icon: 'House' },
  },
  {
    path: '/testing/detail',
    component: () => import('@/page/testing/index.vue'),
    meta: { title: '测试详情', type: 'single', icon: 'House' },
  },
  {
    path: '/list',
    component: () => import('@/page/list/index.vue'),
    meta: { title: '列表页', type: 'single', icon: 'House' },
    children: [
      {
        path: '/list/detail',
        component: () => import('@/page/list/list-detail.vue'),
        meta: { title: '测试详情', type: 'single', icon: 'House' },
      },
    ],
  },
  {
    path: '/list/detail',
    component: () => import('@/page/list/list-detail.vue'),
    meta: { title: '测试详情', type: 'single', icon: 'House' },
  },
]

export const menuRouterList: Array<RouteRecordRaw> = [
  // {
  //   path: '/list',
  //   component: Layout,
  //   meta: { title: '列表页', type: 'single', icon: 'House' },
  //   redirect: '/list/index',
  //   children: [
  //     {
  //       path: '/list/index',
  //       component: () => import('@/page/list/index.vue'),
  //       meta: { title: '列表页', type: 'single', icon: 'House' },
  //     },
  //     {
  //       path: '/list/detail',
  //       component: () => import('@/page/list/list-detail.vue'),
  //       meta: { title: '测试详情', type: 'single', icon: 'House' },
  //     },
  //   ],
  // },
]

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [...routerList],
  },
  ...menuRouterList,
  {
    path: '/login',
    name: 'login',
    component: () => import('@/page/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/page/error/404.vue'),
  },
]
const router: Router = createRouter({ history: createWebHistory(), routes })
export default router
