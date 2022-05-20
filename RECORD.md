# 框架模板搭建过程记录

技术栈: Vue3 + Typescript + Vite + VueRouter4 + Pinia + Axios + Element-Plus  
代码质量校验与代码风格校验: Eslint, Prettier, Stylelint  
git 提交信息校验: Commitlint

项目中用到了`husky, lint-staged, commitizen, commitlint`详细说明的部分，请参考我之前写的一篇系列文章: [谁动了我的代码！(协同仓库该有的规范)🔥](https://juejin.cn/post/7063912026384367629)

## 目录结构命名规范

```sh
- template-demo # 统一使用kebab-case（短横线）命令法来命名文件夹
  - CustomerRefuse.vue # 单文件组件命名规则，参考vue风格指南
  # 如果组件内容较多，创建一个文件夹
  # 命名以npm包命名规则一致，全小写、-分隔，建议不超过3个单词
  - no-permission
    - src # 其他资源目录，参考Element组件源码
    - index.vue # 入口或者使用index.js 方便 Vue.use 引入
- index.vue # 模块A入口
```

## Eslint 代码质量约束

```sh
# 初始化eslint配置文件，并安装相关依赖
npx eslint --init
```

执行命令后选择对应的配置即可 ![](https://raw.githubusercontent.com/wangrongding/image-house/master/images202205060013009.png)

我这里选择的是 Airbnb 的规范，Airbnb config 有一个规则 eslint(import/no-unresolved)，这很好，但是 Eslint 不知道如何解析别名路径。我这里直接在 rules 中设置`'import/no-unresolved': 0`，把它关了。

我们是 Vue3 的项目，所以我们需要把`plugin:vue/essential`改成`plugin:vue/vue3-recommended`，这样就可以把 vue3 的规则都引入了。

或者你也可以在 https://eslint.vuejs.org/ 中找到其它更符合你的配置来继承。

```diff
extends: [
--'plugin:vue/essential',
++'plugin:vue/vue3-recommended',
  'airbnb-base',
]
```

vue3 中有诸如 defineProps 之类的全局的预编译宏，而 eslint 不知其定义在哪里，需要在 global 选项中将其标注出来，由于 `eslint-plugin-vue` 为我们预设好了，我们只需要在 env 中添加如下代码即可。

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    // 开启setup语法糖环境 👇
    "vue/setup-compiler-macros": true
  }
}
```

## Scss 以及 Stylelint 样式规范约束

```sh
yarn add sass -D
```

### 使用 scss

项目中使用 scss 不需要在哪里引入，安装完 sass 后，直接在 style 中使用即可。

```html
<style scoped lang="scss">
  .text {
    color: #42b983;
  }
