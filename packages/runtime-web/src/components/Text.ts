import { defineComponent, h, type PropType } from 'vue'

export default defineComponent({
  name: 'XText',
  props: {
    class: String,
    style: [String, Object] as PropType<string | Record<string, any>>,
    selectable: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          class: ['x-text', props.class],
          style: props.selectable ? { userSelect: 'text' } : undefined,
        },
        slots.default?.(),
      )
  },
})
