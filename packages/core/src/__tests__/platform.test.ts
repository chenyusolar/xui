import { describe, it, expect } from 'vitest'
import { detectPlatform, createWebPlatform, createMiniPlatform, createFmxPlatform } from '../platform-impl'
import type { PlatformName } from '../platform'

describe('platform detection', () => {
  it('detects web in browser environment', () => {
    expect(detectPlatform()).toBe('web')
  })
})

describe('web platform', () => {
  const platform = createWebPlatform()

  it('has correct name', () => {
    expect(platform.name).toBe('web')
    expect(platform.isWeb).toBe(true)
    expect(platform.isMini).toBe(false)
    expect(platform.isFmx).toBe(false)
  })

  it('storage set and get', () => {
    platform.storage.set('test_key', { foo: 'bar' })
    const val = platform.storage.get('test_key')
    expect(val).toEqual({ foo: 'bar' })
    platform.storage.remove('test_key')
    expect(platform.storage.get('test_key')).toBeNull()
  })

  it('storage clear', () => {
    platform.storage.set('k1', 1)
    platform.storage.set('k2', 2)
    platform.storage.clear()
    expect(platform.storage.get('k1')).toBeNull()
    expect(platform.storage.get('k2')).toBeNull()
  })
})

describe('mini platform', () => {
  it('has correct name', () => {
    const platform = createMiniPlatform()
    expect(platform.name).toBe('mini')
    expect(platform.isMini).toBe(true)
    expect(platform.isWeb).toBe(false)
  })
})

describe('fmx platform', () => {
  it('has correct name', () => {
    const platform = createFmxPlatform()
    expect(platform.name).toBe('fmx')
    expect(platform.isFmx).toBe(true)
    expect(platform.isWeb).toBe(false)
  })
})
