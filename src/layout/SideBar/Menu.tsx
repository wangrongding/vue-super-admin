import { RouteRecordRaw, useRoute } from 'vue-router'
import { routerList } from '@/router/index.ts'
import { getParentPaths } from '@/router/utils.ts'
import './Menu.scss'
// import styles from '@/styles/variable.scss'

export default defineComponent({
  name: 'Menu',
  components: {
    ElMenu,
    ElSubMenu,
    ElMenuItem,
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const routers = routerList
    const route = useRoute()
    // 默认高亮的菜单
    const defaultActive = ref('/home')
    // 获取激活的菜单
    function getDefaultActive() {
      // 当前路由的父级路径
      const parentRoutes = getParentPaths(route.path, routerList)[0]
      defaultActive.value = parentRoutes?.path || route.path
    }

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
            {/* <el-icon color='#00000080' size='20'>
            </el-icon> */}
            <i-ep-expand />
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

    // 监听路由变化
    watch(
      () => route.path,
      () => {
        getDefaultActive()
      },
      { immediate: true },
    )

    return () => (
      <>
        <el-menu
          // mode='horizontal'
          collapse={props.isCollapse}
          background-color='transparent'
          menu-trigger='hover'
          text-color='#000000'
          default-active={defaultActive.value}
          unique-opened={true}
          active-text-color='#027AFF'
          router={true}
        >
          {routers.map((item: RouteRecordRaw) => createMenuItem(item))}
        </el-menu>
      </>
    )
  },
  watch: {},
})
