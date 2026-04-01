<template>
  <view class="x-navbar" :class="{ 'x-navbar--fixed': fixed, 'x-navbar--bordered': bordered }" :style="navbarStyle">
    <view class="x-navbar__left">
      <view v-if="showBack" class="x-navbar__back" @click="handleBack">
        <text class="x-navbar__back-icon">‹</text>
      </view>
      <slot name="left" />
    </view>
    <view class="x-navbar__center">
      <text class="x-navbar__title">{{ title }}</text>
      <slot name="title" />
    </view>
    <view class="x-navbar__right">
      <slot name="right" />
    </view>
  </view>
  <view v-if="fixed" :style="{ height: statusBarHeight + navbarHeight + 'px' }" />
</template>

<script setup lang="ts">
import { computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    title?: string
    fixed?: boolean
    bordered?: boolean
    showBack?: boolean
    bgColor?: string
    textColor?: string
    statusBarHeight?: number
    height?: number
  }>(),
  {
    title: '',
    fixed: true,
    bordered: true,
    showBack: false,
    bgColor: '#fff',
    textColor: '#1f1f1f',
    statusBarHeight: 0,
    height: 44,
  }
)

const emit = defineEmits<{
  back: []
}>()

const navbarStyle = computed(() => ({
  background: props.bgColor,
  color: props.textColor,
}))

const navbarHeight = props.height

const handleBack = () => {
  emit('back')
}
</script>

<style scoped>
.x-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 12px;
  position: relative;
  z-index: 100;
}

.x-navbar--fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.x-navbar--bordered {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.x-navbar__left,
.x-navbar__right {
  display: flex;
  align-items: center;
  min-width: 60px;
}

.x-navbar__left { justify-content: flex-start; }
.x-navbar__right { justify-content: flex-end; }

.x-navbar__center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.x-navbar__title {
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.x-navbar__back {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
}

.x-navbar__back-icon {
  font-size: 24px;
  line-height: 1;
}
</style>
