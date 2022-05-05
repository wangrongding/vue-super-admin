# 框架模板搭建过程记录

Vue 3 + Typescript + Vite + VueRouter4 + Pinia

## 设置别名

需要 path 模块

```typescript
import * as path from 'path';
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
});
```

\*\*\* 项目中引入的文件，需要添加后缀，如下

```typescript
import { useState } from '@/store/index.ts';
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
import { createPinia } from 'pinia';
const pinia = createPinia();
export default pinia;
```

install pinia

```typescript
import pinia from './store';
const app = createApp(App);
app.use(pinia).mount('#app');
```

创建 Store

```typescript
export const useStore = defineStore('main', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
    };
  },
  getters: {},
  actions: {},
});
```

即可直接使用

```html
<script setup lang="ts">
  import { useStore } from '@/store/index.ts';
  const store = useStore();
</script>
<template> <button @click="store.counter++">changeCount</button>{{ store.counter }} </template>
```

## scss 以及 styleLint

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

由于 Stylelint v14 及以上 做了 break change ，不再解析非 css 文件，所以很多原来老的配置方法已经不行
了。官方也给出了相关说明：

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
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue'],
  rules: {
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'max-empty-lines': 1,
  },
};
```

让 stylelint 集成`stylelint-config-standard-scss`和`stylelint-config-recommended-vue`的规则配置我们
也可以在 rules 里写一些自定义的规则覆盖继承的规则，自己写的 rules 的权值大于集成的规则。

如果你不想用`stylelint-config-recommended-vue`中的规则，只借助它的解析能力。那么你只要把 extends 中
改为`stylelint-config-html/vue`即可。

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

为了不让自己每次在 commit 才校验出代码有问题，我们最好装一个 stylelint 插件，这样一边写，可以看到有
问题的代码底下出现红线，鼠标移上去可以看到具体的问题所在，和 eslint 一模一样的玩法。

只是需要注意的是：安装 stylelint 插件后，首先要根据自己的情况选择在全局设置或者工作区设置扩展需要验
证的文件集合

可以通过`ctrl+,`打开设置面板，选择用户或者工作区，找到扩展->Stylelint->Validate,后点击添加项，依次添
加即可

![](https://gitee.com/wangrongding/image-house/raw/master/images/202204080104909.png)

或者你直接在 settings.json 里添加如下内容

```json
{ "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"] }
```

如果只需要在工作区作用的话，在根目录建一个`.vscode`文件夹，然后在里面建一个`settings.json`文件，把上
述内容写进去即可。

## Eslint

```sh
# 初始化eslint配置文件，并安装相关依赖
npx eslint --init
```

执行命令后选择对应的配置即可
![](https://raw.githubusercontent.com/wangrongding/image-house/master/images202205060013009.png)

我这里选择的是 Airbnb 的规范，Airbnb config 有一个规则 eslint(import/no-unresolved)，这很好，但是
Eslint 不知道如何解析别名路径。我这里直接在 rules 中设置`'import/no-unresolved': 0`，把它关了。

我们是 Vue3 的项目，所以我们需要把`plugin:vue/essential`改成`plugin:vue/vue3-recommended`，这样就可
以把 vue3 的规则都引入了。

或者你也可以在 https://eslint.vuejs.org/ 中找到其它更符合你的配置来继承。

```diff
extends: [
--'plugin:vue/essential',
++'plugin:vue/vue3-recommended',
  'airbnb-base',
]
```

## 包管理器限制

npm ,yarn,pnpm lock 文件
