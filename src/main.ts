import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router/index.ts'
import pinia from './store/index.ts'
import 'element-plus/dist/index.css'
import '@/router/permission.ts'

// 公共样式
import '@/styles/index.scss'

const app = createApp(App)
// 全局挂载所有图标
Object.keys(ElementPlusIconsVue).forEach((key) => {
  app.component(
    key,
    ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue],
  )
})

app.use(router).use(pinia).mount('#app')
