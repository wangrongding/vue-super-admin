import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  Router,
} from 'vue-router'
import { formatFlatteningRoutes } from './utils.ts'

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
        children: [
          {
            path: '/list/detail/test',
            component: () => import('@/page/list/detail2.vue'),
            meta: { title: '测试详情de详情', type: 'single' },
          },
        ],
      },
    ],
  },
]

const flatRouters = formatFlatteningRoutes(routerList)

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [...flatRouters],
  },
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
