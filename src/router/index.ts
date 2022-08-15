import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  Router,
} from 'vue-router'
import { formatFlatteningRoutes } from './utils'
import { testing } from './modules/testing'
import { list } from './modules/list'
import { home } from './modules/home'

const Layout = () => import('@/layout/index.vue')

// 用于渲染菜单，面包屑，保持原始层级
export const routerList: Array<RouteRecordRaw> = [...home, ...testing, ...list]

// 扁平化的路由
const flatRouters = formatFlatteningRoutes(routerList)

//
export const routes: Array<RouteRecordRaw> = [
  // 根目录重定向的页面
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [...flatRouters],
  },
  // 登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('@/page/login/index.vue'),
    meta: { title: '登陆' },
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/page/error/404.vue'),
  },
]
const router: Router = createRouter({ history: createWebHistory(), routes })
export default router
