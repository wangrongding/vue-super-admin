/*
图标可通过以下链接获取
https://icones.js.org/

复制
*/

import MaterialSymbols360 from '~icons/material-symbols/360.vue'

// const requireComponent = import.meta.globEager('./svg/*.svg')
// console.log('🚀🚀🚀 / requireComponent', requireComponent)

// export const iconifyList = [MaterialSymbols360]
export const iconifyList = {
  MaterialSymbols360,
}

export function mountIcon(app) {
  Object.keys(iconifyList).forEach((key) => {
    app.component(key, iconifyList[key as keyof typeof iconifyList])
  })
}
