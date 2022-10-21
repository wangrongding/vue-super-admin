import { RouteRecordRaw, useRoute } from 'vue-router'
import { routerList } from '@/router/index'
import { getParentPaths } from '@/router/utils'
import './Menu.scss'
import SvgIcon from '@/components/SvgIcon/index.vue'

// import styles from '@/styles/variable.scss'

export default defineComponent({
  // name: 'Menu',
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
    const defaultActive = ref('/')
    // 父级路径
    const parentRoutes = ref<RouteRecordRaw>()
    // 获取激活的菜单
    function getDefaultActive() {
      // 当前路由的最顶级父路由
      parentRoutes.value = getParentPaths(route.path, routerList)[0]
      defaultActive.value = (parentRoutes.value?.path as string) || route.path
    }

    // 创建菜单
    function createMenuItem(item: any) {
      if (item.meta.hidden) return null
      if (!item.meta.type || item.meta.type === 'single') {
        return (
          <el-menu-item
            key={item.key}
            index={item.path}
            disabled={item.disabled}
            selected={item.selected}
            divided={item.divided}
            v-slots={{
              title: () => item.meta.title,
            }}
          >
            {item.meta.icon && (
              <SvgIcon iconName={item.meta.icon} color={'#fff'} />
            )}
            {/* <i-ep-expand /> */}
            {/* {item.meta.title} */}
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
            title: () => {
              return (
                <>
                  {item.meta.icon && (
                    <SvgIcon iconName={item.meta.icon} color={'#fff'} />
                  )}
                  <span>{item.meta.title}</span>
                </>
              )
            },
          }}
        >
          {item.children.map((child: RouteRecordRaw) => createMenuItem(child))}
        </el-sub-menu>
      )
    }

    // 监听路由变化
    watch(
      () => route,
      () => {
        getDefaultActive()
      },
      { immediate: true, deep: true },
    )

    return () => (
      <>
        <el-menu
          // mode='horizontal'
          collapse={props.isCollapse}
          class='el-menu-vertical'
          collapse-transition={false}
          background-color='transparent'
          menu-trigger='hover'
          default-openeds={[parentRoutes.value?.path]}
          text-color='#fff'
          default-active={defaultActive.value}
          unique-opened={true}
          active-text-color='#47ba80'
          router={true}
        >
          {routers.map((item: RouteRecordRaw) => createMenuItem(item))}
        </el-menu>
      </>
    )
  },
  watch: {},
})
