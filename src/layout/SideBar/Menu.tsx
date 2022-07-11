import { RouteRecordRaw, useRoute } from 'vue-router'
import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus'
import { routerList } from '@/router/index.ts'
import './Menu.scss'
// import styles from '@/styles/variable.scss'

export default defineComponent({
  name: 'Menu',
  components: {
    ElMenu,
    ElSubMenu,
    ElMenuItem,
  },
  setup(props) {
    const routers = routerList
    // console.log('🚀🚀🚀 / routers', routers)
    const route = useRoute()
    // 创建菜单
    function createMenuItem(item: any) {
      if (!item.meta.type || item.meta.type === 'single') {
        return (
          <el-menu-item
            key={item.key}
            index={item.path}
            disabled={item.disabled}
            selected={item.selected}
            divided={item.divided}
          >
            {item.meta.title}
          </el-menu-item>
        )
      }
      return (
        <el-sub-menu
          index={item.path}
          hide-timeout={50}
          show-timeout={50}
          popper-offset={0}
          v-slots={{
            title: () => item.meta.title,
          }}
        >
          {item.children.map((child: RouteRecordRaw) => createMenuItem(child))}
        </el-sub-menu>
      )
    }
    return () => (
      <>
        <el-menu
          default-active={route.matched[0].path}
          // mode='horizontal'
          background-color='transparent'
          menu-trigger='hover'
          text-color='#000000'
          unique-opened={true}
          active-text-color='#027AFF'
          router={true}
        >
          {routers.map((item: RouteRecordRaw) => createMenuItem(item))}
          <el-menu-item>
            <a href='https://www.fedtop.com' target='_blank'>
              我的博客
            </a>
          </el-menu-item>
          {/* index={route.matched[route.matched.length - 1].path} */}
          <el-menu-item>
            <a href='https://github.com/wangrongding' target='_blank'>
              GitHub
            </a>
          </el-menu-item>
        </el-menu>
      </>
    )
  },
})
