import { RouteRecordRaw } from 'vue-router'

export const list: RouteRecordRaw[] = [
  {
    path: '/list',
    component: () => import('@/page/list/index.vue'),
    meta: { title: '列表页', type: 'single', icon: 'Notebook' },
    children: [
      {
        path: '/list/detail',
        component: () => import('@/page/list/children-list.vue'),
        meta: { title: '子列表页', type: 'single' },
        children: [
          {
            path: '/list/detail/test',
            component: () => import('@/page/list/detail.vue'),
            meta: { title: '列表详情', type: 'single' },
          },
        ],
      },
    ],
  },
]
