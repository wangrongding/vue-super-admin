import { Method, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

export type resultType = {
  accessToken?: string
}

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export interface HttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void
  beforeResponseCallback?: (response: HttpResponse) => void
}

export interface HttpResponse extends AxiosResponse {
  config: HttpRequestConfig
}
export interface HttpError extends AxiosError {
  isCancelRequest?: boolean
}

export default class Http {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig,
  ): Promise<T>

  post<T, P>(url: string, params?: T, config?: HttpRequestConfig): Promise<P>

  get<T, P>(url: string, params?: T, config?: HttpRequestConfig): Promise<P>
}
