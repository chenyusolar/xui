<template>
  <view class="x-popup-overlay" v-if="visible" :class="{ 'x-popup-overlay--visible': visible }" @click.self="maskClosable && handleClose()">
    <view class="x-popup" :class="[`x-popup--${position}`, `x-popup--${size}`]" :style="popupStyle">
      <view v-if="showHeader" class="x-popup__header">
        <text class="x-popup__title">{{ title }}</text>
        <view v-if="closable" class="x-popup__close" @click="handleClose">×</view>
      </view>
      <view class="x-popup__body">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    title?: string
    position?: 'bottom' | 'top' | 'left' | 'right' | 'center'
    size?: 'small' | 'medium' | 'large' | 'full'
    closable?: boolean
    maskClosable?: boolean
    showHeader?: boolean
    customStyle?: Record<string, any>
  }>(),
  {
    visible: false,
    title: '',
    position: 'bottom',
    size: 'medium',
    closable: true,
    maskClosable: true,
    showHeader: false,
    customStyle: () => ({}),
  }
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  close: []
}>()

const popupStyle = computed(() => props.customStyle)

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}
</script>

<style scoped>
.x-popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.x-popup-overlay--visible {
  opacity: 1;
  visibility: visible;
}

.x-popup {
  position: absolute;
  background: #fff;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow: hidden;
}

.x-popup--bottom {
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 16px 16px 0 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.x-popup--top {
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 16px 16px;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.x-popup--left {
  top: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.x-popup--right {
  top: 0;
  bottom: 0;
  right: 0;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.x-popup--center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.x-popup-overlay--visible .x-popup {
  transform: translate(0, 0) scale(1);
}

.x-popup--small { width: 320px; }
.x-popup--medium { width: 480px; }
.x-popup--large { width: 640px; }
.x-popup--full { width: 100%; height: 100%; max-height: 100%; }

.x-popup__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.x-popup__title {
  font-size: 16px;
  font-weight: 600;
}

.x-popup__close {
  font-size: 20px;
  cursor: pointer;
  color: #8c8c8c;
}

.x-popup__body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
