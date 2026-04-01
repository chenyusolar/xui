import { defineComponent, h, type PropType } from 'vue'

export default defineComponent({
  name: 'XImage',
  props: {
    src: { type: String, required: true },
    alt: String,
    width: [String, Number] as PropType<string | number>,
    height: [String, Number] as PropType<string | number>,
    mode: {
      type: String as PropType<'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix'>,
      default: 'scaleToFill',
    },
    class: String,
    style: [String, Object] as PropType<string | Record<string, any>>,
    lazy: { type: Boolean, default: false },
  },
  setup(props, { attrs }) {
    return () => {
      const style: Record<string, any> = {}
      if (props.width) style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
      if (props.height) style.height = typeof props.height === 'number' ? `${props.height}px` : props.height

      switch (props.mode) {
        case 'aspectFit':
          style.objectFit = 'contain'
          break
        case 'aspectFill':
          style.objectFit = 'cover'
          break
        case 'widthFix':
          style.width = '100%'
          style.height = 'auto'
          break
        case 'heightFix':
          style.width = 'auto'
          style.height = '100%'
          break
        default:
          style.objectFit = 'fill'
      }

      return h('img', {
        ...attrs,
        src: props.src,
        alt: props.alt,
        class: ['x-image', props.class],
        style: { ...style, ...(typeof props.style === 'object' ? props.style : {}) },
        loading: props.lazy ? 'lazy' : 'eager',
      })
    }
  },
})