</style>
```

在 vite.config.js 中通过 css.preprocessorOptions.scss.additionalData 可注入全局预定义的变量和样式

代码如下 👇

```json
{
  "css": {
    // css预处理器
    "preprocessorOptions": {
      "scss": {
        // 在全局中使用 index.scss中预定义的变量
        "additionalData": "@import \"./src/styles/index.scss\";"
      }
    }
  }
}
```

### 使用 stylelint

```sh
yarn add stylelint -D
```

由于 Stylelint v14 及以上 做了 break change ，不再解析非 css 文件，所以很多原来老的配置方法已经不行了。官方也给出了相关说明：

> Stylelint 不再包含以下语法：
>
> - 解析类 CSS 语言，如 SCSS、Sass、Less 和 SugarSS
> - 从 HTML、Markdown 和 CSS-in-JS 对象和模板文字中提取样式

所以当我们项目需要对 scss，vue，html 等文件进行校验时，则需要额外安装依赖来实现。

例如：

- `stylelint-config-html`支持解析 HTML、XML、Vue、Svelte 和 PHP，且提供它们的标准配置
- `stylelint-config-standard-scss`支持 lint SCSS 文件及提供 SCSS 的标准配置
- `stylelint-config-recommended-vue`支持 lint Vue 文件及提供 vue 的标准配置

这里我只选择`stylelint-config-standard-scss`和`stylelint-config-recommended-vue`，下面安装他们。

```sh
yarn add stylelint-config-recommended-vue stylelint-config-standard-scss -D
```

安装完成后我们在项目根目录中新建一个`stylelint.config.js`文件。

```javascript
module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'max-empty-lines': 1,
  },
}
```

让 stylelint 集成`stylelint-config-standard-scss`和`stylelint-config-recommended-vue`的规则配置我们也可以在 rules 里写一些自定义的规则覆盖继承的规则，自己写的 rules 的权值大于集成的规则。

如果你不想用`stylelint-config-recommended-vue`中的规则，只借助它的解析能力。那么你只要把 extends 中改为`stylelint-config-html/vue`即可。

```diff
module.exports = {
  defaultSeverity: "error",
  extends: [
    "stylelint-config-standard-scss",
--    "stylelint-config-recommended-vue",
++    "stylelint-config-html/vue",
  ],
  rules: {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "max-empty-lines": 1,
  },
};
```

然后自己写自己团队的规则或者使用`stylelint-config-standard`的共享规则配置。

### vscode 插件 stylelint

为了不让自己每次在 commit 才校验出代码有问题，我们最好装一个 stylelint 插件，这样一边写，可以看到有问题的代码底下出现红线，鼠标移上去可以看到具体的问题所在，和 eslint 一模一样的玩法。

只是需要注意的是：安装 stylelint 插件后，首先要根据自己的情况选择在全局设置或者工作区设置扩展需要验证的文件集合

可以通过`ctrl+,`打开设置面板，选择用户或者工作区，找到扩展->Stylelint->Validate, 后点击添加项，依次添加即可

![](https://gitee.com/wangrongding/image-house/raw/master/images/202204080104909.png)

或者你直接在 settings.json 里添加如下内容

```json
{ "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"] }
```

如果只需要在工作区作用的话，在根目录建一个`.vscode`文件夹，然后在里面建一个`settings.json`文件，把上述内容写进去即可。

## Prettier 格式化代码

### 解决 Prettier 和 Eslint 的冲突

`eslint-config-prettier`关闭所有不必要或可能与 Prettier 冲突的规则。

安装

```sh
npm install  eslint-config-prettier -D
# or
yarn add  eslint-config-prettier -D
```

在 eslint 配置文件的 extends 中添加如下配置

```json
{
  "extends": [
    "other ...",
    "prettier" // prettier规范,覆盖eslint格式配置,写在最后
  ]
}
```

更多详细的可以看 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme)

### 解决 Prettier 和 StyleLint 的冲突

`stylelint-config-prettier` 用于关闭所有不必要或可能与 Prettier 冲突的规则。这使您可以使用自己喜欢的可共享配置，而不会在使用 Prettier 时妨碍其风格选择。

安装 `stylelint-config-prettier`：

```sh
npm install stylelint-config-prettier -D
# or
yarn add stylelint-config-prettier -D
```

然后，追加 `stylelint-config-prettier` 到配置文件中的 extends 数组中。确保把它放在最后，所以它会覆盖其他配置。

```json
{
  "extends": [
    // other configs ...
    "stylelint-config-prettier"
  ]
}
```

`stylelint-config-prettier` 附带一个小 CLI 工具，可帮助您检查您的配置是否包含任何与 Prettier 冲突的规则。

为了执行 CLI 工具，首先为其添加一个脚本 package.json：

```json
{
  "scripts": {
    "stylelint-check": "stylelint-config-prettier-check"
  }
}
```

然后运行 stylelint-check 命令

```sh
npm run stylelint-check
# or
yarn stylelint-check
```

## 项目包管理器限制

解决团队成员，使用的包管理器不统一导致的项目出现不可预知的问题（npm,yarn,pnpm,cnpm...）  
一款自己写的超 mini 包管理器限制器 `npm-limit` , 在 scripts 中添加如下 preinstall 命令即可。

```json
{
  "scripts": {
    "preinstall": "npx npm-limit yarn"
  }
}
```

## 项目中设置路径别名

需要 path 模块

```typescript
import * as path from 'path'
```

path 模块@types/node 依赖

```sh
yarn add @types/node@latest -S
```

在 tsconfig.json 中 compilerOptions 对象下添加如下 paths 配置

```json
{
  "compilerOptions": {
    "paths": {
      "@": ["./src"]
    }
    // "allowSyntheticDefaultImports": true
  }
}
```

在 vite.config.ts 中 添加如下 resolve 配置

```typescript
export default defineConfig({
  resolve: {
    //设置别名
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    extensions: ['.ts', '.js'],
  },
})
```

\*\*\* 项目中引入的文件，需要添加后缀，如下

```typescript
import { useState } from '@/store/index.ts'
```

为确保 tsconfig 正确 include 最好不要不写`.ts`尾缀！

## VueRouter4

```sh
yarn add vue-router@latest
# 或者使用 npm
npm install vue-router@latest
```

## Pinia

```sh
yarn add pinia
# 或者使用 npm
npm install pinia
```

创建 pinia 实例

```typescript
import { createPinia } from 'pinia'
const pinia = createPinia()
export default pinia
```

install pinia

```typescript
import pinia from './store'
const app = createApp(App)
app.use(pinia).mount('#app')
```

创建 Store

```typescript
export const useStore = defineStore('main', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
    }
  },
  getters: {},
  actions: {},
})
```

即可直接使用

```html
<script setup lang="ts">
  import { useStore } from '@/store/index.ts'
  const store = useStore()
</script>
<template>
  <button @click="store.counter++">changeCount</button>
  {{ store.counter }}
</template>
```

## Api 自动导入

unplugin-auto-import 是一个用于自动导入 api 的插件，可以自动导入 api 到项目中。

```sh
npm install -D unplugin-auto-import
# or
yarn add -D unplugin-auto-import
```

```typescript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      // 目标文件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // 全局引入插件
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
          '[package-name]': [
            '[import-names]',
            // alias
            ['[from]', '[alias]'],
          ],
        },
      ],
    }),
  ],
})
```

解决自动引入 api 后 eslint 报错, 可以添加以下代码后重启服务

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    AutoImport({
      include: [...],
      imports: [...],
      // eslint报错解决方案
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
});
```

重启服务后会在根目录生成一个 .eslintrc-auto-import.json 文件然后回到 eslint 的配置文件的 extends 中，添加`.eslintrc-auto-import.json`

```json
{
  "extends": [
   "other..."
 ++".eslintrc-auto-import.json"
  ]
}
```

解决自动引入 api 后 Ts 报错，在 tsconfig.json 的 include 中添加`auto-imports.d.ts`

```json
{
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
  ++"auto-imports.d.ts" // 此处引入该声明文件
  ]
}
```

## 组件自动导入

通过 `unplugin-vue-components` 插件实现，`unplugin-vue-components` 是一个用于 Vue 按需自动导入组件的插件。安装

```sh
npm install -D unplugin-vue-components
# or
yarn add -D unplugin-vue-components
```

使用

```typescript
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      /* options */
    }),
  ],
})
```

## Element-Plus

在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型，可以有 Volar 的支持。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

### 自动导入组件

借助 unplugin-vue-components 和 unplugin-auto-import 这两款插件

```sh
npm install -D unplugin-vue-components unplugin-auto-import
# or
yarn add -D unplugin-vue-components unplugin-auto-import
```

在 Vite.config.ts 中添加如下配置

```typescript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```
