import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import XModal from '../Modal/Modal.vue'

describe('XModal', () => {
  it('renders when visible', () => {
    const wrapper = mount(XModal, { props: { visible: true, title: 'Test' } })
    expect(wrapper.find('.x-modal__title').text()).toBe('Test')
  })

  it('does not render when not visible', () => {
    const wrapper = mount(XModal, { props: { visible: false } })
    expect(wrapper.find('.x-modal-overlay--visible').exists()).toBe(false)
  })

  it('emits close when close button clicked', async () => {
    const wrapper = mount(XModal, { props: { visible: true } })
    await wrapper.find('.x-modal__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits confirm when confirm clicked', async () => {
    const wrapper = mount(XModal, { props: { visible: true } })
    const confirmBtn = wrapper.findAll('.x-modal__btn')[1]
    await confirmBtn.trigger('click')
    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('hides footer when showFooter is false', () => {
    const wrapper = mount(XModal, { props: { visible: true, showFooter: false } })
    expect(wrapper.find('.x-modal__footer').exists()).toBe(false)
  })

  it('applies size class', () => {
    const wrapper = mount(XModal, { props: { visible: true, size: 'large' } })
    expect(wrapper.find('.x-modal').classes()).toContain('x-modal--large')
  })
})
