import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import XProgress from '../Progress/Progress.vue'

describe('XProgress', () => {
  it('renders with percent', () => {
    const wrapper = mount(XProgress, { props: { percent: 50 } })
    expect(wrapper.find('.x-progress__bar').attributes('style')).toContain('width: 50%')
  })

  it('clamps percent to 0-100', () => {
    const wrapper = mount(XProgress, { props: { percent: 150 } })
    expect(wrapper.find('.x-progress__bar').attributes('style')).toContain('width: 100%')
  })

  it('shows text when showText is true', () => {
    const wrapper = mount(XProgress, { props: { percent: 75, showText: true } })
    expect(wrapper.find('.x-progress__text').text()).toBe('75%')
  })

  it('applies type class', () => {
    const wrapper = mount(XProgress, { props: { percent: 50, type: 'success' } })
    expect(wrapper.classes()).toContain('x-progress--success')
  })

  it('applies size class', () => {
    const wrapper = mount(XProgress, { props: { percent: 50, size: 'large' } })
    expect(wrapper.classes()).toContain('x-progress--large')
  })
})
