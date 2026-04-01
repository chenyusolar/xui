import { defineComponent, h, type PropType } from 'vue'

export default defineComponent({
  name: 'XInput',
  props: {
    type: { type: String, default: 'text' },
    value: { type: String, default: '' },
    placeholder: String,
    disabled: { type: Boolean, default: false },
    class: String,
    style: [String, Object] as PropType<string | Record<string, any>>,
    onInput: Function as PropType<(e: Event) => void>,
    onChange: Function as PropType<(e: Event) => void>,
  },
  setup(props, { attrs }) {
    return () =>
      h('input', {
        ...attrs,
        type: props.type,
        value: props.value,
        placeholder: props.placeholder,
        disabled: props.disabled,
        class: ['x-input', props.class],
        style: typeof props.style === 'object' ? props.style : undefined,
        onInput: props.onInput,
        onChange: props.onChange,
      })
  },
})
