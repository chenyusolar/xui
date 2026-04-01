<template>
  <view class="x-tag" :class="[`x-tag--${type}`, `x-tag--${size}`, { 'x-tag--bordered': bordered, 'x-tag--closable': closable }]" :style="tagStyle">
    <text class="x-tag__text">{{ label }}</text>
    <view v-if="closable" class="x-tag__close" @click.stop="handleClose">×</view>
  </view>
</template>

<script setup lang="ts">
import { computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    label: string
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
    size?: 'small' | 'medium' | 'large'
    bordered?: boolean
    closable?: boolean
    color?: string
  }>(),
  {
    label: '',
    type: 'default',
    size: 'medium',
    bordered: false,
    closable: false,
    color: '',
  }
)

const emit = defineEmits<{
  close: []
}>()

const tagStyle = computed(() => {
  if (props.color) {
    return {
      background: props.color + '15',
      color: props.color,
      borderColor: props.color,
    }
  }
  return {}
})

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.x-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  padding: 0 10px;
  transition: all 0.2s;
}

.x-tag--small { font-size: 11px; padding: 0 6px; border-radius: 4px; }
.x-tag--medium { font-size: 12px; padding: 0 10px; }
.x-tag--large { font-size: 14px; padding: 0 14px; border-radius: 8px; }

.x-tag--default { background: #fafafa; color: #595959; }
.x-tag--primary { background: #e6f4ff; color: #1677ff; }
.x-tag--success { background: #f6ffed; color: #52c41a; }
.x-tag--warning { background: #fffbe6; color: #faad14; }
.x-tag--danger { background: #fff2f0; color: #ff4d4f; }

.x-tag--bordered { border: 1px solid currentColor; background: transparent; }

.x-tag__close {
  font-size: 12px;
  cursor: pointer;
  opacity: 0.6;
}

.x-tag__close:hover { opacity: 1; }
</style>
