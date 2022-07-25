import { RouteRecordRaw } from 'vue-router'

export const testing: RouteRecordRaw[] = [
  {
    path: '/testing',
    component: () => import('@/page/testing/index.vue'),
    meta: { title: '测试', type: 'single', icon: 'test-icon' },
    children: [
      {
        path: '/testing/detail',
        component: () => import('@/page/testing/index.vue'),
        meta: { title: '测试详情', type: 'single' },
      },
    ],
  },
]
