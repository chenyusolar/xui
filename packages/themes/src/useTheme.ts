import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'
export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red'

export interface ThemeConfig {
  mode: ThemeMode
  color: ThemeColor
  borderRadius: 'sm' | 'md' | 'lg'
  fontSize: 'compact' | 'normal' | 'relaxed'
  customVars: Record<string, string>
}

const STORAGE_KEY = 'xui-theme-config'

const defaultConfig: ThemeConfig = {
  mode: 'light',
  color: 'blue',
  borderRadius: 'md',
  fontSize: 'normal',
  customVars: {},
}

let _config: Ref<ThemeConfig> | null = null
let _isDark: ComputedRef<boolean> | null = null

function loadConfig(): ThemeConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultConfig, ...JSON.parse(stored) }
    }
  } catch {
    // ignore
  }
  return { ...defaultConfig }
}

function saveConfig(config: ThemeConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {
    // ignore
  }
}

async function loadDarkCss() {
  if (typeof document === 'undefined') return
  const existing = document.getElementById('xui-theme-dark')
  if (existing) return
  const link = document.createElement('link')
  link.id = 'xui-theme-dark'
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/@xui/themes@0.1.0/dist/themes/dark.css'
  document.head.appendChild(link)
}

function applyTheme(config: ThemeConfig) {
  const root = document.documentElement
  if (!root) return

  root.classList.remove('light', 'dark')
  const theme = config.mode === 'auto' ? getSystemTheme() : config.mode
  root.setAttribute('data-theme', theme)

  if (theme === 'dark') {
    loadDarkCss()
  }

  if (config.mode === 'auto') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      root.setAttribute('data-theme', getSystemTheme())
      if (getSystemTheme() === 'dark') {
        loadDarkCss()
      }
    }
    mediaQuery.removeEventListener('change', handler)
    mediaQuery.addEventListener('change', handler)
  }

  const colorMap: Record<ThemeColor, { primary: string; bg: string }> = {
    blue: { primary: '#1677ff', bg: '#e6f4ff' },
    green: { primary: '#52c41a', bg: '#f6ffed' },
    purple: { primary: '#722ed1', bg: '#f9f0ff' },
    orange: { primary: '#fa8c16', bg: '#fff7e6' },
    red: { primary: '#f5222d', bg: '#fff1f0' },
  }

  const colors = colorMap[config.color]
  if (colors) {
    root.style.setProperty('--xui-color-primary', colors.primary)
    root.style.setProperty('--xui-color-primary-bg', colors.bg)
  }

  const radiusMap = { sm: '4px', md: '8px', lg: '12px' }
  root.style.setProperty('--xui-border-radius-md', radiusMap[config.borderRadius])

  const fontSizeMap = { compact: '13px', normal: '14px', relaxed: '15px' }
  root.style.setProperty('--xui-font-size-md', fontSizeMap[config.fontSize])

  Object.entries(config.customVars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme(initialConfig?: Partial<ThemeConfig>) {
  if (!_config) {
    const config = { ...loadConfig(), ...initialConfig }
    _config = ref<ThemeConfig>(config)
    _isDark = computed(() => {
      if (_config!.value.mode === 'auto') return getSystemTheme() === 'dark'
      return _config!.value.mode === 'dark'
    })
    applyTheme(config)

    watch(_config, (newConfig) => {
      saveConfig(newConfig)
      applyTheme(newConfig)
    }, { deep: true })
  }

  function setMode(mode: ThemeMode) {
    _config!.value.mode = mode
  }

  function setColor(color: ThemeColor) {
    _config!.value.color = color
  }

  function setBorderRadius(size: 'sm' | 'md' | 'lg') {
    _config!.value.borderRadius = size
  }

  function setFontSize(size: 'compact' | 'normal' | 'relaxed') {
    _config!.value.fontSize = size
  }

  function setCustomVar(key: string, value: string) {
    _config!.value.customVars[key] = value
  }

  function reset() {
    _config!.value = { ...defaultConfig }
  }

  return {
    config: _config,
    isDark: _isDark!,
    setMode,
    setColor,
    setBorderRadius,
    setFontSize,
    setCustomVar,
    reset,
  }
}

export function applyThemeDirectly(config: Partial<ThemeConfig>) {
  const current = loadConfig()
  const merged = { ...current, ...config }
  saveConfig(merged)
  applyTheme(merged)
}
