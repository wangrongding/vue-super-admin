# 框架模板搭建过程记录

Vue 3 + Typescript + Vite + VueRouter4 + Pinia

## 设置别名

需要 path 模块

```typescript
import * as path from "path";
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
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    extensions: [".ts", ".js"],
  },
});
```

\*\*\* 项目中引入的文件，需要添加后缀，如下

```typescript
import { useState } from "@/store/index.ts";
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
import { createPinia } from "pinia";
const pinia = createPinia();
export default pinia;
```

install pinia

```typescript
import pinia from "./store";
const app = createApp(App);
app.use(pinia).mount("#app");
```

创建 Store

```typescript
export const useStore = defineStore("main", {
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
  import { useStore } from "@/store/index.ts";
  const store = useStore();
</script>
<template>
  <button @click="store.counter++">changeCount</button>{{ store.counter }}
</template>
```
