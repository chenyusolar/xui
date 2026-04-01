<template>
  <view class="x-swiper" :style="{ height: height }">
    <view
      class="x-swiper__track"
      :style="trackStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <slot />
    </view>
    <view v-if="showDots && items.length > 1" class="x-swiper__dots">
      <view
        v-for="(_, i) in items"
        :key="i"
        class="x-swiper__dot"
        :class="{ 'x-swiper__dot--active': i === currentIndex }"
        @click="goTo(i)"
      />
    </view>
    <view v-if="showArrow && items.length > 1" class="x-swiper__arrows">
      <view class="x-swiper__arrow x-swiper__arrow--left" @click="prev">‹</view>
      <view class="x-swiper__arrow x-swiper__arrow--right" @click="next">›</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, provide } from '@xui/core'

const props = withDefaults(
  defineProps<{
    autoplay?: boolean
    interval?: number
    duration?: number
    height?: string
    showDots?: boolean
    showArrow?: boolean
    loop?: boolean
    initialIndex?: number
  }>(),
  {
    autoplay: true,
    interval: 3000,
    duration: 300,
    height: '200px',
    showDots: true,
    showArrow: false,
    loop: true,
    initialIndex: 0,
  }
)

const emit = defineEmits<{
  change: [index: number]
}>()

const items = ref<number[]>([])
const currentIndex = ref(props.initialIndex)
const isTransitioning = ref(false)
let autoplayTimer: ReturnType<typeof setInterval> | null = null
let touchStartX = 0
let touchStartY = 0
let isDragging = false
let dragOffset = 0

function addItem() {
  const index = items.value.length
  items.value.push(index)
  return index
}

function removeItem(index: number) {
  items.value = items.value.filter((_, i) => i !== index)
}

provide('xSwiper', { addItem, removeItem, currentIndex })

const trackStyle = computed(() => ({
  transform: `translateX(calc(-${currentIndex.value * 100}% + ${dragOffset}px))`,
  transition: isDragging ? 'none' : `transform ${props.duration}ms ease`,
}))

function goTo(index: number) {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value = Math.max(0, Math.min(index, items.value.length - 1))
  emit('change', currentIndex.value)
  setTimeout(() => { isTransitioning.value = false }, props.duration)
}

function next() {
  if (currentIndex.value < items.value.length - 1) {
    goTo(currentIndex.value + 1)
  } else if (props.loop) {
    goTo(0)
  }
}

function prev() {
  if (currentIndex.value > 0) {
    goTo(currentIndex.value - 1)
  } else if (props.loop) {
    goTo(items.value.length - 1)
  }
}

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  isDragging = true
  stopAutoplay()
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging) return
  const dx = e.touches[0].clientX - touchStartX
  const dy = e.touches[0].clientY - touchStartY
  if (Math.abs(dx) > Math.abs(dy)) {
    e.preventDefault()
    dragOffset = dx
  }
}

function onTouchEnd() {
  if (!isDragging) return
  isDragging = false
  if (Math.abs(dragOffset) > 50) {
    dragOffset > 0 ? prev() : next()
  }
  dragOffset = 0
  startAutoplay()
}

function startAutoplay() {
  if (props.autoplay && items.value.length > 1) {
    autoplayTimer = setInterval(next, props.interval)
  }
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

watch(() => props.autoplay, (val) => {
  val ? startAutoplay() : stopAutoplay()
})

onMounted(() => { startAutoplay() })
onUnmounted(() => { stopAutoplay() })
</script>

<style scoped>
.x-swiper {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.x-swiper__track {
  display: flex;
  height: 100%;
}

.x-swiper__dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.x-swiper__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.x-swiper__dot--active {
  background: #fff;
  width: 20px;
  border-radius: 4px;
}

.x-swiper__arrows {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  pointer-events: none;
}

.x-swiper__arrow {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.2s;
}

.x-swiper__arrow:hover {
  background: rgba(0, 0, 0, 0.5);
}
</style>
