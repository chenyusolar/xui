<template>
  <view class="x-loading" :class="[`x-loading--${size}`, { 'x-loading--fullscreen': fullscreen }]">
    <view class="x-loading__spinner"></view>
    <text v-if="text" class="x-loading__text">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
    size?: 'small' | 'medium' | 'large'
    fullscreen?: boolean
  }>(),
  {
    text: '加载中...',
    size: 'medium',
    fullscreen: false,
  }
)
</script>

<style scoped>
.x-loading {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.x-loading--fullscreen {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.8);
  justify-content: center;
  z-index: 9999;
}

.x-loading__spinner {
  border: 3px solid #f0f0f0;
  border-top-color: #1677ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.x-loading--small .x-loading__spinner { width: 20px; height: 20px; border-width: 2px; }
.x-loading--medium .x-loading__spinner { width: 32px; height: 32px; }
.x-loading--large .x-loading__spinner { width: 48px; height: 48px; border-width: 4px; }

.x-loading__text {
  font-size: 14px;
  color: #595959;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
