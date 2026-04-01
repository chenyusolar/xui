<template>
  <view class="x-badge" :class="[`x-badge--${type}`, `x-badge--${size}`]">
    <view class="x-badge__content">
      <slot />
    </view>
    <view v-if="showBadge" class="x-badge__dot" :class="{ 'x-badge__dot--text': dot || count === 0 }">
      <text v-if="!dot && count !== 0">{{ displayCount }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    count?: number
    max?: number
    dot?: boolean
    type?: 'primary' | 'danger' | 'success' | 'warning'
    size?: 'small' | 'medium'
    showZero?: boolean
  }>(),
  {
    count: 0,
    max: 99,
    dot: false,
    type: 'danger',
    size: 'medium',
    showZero: false,
  }
)

const showBadge = computed(() => {
  if (props.dot) return true
  if (props.count > 0) return true
  if (props.showZero && props.count === 0) return true
  return false
})

const displayCount = computed(() => {
  if (props.count > props.max) return `${props.max}+`
  return String(props.count)
})
</script>

<style scoped>
.x-badge {
  position: relative;
  display: inline-block;
}

.x-badge__content {
  display: inline-block;
}

.x-badge__dot {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: #ff4d4f;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 0 0 2px #fff;
}

.x-badge__dot--text {
  min-width: 18px;
  height: 18px;
  padding: 0;
  border-radius: 50%;
}

.x-badge--small .x-badge__dot {
  min-width: 14px;
  height: 14px;
  font-size: 10px;
  line-height: 14px;
  top: -4px;
  right: -4px;
}

.x-badge--primary .x-badge__dot { background: #1677ff; }
.x-badge--success .x-badge__dot { background: #52c41a; }
.x-badge--warning .x-badge__dot { background: #faad14; }
</style>
