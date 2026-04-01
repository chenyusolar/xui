import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import XCard from '../Card/Card.vue'

describe('XCard', () => {
  it('renders with title', () => {
    const wrapper = mount(XCard, { props: { title: 'Test Card' } })
    expect(wrapper.find('.x-card__title').text()).toBe('Test Card')
  })

  it('renders without header when no title', () => {
    const wrapper = mount(XCard)
    expect(wrapper.find('.x-card__header').exists()).toBe(false)
  })

  it('applies bordered class', () => {
    const wrapper = mount(XCard, { props: { bordered: true } })
    expect(wrapper.classes()).toContain('x-card--bordered')
  })

  it('applies hoverable class', () => {
    const wrapper = mount(XCard, { props: { hoverable: true } })
    expect(wrapper.classes()).toContain('x-card--hoverable')
  })

  it('renders body slot', () => {
    const wrapper = mount(XCard, { slots: { default: 'Body Content' } })
    expect(wrapper.find('.x-card__body').text()).toContain('Body Content')
  })

  it('renders footer slot', () => {
    const wrapper = mount(XCard, { slots: { footer: 'Footer Text' } })
    expect(wrapper.find('.x-card__footer').text()).toContain('Footer Text')
  })

  it('renders extra slot', () => {
    const wrapper = mount(XCard, { props: { title: 'Card' }, slots: { extra: 'Extra' } })
    expect(wrapper.find('.x-card__extra').text()).toContain('Extra')
  })
})
