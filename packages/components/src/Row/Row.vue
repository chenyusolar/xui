<template>
  <view class="x-row" :class="[`x-row--${justify}`, `x-row--${align}`]" :style="rowStyle">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, provide } from '@xui/core'

const props = withDefaults(
  defineProps<{
    gutter?: number
    justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
    align?: 'top' | 'middle' | 'bottom' | 'stretch'
    wrap?: boolean
  }>(),
  {
    gutter: 0,
    justify: 'start',
    align: 'top',
    wrap: true,
  }
)

const rowStyle = computed(() => {
  const style: Record<string, any> = {}
  if (props.gutter) {
    style.marginLeft = `-${props.gutter / 2}px`
    style.marginRight = `-${props.gutter / 2}px`
  }
  if (!props.wrap) {
    style.flexWrap = 'nowrap'
  }
  return style
})

provide('x-row-gutter', props.gutter)
</script>

<style scoped>
.x-row {
  display: flex;
  flex-wrap: wrap;
}

.x-row--start { justify-content: flex-start; }
.x-row--end { justify-content: flex-end; }
.x-row--center { justify-content: center; }
.x-row--space-between { justify-content: space-between; }
.x-row--space-around { justify-content: space-around; }
.x-row--space-evenly { justify-content: space-evenly; }

.x-row--top { align-items: flex-start; }
.x-row--middle { align-items: center; }
.x-row--bottom { align-items: flex-end; }
.x-row--stretch { align-items: stretch; }
</style>
