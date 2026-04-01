import type { Plugin } from 'vite'
import { transformSFC, type TargetPlatform } from './transformer'
import MagicString from 'magic-string'

export interface XuiCompilerOptions {
  target?: TargetPlatform
  autoPlatform?: boolean
}

export function xuiCompiler(options: XuiCompilerOptions = {}): Plugin {
  const { target = 'web', autoPlatform = false } = options

  return {
    name: 'xui-compiler',

    async transform(code: string, id: string) {
      if (!id.endsWith('.vue')) return null

      const effectiveTarget = autoPlatform ? detectTargetFromEnv() : target

      try {
        const result = transformSFC({
          source: code,
          target: effectiveTarget,
          filename: id,
        })

        const s = new MagicString(code)

        if (result.template) {
          const templateMatch = code.match(/(<template[^>]*>)([\s\S]*?)(<\/template>)/)
          if (templateMatch) {
            const fullTemplate = `<template>${result.template}</template>`
            s.overwrite(templateMatch.index!, templateMatch.index! + templateMatch[0].length, fullTemplate)
          }
        }

        if (result.styles.length > 0) {
          const styleRegex = /(<style[^>]*>)([\s\S]*?)(<\/style>)/g
          let match
          let styleIndex = 0
          while ((match = styleRegex.exec(code)) !== null) {
            if (result.styles[styleIndex]) {
              const newStyle = `<style>${result.styles[styleIndex]}</style>`
              s.overwrite(match.index, match.index + match[0].length, newStyle)
            }
            styleIndex++
          }
        }

        return {
          code: s.toString(),
          map: s.generateMap({ source: id, includeContent: true }),
        }
      } catch (e) {
        console.error(`[xui-compiler] Error transforming ${id}:`, e)
        return null
      }
    },
  }
}

function detectTargetFromEnv(): TargetPlatform {
  const envTarget = process.env.XUI_TARGET
  if (envTarget === 'mini') return 'mini'
  if (envTarget === 'fmx') return 'fmx'
  return 'web'
}

export { transformSFC, transformCss, transformHtml } from './transformer'
export type { TargetPlatform }
