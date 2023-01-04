// https://vitejs.dev/config/
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import VueTypeImports from 'vite-plugin-vue-type-imports'

import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

export default defineConfig((config) => ({
  plugins: [
    vue({
      // 开启响应式语法糖
      reactivityTransform: true,
    }),
    // TODO vue3.3的时候去除，3.2目前不支持definedProp使用引入的Type。⬇️
    VueTypeImports(),
    viteCompression(), // gzip压缩
    // 从你的package.json vite领域扩展Vite配置。
    PkgConfig(),
    // 坚持动态分析的依赖关系优化
    OptimizationPersist(),
    // 引入 svg
    vueJsx(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      // 所有的 svg的文件都存放在该文件夹下
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      symbolId: 'icon-[name]',
    }),
    Icons({
      // autoInstall: true,
      compiler: 'vue3',
      defaultStyle: 'font-size: 16px;',
    }),
    // Api自动导入
    AutoImport({
      dts: true,
      // 目标文件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      // 全局引入插件
      imports: [
        'vue',
        'vue-router',
        {
          'element-plus': [
            'ElMenuItem',
            'ElSubMenu',
            'ElMenu',
            'ElMessage',
            'ElMessageBox',
          ],
        },
      ],
      resolvers: [
        // 自动导入Element-Plus的Api
        ElementPlusResolver(),
        // 自动导入图标组件
        // 自动导入必须遵循名称格式 {prefix：默认为i}-{collection：图标集合的名称}-{icon：图标名称}
        IconsResolver({
          // enabledCollections: ['ep'],
          extension: 'vue',
        }),
      ],
      // eslint报错解决方案
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    // 按需导入组件
    Components({
      dts: true, // enabled by default if `typescript` is installed
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          extension: 'vue',
          // enabledCollections: ['ep'],
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
      // 遍历子目录
      deep: true,
    }),
    Inspect(),
  ],
  // 服务器特定选项，如主机、端口、https…
  server: {
    host: '0.0.0.0',
    port: 8083,
    open: false,
    hmr: true,
    proxy: {
      '/api': {
        target: loadEnv(config.mode, process.cwd()).VITE_APP_BASE_API,
        changeOrigin: true,
        rewrite: (pathStr) => pathStr.replace(/^\/api/, ''),
      },
    },
  },
  // 配置解析器
  resolve: {
    // 设置别名
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    extensions: ['.ts', '.js', 'tsx'],
  },
  // 预处理器和Css模块
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 给含有中文的scss文件添加 @charset:UTF-8;
        charset: false,
        // 在全局中使用 index.scss中预定义的变量
        additionalData:
          '@import "./src/styles/variable.scss";@import "./src/styles/element.scss";',
      },
    },
    // 暂时移除，会导致 tailwind css 无法使用
    // postcss: {
    //   plugins: [
    //     {
    //       // 通过postcss删除组件库中 scss 文件的 @charset:UTF-8
    //       postcssPlugin: 'internal:charset-removal',
    //       AtRule: {
    //         charset: (atRule) => {
    //           if (atRule.name === 'charset') {
    //             atRule.remove()
    //           }
    //         },
    //       },
    //     },
    //   ],
    // },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ['echarts'],
        },
      },
    },
  },
  // 热更新时，清空控制台
  clearScreen: true,
}))
