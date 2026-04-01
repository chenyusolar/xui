import { defineComponent, h, type PropType } from 'vue'

export default defineComponent({
  name: 'XView',
  props: {
    class: String,
    style: [String, Object] as PropType<string | Record<string, any>>,
  },
  setup(props, { slots, attrs }) {
    return () => h('div', { ...attrs, class: ['x-view', props.class] }, slots.default?.())
  },
})
