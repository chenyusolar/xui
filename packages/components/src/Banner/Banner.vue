<template>
  <view class="x-banner" :class="[`x-banner--${variant}`]" :style="bannerStyle">
    <view v-if="showClose" class="x-banner__close" @click="handleClose">×</view>
    <view class="x-banner__content">
      <view v-if="icon" class="x-banner__icon">{{ icon }}</view>
      <view class="x-banner__text">
        <text v-if="title" class="x-banner__title">{{ title }}</text>
        <text class="x-banner__desc">{{ description }}</text>
      </view>
    </view>
    <view v-if="$slots.action" class="x-banner__action">
      <slot name="action" />
    </view>
    <view v-else-if="actionText" class="x-banner__action">
      <view class="x-banner__btn" @click="handleAction">{{ actionText }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    icon?: string
    variant?: 'info' | 'success' | 'warning' | 'error'
    showClose?: boolean
    actionText?: string
    customStyle?: Record<string, any>
  }>(),
  {
    title: '',
    description: '',
    icon: '',
    variant: 'info',
    showClose: false,
    actionText: '',
    customStyle: () => ({}),
  }
)

const emit = defineEmits<{
  close: []
  action: []
}>()

const bannerStyle = computed(() => props.customStyle || {})

const handleClose = () => emit('close')
const handleAction = () => emit('action')
</script>

<style scoped>
.x-banner {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  position: relative;
}

.x-banner--info {
  background: #e6f4ff;
  color: #1677ff;
}

.x-banner--success {
  background: #f6ffed;
  color: #52c41a;
}

.x-banner--warning {
  background: #fffbe6;
  color: #faad14;
}

.x-banner--error {
  background: #fff2f0;
  color: #ff4d4f;
}

.x-banner__close {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.x-banner__close:hover {
  opacity: 1;
}

.x-banner__content {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}

.x-banner__icon {
  font-size: 18px;
  flex-shrink: 0;
}

.x-banner__text {
  flex: 1;
  min-width: 0;
}

.x-banner__title {
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 2px;
}

.x-banner__desc {
  font-size: 13px;
  opacity: 0.85;
  display: block;
}

.x-banner__action {
  margin-left: 12px;
  flex-shrink: 0;
}

.x-banner__btn {
  padding: 4px 12px;
  font-size: 13px;
  border-radius: 4px;
  background: currentColor;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s;
}

.x-banner__btn:hover {
  opacity: 0.85;
}
</style>
