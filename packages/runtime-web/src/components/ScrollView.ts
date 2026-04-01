import { defineComponent, h, type PropType } from 'vue'

export default defineComponent({
  name: 'XScrollView',
  props: {
    scrollX: { type: Boolean, default: false },
    scrollY: { type: Boolean, default: false },
    class: String,
    style: [String, Object] as PropType<string | Record<string, any>>,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          class: ['x-scroll-view', props.class],
          style: {
            overflowX: props.scrollX ? 'auto' : 'hidden',
            overflowY: props.scrollY ? 'auto' : 'hidden',
            ...(typeof props.style === 'object' ? props.style : {}),
          },
        },
        slots.default?.(),
      )
  },
})
