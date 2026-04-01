import { describe, it, expect } from 'vitest'
import { transformTemplateToWxml, transformStylesToWxss, generatePageJs, generatePageJson } from '../compiler'

describe('mini compiler', () => {
  describe('transformTemplateToWxml', () => {
    it('converts v-for to wx:for', () => {
      const result = transformTemplateToWxml('<view v-for="item in list">{{item}}</view>')
      expect(result).toContain('wx:for=')
      expect(result).toContain('wx:key=')
    })

    it('converts v-if to wx:if', () => {
      const result = transformTemplateToWxml('<view v-if="show"></view>')
      expect(result).toContain('wx:if=')
    })

    it('converts @click to bindtap', () => {
      const result = transformTemplateToWxml('<view @click="handleClick"></view>')
      expect(result).toContain('bindtap=')
    })

    it('converts @input to bindinput', () => {
      const result = transformTemplateToWxml('<input @input="onInput" />')
      expect(result).toContain('bindinput=')
    })
  })

  describe('transformStylesToWxss', () => {
    it('converts px to rpx', () => {
      const result = transformStylesToWxss('.btn { padding: 12px; }')
      expect(result).toContain('24rpx')
    })
  })

  describe('generatePageJs', () => {
    it('generates valid Page call', () => {
      const result = generatePageJs('index')
      expect(result).toContain('Page({')
      expect(result).toContain('index loaded')
    })
  })

  describe('generatePageJson', () => {
    it('generates valid JSON', () => {
      const result = generatePageJson('index')
      const parsed = JSON.parse(result)
      expect(parsed.usingComponents).toEqual({})
      expect(parsed.navigationBarTitleText).toBe('index')
    })
  })
})
