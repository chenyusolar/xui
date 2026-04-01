import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import XButton from '../Button/Button.vue'

describe('XButton', () => {
  it('renders default button', () => {
    const wrapper = mount(XButton, { slots: { default: 'Click Me' } })
    expect(wrapper.text()).toContain('Click Me')
  })

  it('applies type class', () => {
    const wrapper = mount(XButton, { props: { type: 'primary' } })
    expect(wrapper.classes()).toContain('x-button--primary')
  })

  it('applies size class', () => {
    const wrapper = mount(XButton, { props: { size: 'large' } })
    expect(wrapper.classes()).toContain('x-button--large')
  })

  it('is disabled when prop set', () => {
    const wrapper = mount(XButton, { props: { disabled: true } })
    expect(wrapper.classes()).toContain('x-button--disabled')
  })

  it('shows loading spinner', () => {
    const wrapper = mount(XButton, { props: { loading: true } })
    expect(wrapper.classes()).toContain('x-button--loading')
    expect(wrapper.find('.x-button__spinner').exists()).toBe(true)
  })

  it('emits click when not disabled', async () => {
    const wrapper = mount(XButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(XButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(XButton, { props: { loading: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('applies block class', () => {
    const wrapper = mount(XButton, { props: { block: true } })
    expect(wrapper.classes()).toContain('x-button--block')
  })
})
