import { parse as babelParse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'

export type TargetPlatform = 'web' | 'mini' | 'fmx'

export interface TransformOptions {
  target: TargetPlatform
  source: string
  filename?: string
  unitRatio?: number
}

const tagMap: Record<string, Record<string, string>> = {
  web: {
    view: 'div',
    text: 'span',
    image: 'img',
    'scroll-view': 'div',
    button: 'button',
    input: 'input',
  },
  mini: {
    view: 'view',
    text: 'text',
    image: 'image',
    'scroll-view': 'scroll-view',
    button: 'button',
    input: 'input',
  },
  fmx: {
    view: 'div',
    text: 'span',
    image: 'img',
    'scroll-view': 'div',
    button: 'button',
    input: 'input',
  },
}

function transformTemplate(template: string, target: TargetPlatform): string {
  const map = tagMap[target]
  let result = template

  Object.entries(map).forEach(([from, to]) => {
    const regex = new RegExp(`<(${from})([\\s>/])`, 'g')
    result = result.replace(regex, `<${to}$2`)
    const closeRegex = new RegExp(`</(${from})>`, 'g')
    result = result.replace(closeRegex, `</${to}>`)
  })

  if (target === 'web' || target === 'fmx') {
    result = result.replace(/\bclass=/g, 'class=')
  }

  return result
}

const eventMap: Record<string, string> = {
  click: 'tap',
  touchstart: 'touchstart',
  touchmove: 'touchmove',
  touchend: 'touchend',
  touchcancel: 'touchcancel',
  longpress: 'longpress',
  longtap: 'longtap',
  input: 'input',
  change: 'change',
  blur: 'blur',
  focus: 'focus',
  confirm: 'confirm',
  submit: 'submit',
  reset: 'reset',
  scroll: 'scroll',
  scrolltoupper: 'scrolltoupper',
  scrolltolower: 'scrolltolower',
}

function transformEventBinding(attr: string, value: string, target: TargetPlatform): string {
  if (target !== 'mini') return `${attr}="${value}"`

  const eventMatch = attr.match(/^@(vue:)?([a-zA-Z-]+)(\.(prevent|stop|capture|once|self))?$/)
  if (!eventMatch) return `${attr}="${value}"`

  const [, , eventName, , modifiers] = eventMatch
  const miniEvent = eventMap[eventName] || eventName

  let bindAttr = `bind${miniEvent}`
  if (modifiers?.includes('capture')) {
    bindAttr = `capture-${miniEvent}`
  }

  return `${bindAttr}="${value}"`
}

function transformMiniTemplate(template: string): string {
  let result = transformTemplate(template, 'mini')

  result = result.replace(/v-for="([^"]+)"/g, (match, expr) => {
    const itemMatch = expr.match(/^(\w+)\s+in\s+(\w+)$/)
    if (itemMatch) {
      return `wx:for="{{${itemMatch[2]}}}" wx:for-item="${itemMatch[1]}" wx:key="${itemMatch[1]}.id || index"`
    }
    const ofMatch = expr.match(/^(\w+)(?:,\s*(\w+))?\s+of\s+(\w+)$/)
    if (ofMatch) {
      const key = ofMatch[2] ? `${ofMatch[2]}.id || index` : 'index'
      return `wx:for="{{${ofMatch[3]}}}" wx:for-item="${ofMatch[1]}"${ofMatch[2] ? ` wx:for-index="${ofMatch[2]}"` : ''} wx:key="${key}"`
    }
    return `wx:for="{{${expr}}}" wx:key="index"`
  })

  result = result.replace(/v-if="([^"]+)"/g, 'wx:if="{{$1}}"')
  result = result.replace(/v-else-if="([^"]+)"/g, 'wx:elif="{{$1}}"')
  result = result.replace(/v-else/g, 'wx:else')
  result = result.replace(/v-show="([^"]+)"/g, 'wx:if="{{$1}}"')
  result = result.replace(/v-model="([^"]+)"/g, 'value="{{' + '$1' + '}}" bindinput="__handleInput"')

  result = result.replace(/@([a-zA-Z-]+)(?:\.[a-zA-Z]+)*="([^"]+)"/g, (match, event, value) => {
    return transformEventBinding(`@${event}`, value, 'mini')
  })

  result = result.replace(/:style="([^"]+)"/g, 'style="{{' + '$1' + '}}"')
  result = result.replace(/:class="([^"]+)"/g, 'class="{{' + '$1' + '}}"')

  return result
}

function transformPxToUnit(css: string, target: TargetPlatform, unitRatio = 2): string {
  return css.replace(/(\d+)px/g, (_match, value) => {
    if (target === 'mini') {
      return `${parseInt(value) * unitRatio}rpx`
    }
    return `${value}px`
  })
}

function transformScript(script: string, target: TargetPlatform): string {
  let result = script

  if (target === 'web' || target === 'fmx') {
    result = result.replace(/from\s+['"]@xui\/runtime-web['"]/g, `from '@xui/runtime-web'`)
  } else if (target === 'mini') {
    result = result.replace(/from\s+['"]@xui\/runtime-web['"]/g, `from '@xui/runtime-mini'`)
  }

  return result
}

export function transformSFC(options: TransformOptions): {
  template: string
  script: string
  styles: string[]
} {
  const { source, target, unitRatio = 2 } = options

  const templateMatch = source.match(/<template[^>]*>([\s\S]*?)<\/template>/)
  const scriptMatch = source.match(/<script[^>]*>([\s\S]*?)<\/script>/)
  const styleMatches = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]

  const template = templateMatch
    ? target === 'mini'
      ? transformMiniTemplate(templateMatch[1])
      : transformTemplate(templateMatch[1], target)
    : ''
  const script = scriptMatch ? transformScript(scriptMatch[1], target) : ''
  const styles = styleMatches.map((m) => transformPxToUnit(m[1], target, unitRatio))

  return { template, script, styles }
}

export function transformCss(css: string, target: TargetPlatform, unitRatio = 2): string {
  return transformPxToUnit(css, target, unitRatio)
}

export function transformHtml(html: string, target: TargetPlatform): string {
  return transformTemplate(html, target)
}
