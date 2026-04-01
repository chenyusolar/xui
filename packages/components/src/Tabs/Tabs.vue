<template>
  <view class="x-tabs" :class="[`x-tabs--${type}`]">
    <view class="x-tabs__nav">
      <view
        v-for="(tab, index) in tabs"
        :key="tab.key || index"
        class="x-tabs__nav-item"
        :class="{ 'x-tabs__nav-item--active': activeKey === (tab.key ?? index) }"
        @click="handleTabClick(tab.key ?? index)"
      >
        <text class="x-tabs__nav-text">{{ tab.label }}</text>
        <view v-if="activeKey === (tab.key ?? index)" class="x-tabs__nav-indicator"></view>
      </view>
    </view>
    <view class="x-tabs__content">
      <view v-for="(tab, index) in tabs" :key="tab.key || index" class="x-tabs__pane" :class="{ 'x-tabs__pane--active': activeKey === (tab.key ?? index) }" :style="{ display: activeKey === (tab.key ?? index) ? 'block' : 'none' }">
        <slot :name="`tab-${tab.key ?? index}`" :tab="tab" :index="index" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from '@xui/core'

export interface TabItem {
  key?: string | number
  label: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    tabs: TabItem[]
    activeKey?: string | number
    type?: 'line' | 'card'
  }>(),
  {
    activeKey: 0,
    type: 'line',
  }
)

const emit = defineEmits<{
  change: [key: string | number]
}>()

const handleTabClick = (key: string | number) => {
  emit('change', key)
}
</script>

<style scoped>
.x-tabs {
  width: 100%;
}

.x-tabs__nav {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.x-tabs__nav-item {
  padding: 12px 20px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
  color: #595959;
}

.x-tabs__nav-item:hover {
  color: #1677ff;
}

.x-tabs__nav-item--active {
  color: #1677ff;
  font-weight: 500;
}

.x-tabs__nav-text {
  font-size: 14px;
}

.x-tabs__nav-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #1677ff;
}

.x-tabs--card .x-tabs__nav {
  border-bottom: none;
  background: #fafafa;
  border-radius: 8px 8px 0 0;
}

.x-tabs--card .x-tabs__nav-item {
  border-right: 1px solid #f0f0f0;
}

.x-tabs--card .x-tabs__nav-item--active {
  background: #fff;
  border-bottom: 2px solid #1677ff;
}

.x-tabs__content {
  padding: 16px 0;
}

.x-tabs__pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
