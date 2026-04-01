<template>
  <view class="x-modal-overlay" v-if="visible" :class="{ 'x-modal-overlay--visible': visible }" @click.self="maskClosable && handleClose()">
    <view class="x-modal" :class="[`x-modal--${size}`]" :style="modalStyle">
      <view class="x-modal__header">
        <text class="x-modal__title">{{ title }}</text>
        <view v-if="closable" class="x-modal__close" @click="handleClose">×</view>
      </view>
      <view class="x-modal__body">
        <slot />
      </view>
      <view v-if="$slots.footer" class="x-modal__footer">
        <slot name="footer" />
      </view>
      <view v-else-if="showFooter" class="x-modal__footer">
        <view class="x-modal__btn" @click="handleCancel">取消</view>
        <view class="x-modal__btn x-modal__btn--primary" @click="handleConfirm">确定</view>
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
    size?: 'small' | 'medium' | 'large'
    maskClosable?: boolean
    closable?: boolean
    showFooter?: boolean
    width?: string
    customStyle?: Record<string, any>
  }>(),
  {
    visible: false,
    title: '',
    size: 'medium',
    maskClosable: true,
    closable: true,
    showFooter: true,
    width: '',
    customStyle: () => ({}),
  }
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  close: []
  confirm: []
  cancel: []
}>()

const modalStyle = computed(() => {
  const base = props.customStyle || {}
  if (props.width) {
    return { ...base, width: props.width }
  }
  return base
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
  handleClose()
}

const handleCancel = () => {
  emit('cancel')
  handleClose()
}
</script>

<style scoped>
.x-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.x-modal-overlay--visible {
  opacity: 1;
  visibility: visible;
}

.x-modal {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  transform: scale(0.9);
  transition: transform 0.3s;
}

.x-modal-overlay--visible .x-modal {
  transform: scale(1);
}

.x-modal--small {
  width: 320px;
}

.x-modal--medium {
  width: 480px;
}

.x-modal--large {
  width: 640px;
}

.x-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.x-modal__title {
  font-size: 16px;
  font-weight: 600;
  color: #1f1f1f;
}

.x-modal__close {
  font-size: 20px;
  color: #8c8c8c;
  cursor: pointer;
  padding: 0 4px;
}

.x-modal__close:hover {
  color: #333;
}

.x-modal__body {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
}

.x-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
}

.x-modal__btn {
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  background: #fff;
  border: 1px solid #d9d9d9;
  transition: all 0.2s;
}

.x-modal__btn:hover {
  border-color: #1677ff;
  color: #1677ff;
}

.x-modal__btn--primary {
  background: #1677ff;
  color: #fff;
  border-color: #1677ff;
}

.x-modal__btn--primary:hover {
  background: #4096ff;
}
</style>
