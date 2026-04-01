export { useTheme, applyThemeDirectly } from './useTheme'
export type { ThemeMode, ThemeColor, ThemeConfig } from './useTheme'

export async function loadThemeCss(mode: 'light' | 'dark'): Promise<void> {
  if (typeof document === 'undefined') return

  const existingDark = document.getElementById('xui-theme-dark')
  if (mode === 'light') {
    if (existingDark) existingDark.remove()
    return
  }

  if (existingDark) return

  const link = document.createElement('link')
  link.id = 'xui-theme-dark'
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/@xui/themes@0.1.0/dist/themes/dark.css'
  document.head.appendChild(link)
}
