import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import XInput from '../Input/Input.vue'

describe('XInput', () => {
  it('renders with placeholder', () => {
    const wrapper = mount(XInput, { props: { placeholder: 'Enter...' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter...')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(XInput, { props: { modelValue: '' } })
    const input = wrapper.find('input')
    await input.setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('shows label when provided', () => {
    const wrapper = mount(XInput, { props: { label: 'Username' } })
    expect(wrapper.find('.x-input-label__text').text()).toBe('Username')
  })

  it('shows required asterisk', () => {
    const wrapper = mount(XInput, { props: { label: 'Name', required: true } })
    expect(wrapper.find('.x-input-label__required').text()).toBe('*')
  })

  it('shows error message and error class', () => {
    const wrapper = mount(XInput, { props: { error: 'Required field' } })
    expect(wrapper.find('.x-input-error').text()).toBe('Required field')
    expect(wrapper.find('.x-input-wrapper').classes()).toContain('x-input-wrapper--error')
  })

  it('is disabled when prop set', () => {
    const wrapper = mount(XInput, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })

  it('shows character count with maxlength', () => {
    const wrapper = mount(XInput, { props: { modelValue: 'abc', maxlength: 10 } })
    expect(wrapper.find('.x-input-count').text()).toBe('3/10')
  })

  it('clears value when clearable and clear clicked', async () => {
    const wrapper = mount(XInput, {
      props: { modelValue: 'test', clearable: true },
    })
    const clearBtn = wrapper.find('.x-input-clear')
    expect(clearBtn.exists()).toBe(true)
    await clearBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })
})
