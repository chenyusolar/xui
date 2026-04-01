<template>
  <view class="x-progress" :class="[`x-progress--${type}`, `x-progress--${size}`]">
    <view class="x-progress__track">
      <view class="x-progress__bar" :style="barStyle"></view>
    </view>
    <text v-if="showText" class="x-progress__text">{{ displayText }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    percent?: number
    type?: 'default' | 'success' | 'warning' | 'danger'
    size?: 'small' | 'medium' | 'large'
    showText?: boolean
    striped?: boolean
    animated?: boolean
  }>(),
  {
    percent: 0,
    type: 'default',
    size: 'medium',
    showText: false,
    striped: false,
    animated: false,
  }
)

const barStyle = computed(() => {
  const clamped = Math.max(0, Math.min(100, props.percent))
  return {
    width: `${clamped}%`,
    transition: 'width 0.3s ease',
  }
})

const displayText = computed(() => `${Math.round(props.percent)}%`)
</script>

<style scoped>
.x-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.x-progress__track {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.x-progress__bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.x-progress--small .x-progress__track { height: 4px; }
.x-progress--medium .x-progress__track { height: 8px; }
.x-progress--large .x-progress__track { height: 12px; }

.x-progress--default .x-progress__bar { background: #1677ff; }
.x-progress--success .x-progress__bar { background: #52c41a; }
.x-progress--warning .x-progress__bar { background: #faad14; }
.x-progress--danger .x-progress__bar { background: #ff4d4f; }

.x-progress__text {
  font-size: 12px;
  color: #595959;
  min-width: 40px;
  text-align: right;
}
</style>
