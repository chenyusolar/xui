<template>
  <view class="x-image" :class="[`x-image--${shape}`]" :style="containerStyle">
    <view v-if="loading" class="x-image__placeholder">
      <slot name="placeholder">
        <view class="x-image__skeleton" />
      </slot>
    </view>
    <image
      v-show="!loading"
      :src="resolvedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :mode="mode"
      :lazy="lazy"
      class="x-image__img"
      :class="{ 'x-image__img--loaded': !loading }"
      @load="handleLoad"
      @error="handleError"
    />
    <view v-if="error && $slots.error" class="x-image__error">
      <slot name="error" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from '@xui/core'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    width?: string | number
    height?: string | number
    mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix'
    shape?: 'square' | 'circle' | 'rounded'
    lazy?: boolean
    placeholder?: string
  }>(),
  {
    alt: '',
    width: '100%',
    height: 'auto',
    mode: 'scaleToFill',
    shape: 'square',
    lazy: false,
    placeholder: '',
  }
)

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const loading = ref(true)
const error = ref(false)
const resolvedSrc = ref('')

let observer: IntersectionObserver | null = null

const containerStyle = computed(() => {
  const style: Record<string, any> = {}
  if (props.width) style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  if (props.height) style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  switch (props.mode) {
    case 'aspectFit': style.objectFit = 'contain'; break
    case 'aspectFill': style.objectFit = 'cover'; break
    case 'widthFix': style.width = '100%'; style.height = 'auto'; break
    case 'heightFix': style.width = 'auto'; style.height = '100%'; break
  }
  return style
})

function loadImage() {
  loading.value = true
  error.value = false
  resolvedSrc.value = props.src
}

function handleLoad(e: Event) {
  loading.value = false
  error.value = false
  emit('load', e)
}

function handleError(e: Event) {
  loading.value = false
  error.value = true
  emit('error', e)
}

watch(() => props.src, loadImage)

onMounted(() => {
  if (props.lazy && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadImage()
          observer?.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    const el = document.querySelector('.x-image')
    if (el) observer.observe(el)
  } else {
    loadImage()
  }
})

</script>

<style scoped>
.x-image {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.x-image--circle { border-radius: 50%; }
.x-image--rounded { border-radius: 8px; }

.x-image__img {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.x-image__img--loaded {
  opacity: 1;
}

.x-image__placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.x-image__skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.x-image__error {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  color: #bfbfbf;
  font-size: 12px;
}
</style>
