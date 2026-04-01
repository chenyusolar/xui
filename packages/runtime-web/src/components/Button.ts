import { defineComponent, h, type PropType } from 'vue'

export default defineComponent({
  name: 'XButton',
  props: {
    class: String,
    style: [String, Object] as PropType<string | Record<string, any>>,
    disabled: { type: Boolean, default: false },
    onClick: Function as PropType<(e: MouseEvent) => void>,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          class: ['x-button', props.class],
          disabled: props.disabled,
          onClick: props.onClick,
        },
        slots.default?.(),
      )
  },
})
