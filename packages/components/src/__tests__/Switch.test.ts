import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import XSwitch from '../Switch/Switch.vue'

describe('XSwitch', () => {
  it('renders unchecked by default', () => {
    const wrapper = mount(XSwitch)
    expect(wrapper.classes()).not.toContain('x-switch--checked')
  })

  it('renders checked when prop set', () => {
    const wrapper = mount(XSwitch, { props: { checked: true } })
    expect(wrapper.classes()).toContain('x-switch--checked')
  })

  it('emits change when clicked', async () => {
    const wrapper = mount(XSwitch, { props: { checked: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:checked')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(XSwitch, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:checked')).toBeUndefined()
  })

  it('applies small size class', () => {
    const wrapper = mount(XSwitch, { props: { size: 'small' } })
    expect(wrapper.classes()).toContain('x-switch--small')
  })
})
