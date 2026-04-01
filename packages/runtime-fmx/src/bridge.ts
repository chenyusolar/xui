export interface FmxMessage {
  type: string
  payload?: any
  [key: string]: any
}

export interface FmxBridge {
  send(message: FmxMessage): void
  onMessage(type: string, handler: (payload: any) => void): void
  offMessage(type: string, handler: (payload: any) => void): void
  invoke<T = any>(type: string, payload?: any): Promise<T>
}

export class FmxWebViewBridge implements FmxBridge {
  private handlers: Map<string, Set<(payload: any) => void>> = new Map()
  private pendingRequests: Map<string, { resolve: (value: any) => void; reject: (error: any) => void }> = new Map()
  private messageId = 0

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('message', this.handleMessage.bind(this))
    }
  }

  send(message: FmxMessage): void {
    const webView = (window as any).chrome?.webview
    if (webView) {
      webView.postMessage(JSON.stringify(message))
    } else {
      console.warn('[XUI-FMX] WebView not available')
    }
  }

  onMessage(type: string, handler: (payload: any) => void): void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set())
    }
    this.handlers.get(type)!.add(handler)
  }

  offMessage(type: string, handler: (payload: any) => void): void {
    this.handlers.get(type)?.delete(handler)
  }

  async invoke<T = any>(type: string, payload?: any): Promise<T> {
    const id = `req_${++this.messageId}`
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject })
      this.send({ type, payload, _id: id })
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id)
          reject(new Error(`Request ${id} timed out`))
        }
      }, 30000)
    })
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
      const { type, payload, _id } = data

      if (_id && this.pendingRequests.has(_id)) {
        const { resolve, reject } = this.pendingRequests.get(_id)!
        this.pendingRequests.delete(_id)
        if (data.error) {
          reject(new Error(data.error))
        } else {
          resolve(payload)
        }
        return
      }

      this.handlers.get(type)?.forEach((handler) => handler(payload))
    } catch (e) {
      console.error('[XUI-FMX] Failed to parse message:', e)
    }
  }

  destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', this.handleMessage.bind(this))
    }
    this.handlers.clear()
    this.pendingRequests.clear()
  }
}

let bridge: FmxWebViewBridge | null = null

export function getFmxBridge(): FmxWebViewBridge {
  if (!bridge) {
    bridge = new FmxWebViewBridge()
    ;(window as any).__XUI_FMX_BRIDGE__ = bridge
  }
  return bridge
}

export function initFmxEnvironment(): void {
  ;(window as any).__XUI_FMX__ = true
  getFmxBridge()
}
