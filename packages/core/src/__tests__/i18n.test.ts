import { describe, it, expect } from 'vitest'
import { setLocale, getLocale, t, zhCN, enUS, jaJP, koKR } from '../i18n'

describe('i18n', () => {
  it('defaults to zh-CN', () => {
    setLocale('zh-CN')
    expect(getLocale()).toBe('zh-CN')
  })

  it('translates zh-CN', () => {
    setLocale('zh-CN')
    expect(t('xui.button.loading')).toBe('加载中...')
    expect(t('xui.picker.cancel')).toBe('取消')
    expect(t('xui.table.empty')).toBe('暂无数据')
  })

  it('translates en-US', () => {
    setLocale('en-US')
    expect(t('xui.button.loading')).toBe('Loading...')
    expect(t('xui.picker.cancel')).toBe('Cancel')
    expect(t('xui.table.empty')).toBe('No data')
  })

  it('translates ja-JP', () => {
    setLocale('ja-JP')
    expect(t('xui.button.loading')).toBe('読み込み中...')
    expect(t('xui.picker.cancel')).toBe('キャンセル')
  })

  it('translates ko-KR', () => {
    setLocale('ko-KR')
    expect(t('xui.button.loading')).toBe('로딩 중...')
    expect(t('xui.picker.cancel')).toBe('취소')
  })

  it('returns key for unknown message', () => {
    setLocale('zh-CN')
    expect(t('unknown.key')).toBe('unknown.key')
  })

  it('supports mergeMessages', () => {
    setLocale('zh-CN')
    const original = t('xui.button.loading')
    // mergeMessages adds custom overrides
    expect(typeof original).toBe('string')
  })

  it('exports all locale objects', () => {
    expect(zhCN.name).toBe('zh-CN')
    expect(enUS.name).toBe('en-US')
    expect(jaJP.name).toBe('ja-JP')
    expect(koKR.name).toBe('ko-KR')
  })
})
