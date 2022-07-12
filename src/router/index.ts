import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  Router,
} from 'vue-router'
import { formatFlatteningRoutes } from './utils.ts'
import { testing } from './modules/testing.ts'
import { list } from './modules/list.ts'

const Layout = () => import('@/layout/index.vue')

// 用于渲染菜单，面包屑，保持原始层级
export const routerList: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/page/home/index.vue'),
    meta: { title: '首页', type: 'single', icon: 'House' },
  },
  ...testing,
  ...list,
]

// 扁平化的路由
const flatRouters = formatFlatteningRoutes(routerList)

//
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
