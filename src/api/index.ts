import request from '@/utils/http/request'

// 生成问卷
export function login<T>(data: object, options?: object): Promise<T> {
  return request.get('/login', {
    data,
    ...options,
  })
}

// 获取用户信息
export function getUserInfo<T>(data: object, options?: object): Promise<T> {
  return request.get('/getUserInfo', {
    data,
    ...options,
  })
}

// 修改用户信息
export function restUserInfo<T>(data: object, options?: object): Promise<T> {
  return request.post(
    '/restUserInfo',
    {
      data,
    },
    { ...options },
  )
}
