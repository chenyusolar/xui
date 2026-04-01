import type { PlatformAPI, PlatformName, RequestOptions } from './platform'

export function detectPlatform(): PlatformName {
  if (typeof window !== 'undefined' && (window as any).__XUI_FMX__) {
    return 'fmx'
  }
  if (typeof wx !== 'undefined' && typeof (wx as any).getSystemInfoSync === 'function') {
    return 'mini'
  }
  return 'web'
}

export function createWebPlatform(): PlatformAPI {
  return {
    name: 'web',
    isWeb: true,
    isMini: false,
    isFmx: false,
    env: {},
    async request(options: RequestOptions) {
      const { url, method = 'GET', data, header = {}, timeout = 10000 } = options
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), timeout)
      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json', ...header },
          body: data ? JSON.stringify(data) : undefined,
          signal: controller.signal,
        })
        clearTimeout(timer)
        return res.json()
      } catch (e) {
        clearTimeout(timer)
        throw e
      }
    },
    storage: {
      get(key: string) {
        try { return JSON.parse(localStorage.getItem(key) || 'null') } catch { return null }
      },
      set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
      },
      remove(key: string) { localStorage.removeItem(key) },
      clear() { localStorage.clear() },
    },
    navigation: {
      push(url: string) { window.location.hash = url },
      replace(url: string) { window.location.replace('#' + url) },
      back(delta = 1) { history.go(-delta) },
    },
  }
}

export function createMiniPlatform(): PlatformAPI {
  const wxGlobal = typeof wx !== 'undefined' ? (wx as any) : null
  return {
    name: 'mini',
    isWeb: false,
    isMini: true,
    isFmx: false,
    env: {},
    async request(options: RequestOptions) {
      return new Promise((resolve, reject) => {
        wxGlobal.request({
          url: options.url,
          method: options.method || 'GET',
          data: options.data,
          header: options.header,
          timeout: options.timeout,
          success: resolve,
          fail: reject,
        })
      })
    },
    storage: {
      get(key: string) { return wxGlobal.getStorageSync(key) },
      set(key: string, value: any) { wxGlobal.setStorageSync(key, value) },
      remove(key: string) { wxGlobal.removeStorageSync(key) },
      clear() { wxGlobal.clearStorageSync() },
    },
    navigation: {
      push(url: string) { wxGlobal.navigateTo({ url }) },
      replace(url: string) { wxGlobal.redirectTo({ url }) },
      back(delta = 1) { wxGlobal.navigateBack({ delta }) },
    },
  }
}

export function createFmxPlatform(): PlatformAPI {
  const webView = typeof window !== 'undefined' ? (window as any).chrome?.webview : null
  const pendingRequests = new Map<string, { resolve: (value: any) => void; reject: (error: any) => void }>()
  let messageId = 0

  if (typeof window !== 'undefined') {
    window.addEventListener('message', (e: any) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        const msgId = data._id
        if (msgId && pendingRequests.has(msgId)) {
          const { resolve, reject } = pendingRequests.get(msgId)!
          pendingRequests.delete(msgId)
          if (data.error) reject(new Error(data.error))
          else resolve(data.payload)
        }
      } catch {
        // ignore non-xui messages
      }
    })
  }

  function sendAndWait(type: string, payload: Record<string, any> = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!webView) { reject(new Error('FMX WebView not available')); return }
      const id = `fmx_${++messageId}`
      pendingRequests.set(id, { resolve, reject })
      webView.postMessage(JSON.stringify({ type, payload, _id: id }))
      setTimeout(() => {
        if (pendingRequests.has(id)) {
          pendingRequests.delete(id)
          reject(new Error(`FMX request ${id} timed out`))
        }
      }, 10000)
    })
  }

  return {
    name: 'fmx',
    isWeb: false,
    isMini: false,
    isFmx: true,
    env: {},
    async request(options: RequestOptions) {
      return sendAndWait('request', options)
    },
    storage: {
      async get(key: string) {
        if (!webView) return null
        return sendAndWait('storage_get', { key })
      },
      async set(key: string, value: any) {
        if (!webView) return
        await sendAndWait('storage_set', { key, value })
      },
      async remove(key: string) {
        if (!webView) return
        await sendAndWait('storage_remove', { key })
      },
      async clear() {
        if (!webView) return
        await sendAndWait('storage_clear')
      },
    },
    navigation: {
      push(url: string) {
        if (webView) {
          webView.postMessage(JSON.stringify({ type: 'nav_push', url }))
        }
      },
      replace(url: string) {
        if (webView) {
          webView.postMessage(JSON.stringify({ type: 'nav_replace', url }))
        }
      },
      back(delta = 1) {
        if (webView) {
          webView.postMessage(JSON.stringify({ type: 'nav_back', delta }))
        }
      },
    },
  }
}

const platformMap: Record<PlatformName, () => PlatformAPI> = {
  web: createWebPlatform,
  mini: createMiniPlatform,
  fmx: createFmxPlatform,
}

let _platform: PlatformAPI | null = null

export function getPlatform(): PlatformAPI {
  if (!_platform) {
    const name = detectPlatform()
    _platform = platformMap[name]()
  }
  return _platform
}

export function setPlatform(name: PlatformName) {
  _platform = platformMap[name]()
}

export const platform = new Proxy({} as PlatformAPI, {
  get(_, prop) {
    return getPlatform()[prop as keyof PlatformAPI]
  },
})

export type { PlatformAPI, PlatformName, RequestOptions }
