// 预加载Css
export function preloadCss(src: string) {
  const head = document.getElementsByTagName('head')[0]
  const css = document.createElement('link')
  css.type = 'text/css'
  css.rel = 'stylesheet'
  css.href = src
  head.appendChild(css)
}
// 预加载Js
export function preloadJs(src: string) {
  const head = document.getElementsByTagName('head')[0]
  const js = document.createElement('script')
  js.type = 'text/javascript'
  js.src = src
  head.appendChild(js)
}
// 预加载图片
export function preloadImg(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(0)
    }
    img.onerror = () => {
      reject()
    }
    img.src = src
  })
}
// 预加载资源
export function preloadSource(src: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', src)
    xhr.onload = (res) => {
      // 处理取回的数据(在 http.response 中找到)
      resolve(res)
    }
    xhr.send()
  })
}

// 预加载图片列表
export function preloadImgList(list: any[]) {
  for (let i = 0; i < list.length; i += 1) {
    const img = new Image()
    img.src = list[i]
    // img.onload = (e) => {
    // };
    // img.onerror = (e) => {
    // };
  }
}

// 预加载视频
export function preloadVideoList(list: any[]) {
  for (let i = 0; i < list.length; i += 1) {
    const img = new Image()
    img.src = list[i]
    // img.onload = (e) => {
    // };
    // img.onerror = (e) => {
    // };
  }
}
