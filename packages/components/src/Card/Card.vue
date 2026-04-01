<template>
  <view class="x-card" :class="{ 'x-card--hoverable': hoverable, 'x-card--bordered': bordered }" :style="customStyle">
    <view v-if="$slots.title || title" class="x-card__header">
      <text class="x-card__title">{{ title }}</text>
      <view class="x-card__extra">
        <slot name="extra" />
      </view>
    </view>
    <view class="x-card__body">
      <slot />
    </view>
    <view v-if="$slots.footer" class="x-card__footer">
      <slot name="footer" />
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    bordered?: boolean
    hoverable?: boolean
    customStyle?: Record<string, any>
  }>(),
  {
    title: '',
    bordered: true,
    hoverable: false,
    customStyle: () => ({}),
  }
)
</script>

<style scoped>
.x-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.x-card--bordered {
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.x-card--hoverable:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.x-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.x-card__title {
  font-size: 16px;
  font-weight: 600;
  color: #1f1f1f;
}

.x-card__extra {
  display: flex;
  align-items: center;
  gap: 8px;
}

.x-card__body {
  padding: 20px;
}

.x-card__footer {
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}
</style>
