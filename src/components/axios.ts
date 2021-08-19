import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Notify } from 'quasar'

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance

  public constructor(baseURL = 'http://localhost:8080', timeout = 6000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    })
    this._initializeResponseInterceptor()
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleErrorResp
    )
  }

  private _handleResponse = ({ data: Data }: AxiosResponse) => {
    if (Data.code == undefined) {
      return Data
    }

    const { code, message, data } = Data
    if (code >= 400) {
      Notify.create({
        type: 'negative',
        message,
      })
    }
    return data
  }

  protected _handleErrorResp = (err: any) => {
    Notify.create({
      type: 'negative',
      message: '请求出错...',
    })

    Promise.reject(err)
  }
}

class NoAuthApi extends HttpClient {
  private static classInstance?: NoAuthApi

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new NoAuthApi()
    }
    return this.classInstance
  }

  //   public login = (user: User) => this.instance.post<string>('user/login', user)
}

class MainApi extends HttpClient {
  private static classInstance?: MainApi

  private constructor() {
    super()
    this._initializeRequestInterceptor()
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi()
    }
    return this.classInstance
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    )
  }

  private _handleRequest = (config: AxiosRequestConfig) => {
    const token = sessionStorage.getItem('token') as string
    config.headers['Authorization'] = `Bearer ${token}`

    return config
  }

  private _handleError = (err: any) => Promise.reject(err)
}

export { NoAuthApi, MainApi }
