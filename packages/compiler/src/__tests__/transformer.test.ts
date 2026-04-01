import { describe, it, expect } from 'vitest'
import { transformSFC, transformCss, transformHtml } from '../transformer'

describe('transformer', () => {
  describe('transformTemplate', () => {
    it('converts view to div for web', () => {
      const result = transformSFC({
        target: 'web',
        source: '<template><view class="test">Hello</view></template>',
      })
      expect(result.template).toContain('<div')
      expect(result.template).toContain('</div>')
    })

    it('keeps view for mini', () => {
      const result = transformSFC({
        target: 'mini',
        source: '<template><view class="test">Hello</view></template>',
      })
      expect(result.template).toContain('<view')
    })

    it('converts text to span for web', () => {
      const result = transformSFC({
        target: 'web',
        source: '<template><text>Hello</text></template>',
      })
      expect(result.template).toContain('<span')
    })

    it('converts image to img for web', () => {
      const result = transformSFC({
        target: 'web',
        source: '<template><image src="test.png" /></template>',
      })
      expect(result.template).toContain('<img')
    })
  })

  describe('transformCss', () => {
    it('converts px to rpx for mini', () => {
      const result = transformCss('.test { padding: 12px; }', 'mini')
      expect(result).toContain('24rpx')
    })

    it('keeps px for web', () => {
      const result = transformCss('.test { padding: 12px; }', 'web')
      expect(result).toContain('12px')
    })

    it('keeps px for fmx', () => {
      const result = transformCss('.test { padding: 12px; }', 'fmx')
      expect(result).toContain('12px')
    })
  })

  describe('transformHtml', () => {
    it('transforms multiple tags', () => {
      const html = '<view><text>Hello</text><image src="a.png" /></view>'
      const result = transformHtml(html, 'web')
      expect(result).toContain('<div')
      expect(result).toContain('<span')
      expect(result).toContain('<img')
    })
  })

  describe('mini event binding', () => {
    it('converts @click to bindtap', () => {
      const result = transformSFC({
        target: 'mini',
        source: '<template><view @click="handleClick"></view></template>',
      })
      expect(result.template).toContain('bindtap="handleClick"')
    })

    it('converts @input to bindinput', () => {
      const result = transformSFC({
        target: 'mini',
        source: '<template><input @input="onInput" /></template>',
      })
      expect(result.template).toContain('bindinput="onInput"')
    })

    it('converts v-for to wx:for', () => {
      const result = transformSFC({
        target: 'mini',
        source: '<template><view v-for="item in list"></view></template>',
      })
      expect(result.template).toContain('wx:for=')
      expect(result.template).toContain('wx:key=')
    })

    it('converts v-if to wx:if', () => {
      const result = transformSFC({
        target: 'mini',
        source: '<template><view v-if="show"></view></template>',
      })
      expect(result.template).toContain('wx:if=')
    })
  })
})
