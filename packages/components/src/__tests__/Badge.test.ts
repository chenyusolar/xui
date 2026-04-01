import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import XBadge from '../Badge/Badge.vue'

describe('XBadge', () => {
  it('shows count', () => {
    const wrapper = mount(XBadge, {
      props: { count: 5 },
      slots: { default: 'Messages' },
    })
    expect(wrapper.find('.x-badge__dot').text()).toBe('5')
  })

  it('shows max+ when count exceeds max', () => {
    const wrapper = mount(XBadge, {
      props: { count: 150, max: 99 },
      slots: { default: 'Notifs' },
    })
    expect(wrapper.find('.x-badge__dot').text()).toBe('99+')
  })

  it('shows dot when dot prop set', () => {
    const wrapper = mount(XBadge, {
      props: { dot: true },
      slots: { default: 'Status' },
    })
    expect(wrapper.find('.x-badge__dot--text').exists()).toBe(true)
  })

  it('hides badge when count is 0 and showZero is false', () => {
    const wrapper = mount(XBadge, {
      props: { count: 0 },
      slots: { default: 'Empty' },
    })
    expect(wrapper.find('.x-badge__dot').exists()).toBe(false)
  })

  it('shows badge for 0 when showZero is true', () => {
    const wrapper = mount(XBadge, {
      props: { count: 0, showZero: true },
      slots: { default: 'Zero' },
    })
    expect(wrapper.find('.x-badge__dot').exists()).toBe(true)
  })

  it('applies type class', () => {
    const wrapper = mount(XBadge, {
      props: { count: 1, type: 'success' },
      slots: { default: 'OK' },
    })
    expect(wrapper.classes()).toContain('x-badge--success')
  })
})
