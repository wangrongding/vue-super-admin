import { RouteRecordRaw } from 'vue-router'

export const list: RouteRecordRaw[] = [
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
