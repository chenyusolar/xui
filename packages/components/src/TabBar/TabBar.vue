<template>
  <view class="x-tabbar-wrapper">
    <view class="x-tabbar" :class="{ 'x-tabbar--fixed': fixed }">
      <view
        v-for="(item, index) in tabs"
        :key="item.key"
        class="x-tabbar__item"
        :class="{ 'x-tabbar__item--active': modelValue === item.key }"
        @click="handleClick(item.key, index)"
      >
        <view class="x-tabbar__icon">
          <view v-if="item.badge" class="x-tabbar__badge">{{ item.badge > 99 ? '99+' : item.badge }}</view>
          <view v-if="item.dot" class="x-tabbar__dot" />
          <text class="x-tabbar__icon-text">{{ modelValue === item.key ? (item.activeIcon || item.icon) : item.icon }}</text>
        </view>
        <text class="x-tabbar__label">{{ item.label }}</text>
      </view>
    </view>
    <view v-if="fixed" class="x-tabbar__placeholder" />
  </view>
</template>

<script setup lang="ts">
export interface TabBarItem {
  key: string
  label: string
  icon: string
  activeIcon?: string
  badge?: number
  dot?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: string
    tabs?: TabBarItem[]
    fixed?: boolean
    bgColor?: string
    activeColor?: string
    inactiveColor?: string
  }>(),
  {
    modelValue: 'home',
    tabs: () => [
      { key: 'home', label: '首页', icon: '🏠', activeIcon: '🏠' },
      { key: 'tab1', label: '标签1', icon: '📄', activeIcon: '📄' },
      { key: 'tab2', label: '标签2', icon: '📂', activeIcon: '📂' },
      { key: 'setting', label: '设置', icon: '⚙️', activeIcon: '⚙️' },
    ],
    fixed: true,
    bgColor: '#fff',
    activeColor: '#1677ff',
    inactiveColor: '#999',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, index: number]
}>()

function handleClick(key: string, index: number) {
  if (key === props.modelValue) return
  emit('update:modelValue', key)
  emit('change', key, index)
}
</script>

<style scoped>
.x-tabbar-wrapper {
  width: 100%;
}

.x-tabbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: v-bind(bgColor);
  padding: 6px 0 env(safe-area-inset-bottom, 6px);
  border-top: 1px solid #f0f0f0;
}

.x-tabbar--fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 900;
}

.x-tabbar__placeholder {
  height: 56px;
}

.x-tabbar__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px 0;
  cursor: pointer;
  transition: color 0.2s;
  color: v-bind(inactiveColor);
}

.x-tabbar__item--active {
  color: v-bind(activeColor);
}

.x-tabbar__icon {
  position: relative;
  font-size: 22px;
  line-height: 1;
}

.x-tabbar__icon-text {
  display: block;
}

.x-tabbar__label {
  font-size: 11px;
  white-space: nowrap;
}

.x-tabbar__badge {
  position: absolute;
  top: -6px;
  right: -12px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  color: #fff;
  background: #ff4d4f;
  border-radius: 8px;
}

.x-tabbar__dot {
  position: absolute;
  top: -2px;
  right: -4px;
  width: 8px;
  height: 8px;
  background: #ff4d4f;
  border-radius: 50%;
}
</style>
