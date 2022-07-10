import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosPromise
} from 'axios'

import { apiKeyType, apiKeyDataType, api } from './api'

type ResultDataType = apiKeyDataType[apiKeyType]

interface INewAxiosInstance extends AxiosInstance {
  // 设置泛型T，默认为any，将请求后的结果返回变成AxiosPromise<T>
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>,
    response: AxiosInterceptorManager<AxiosResponse<ResultDataType>>
  }
}

const instance: INewAxiosInstance = axios.create({
  baseURL: '/api'
})

instance.interceptors.response.use((response) => {
  const { status, statusText } = response
  if (status === 200 && statusText === 'OK') {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
})

export default <T extends apiKeyType>(obj: AxiosRequestConfig & { url: T }) => {

  return new Promise<apiKeyDataType[T]>((resolve, reject) => {
    instance<apiKeyDataType[T]>({
      url: api[obj.url],
      data: obj.data || {},
      method: obj.method || 'GET',
      responseType: obj.responseType || 'json'
    }).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    })
  })
}
