<template>
  <view class="x-avatar" :class="[`x-avatar--${size}`, { 'x-avatar--square': shape === 'square' }]" :style="avatarStyle">
    <image v-if="src" :src="src" class="x-avatar__image" :alt="alt" @error="handleError" />
    <view v-else-if="icon" class="x-avatar__icon">{{ icon }}</view>
    <text v-else class="x-avatar__text">{{ displayText }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    icon?: string
    name?: string
    size?: 'small' | 'medium' | 'large'
    shape?: 'circle' | 'square'
    bgColor?: string
  }>(),
  {
    src: '',
    alt: '',
    icon: '',
    name: '',
    size: 'medium',
    shape: 'circle',
    bgColor: '',
  }
)

const hasError = ref(false)

const displayText = computed(() => {
  if (props.name) {
    return props.name.charAt(0).toUpperCase()
  }
  return '?'
})

const avatarStyle = computed(() => {
  const style: Record<string, any> = {}
  if (props.bgColor) {
    style.background = props.bgColor
  }
  return style
})

const handleError = () => {
  hasError.value = true
}
</script>

<style scoped>
.x-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #1677ff;
  color: #fff;
  font-weight: 500;
  border-radius: 50%;
}

.x-avatar--small { width: 32px; height: 32px; font-size: 14px; }
.x-avatar--medium { width: 40px; height: 40px; font-size: 16px; }
.x-avatar--large { width: 48px; height: 48px; font-size: 18px; }

.x-avatar--square { border-radius: 8px; }

.x-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.x-avatar__icon {
  font-size: inherit;
}

.x-avatar__text {
  color: #fff;
}
</style>
