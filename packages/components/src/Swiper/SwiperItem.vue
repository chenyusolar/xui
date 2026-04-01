<template>
  <view class="x-swiper-item">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from '@xui/core'

const swiper = inject<{
  addItem: () => number
  removeItem: (index: number) => void
}>('xSwiper')

const index = ref(-1)

onMounted(() => {
  if (swiper) {
    index.value = swiper.addItem()
  }
})

onUnmounted(() => {
  if (swiper) {
    swiper.removeItem(index.value)
  }
})
</script>

<style scoped>
.x-swiper-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>
