import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import XTag from '../Tag/Tag.vue'

describe('XTag', () => {
  it('renders with label', () => {
    const wrapper = mount(XTag, { props: { label: 'Test' } })
    expect(wrapper.find('.x-tag__text').text()).toBe('Test')
  })

  it('applies type class', () => {
    const wrapper = mount(XTag, { props: { label: 'T', type: 'primary' } })
    expect(wrapper.classes()).toContain('x-tag--primary')
  })

  it('applies size class', () => {
    const wrapper = mount(XTag, { props: { label: 'T', size: 'large' } })
    expect(wrapper.classes()).toContain('x-tag--large')
  })

  it('shows close button when closable', () => {
    const wrapper = mount(XTag, { props: { label: 'T', closable: true } })
    expect(wrapper.find('.x-tag__close').exists()).toBe(true)
  })

  it('emits close when close clicked', async () => {
    const wrapper = mount(XTag, { props: { label: 'T', closable: true } })
    await wrapper.find('.x-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('applies bordered class', () => {
    const wrapper = mount(XTag, { props: { label: 'T', bordered: true } })
    expect(wrapper.classes()).toContain('x-tag--bordered')
  })
})
