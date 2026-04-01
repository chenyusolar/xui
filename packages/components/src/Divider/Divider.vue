<template>
  <view class="x-divider" :class="[`x-divider--${type}`, `x-divider--${orientation}`]" :style="dividerStyle">
    <view class="x-divider__line"></view>
    <view v-if="$slots.default || title" class="x-divider__content">
      <slot>{{ title }}</slot>
    </view>
    <view class="x-divider__line"></view>
  </view>
</template>

<script setup lang="ts">
import { computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    type?: 'solid' | 'dashed' | 'dotted'
    orientation?: 'horizontal' | 'vertical'
    title?: string
    color?: string
  }>(),
  {
    type: 'solid',
    orientation: 'horizontal',
    title: '',
    color: '#f0f0f0',
  }
)

const dividerStyle = computed(() => ({
  '--divider-color': props.color,
}))
</script>

<style scoped>
.x-divider {
  display: flex;
  align-items: center;
}

.x-divider--horizontal {
  width: 100%;
  margin: 16px 0;
}

.x-divider--vertical {
  height: 1em;
  margin: 0 8px;
}

.x-divider__line {
  flex: 1;
  border-top: 1px solid var(--divider-color, #f0f0f0);
}

.x-divider--dashed .x-divider__line {
  border-top-style: dashed;
}

.x-divider--dotted .x-divider__line {
  border-top-style: dotted;
}

.x-divider--vertical .x-divider__line {
  border-top: none;
  border-left: 1px solid var(--divider-color, #f0f0f0);
  height: 100%;
}

.x-divider__content {
  padding: 0 12px;
  font-size: 14px;
  color: #595959;
  white-space: nowrap;
}
</style>
