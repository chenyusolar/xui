<template>
  <view class="x-button" :class="[`x-button--${type}`, `x-button--${size}`, { 'x-button--disabled': disabled, 'x-button--block': block, 'x-button--loading': loading }]" :style="customStyle" @click="handleClick">
    <view v-if="loading" class="x-button__spinner"></view>
    <view v-if="icon" class="x-button__icon">
      <slot name="icon" />
    </view>
    <text class="x-button__text">
      <slot />
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'default'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    loading?: boolean
    block?: boolean
    icon?: string
    customStyle?: Record<string, any>
  }>(),
  {
    type: 'default',
    size: 'medium',
    disabled: false,
    loading: false,
    block: false,
    icon: '',
    customStyle: () => ({}),
  }
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.x-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  outline: none;
  user-select: none;
}

.x-button:active:not(.x-button--disabled) {
  transform: scale(0.98);
}

.x-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.x-button--block {
  width: 100%;
}

.x-button--small {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 6px;
}

.x-button--medium {
  padding: 10px 20px;
  font-size: 14px;
}

.x-button--large {
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 10px;
}

.x-button--primary {
  background: #1677ff;
  color: #fff;
}

.x-button--primary:hover:not(.x-button--disabled) {
  background: #4096ff;
}

.x-button--success {
  background: #52c41a;
  color: #fff;
}

.x-button--success:hover:not(.x-button--disabled) {
  background: #73d13d;
}

.x-button--warning {
  background: #faad14;
  color: #fff;
}

.x-button--warning:hover:not(.x-button--disabled) {
  background: #ffc53d;
}

.x-button--danger {
  background: #ff4d4f;
  color: #fff;
}

.x-button--danger:hover:not(.x-button--disabled) {
  background: #ff7875;
}

.x-button--default {
  background: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
}

.x-button--default:hover:not(.x-button--disabled) {
  border-color: #1677ff;
  color: #1677ff;
}

.x-button__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.x-button__text {
  white-space: nowrap;
}
</style>
