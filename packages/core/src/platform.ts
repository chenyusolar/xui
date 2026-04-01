export interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
  timeout?: number
}

export interface StorageAPI {
  get(key: string): Promise<any> | any
  set(key: string, value: any): Promise<void> | void
  remove(key: string): Promise<void> | void
  clear(): Promise<void> | void
}

export interface NavigationAPI {
  push(url: string, params?: Record<string, any>): void
  replace(url: string, params?: Record<string, any>): void
  back(delta?: number): void
}

export interface PlatformAPI {
  name: 'web' | 'mini' | 'fmx'
  request(options: RequestOptions): Promise<any>
  storage: StorageAPI
  navigation: NavigationAPI
  isWeb: boolean
  isMini: boolean
  isFmx: boolean
  env: Record<string, any>
}

export type PlatformName = 'web' | 'mini' | 'fmx'
