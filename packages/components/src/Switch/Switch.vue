<template>
  <view class="x-switch" :class="[`x-switch--${size}`, { 'x-switch--checked': checked, 'x-switch--disabled': disabled }]" @click="handleToggle">
    <view class="x-switch__track"></view>
    <view class="x-switch__handle"></view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    checked?: boolean
    disabled?: boolean
    size?: 'small' | 'medium'
  }>(),
  {
    checked: false,
    disabled: false,
    size: 'medium',
  }
)

const emit = defineEmits<{
  'update:checked': [value: boolean]
  change: [value: boolean]
}>()

const handleToggle = () => {
  if (!props.disabled) {
    const newValue = !props.checked
    emit('update:checked', newValue)
    emit('change', newValue)
  }
}
</script>

<style scoped>
.x-switch {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.x-switch--medium {
  width: 44px;
  height: 24px;
}

.x-switch--small {
  width: 36px;
  height: 20px;
}

.x-switch__track {
  position: absolute;
  inset: 0;
  background: #d9d9d9;
  border-radius: 12px;
  transition: background 0.2s;
}

.x-switch--checked .x-switch__track {
  background: #1677ff;
}

.x-switch__handle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.x-switch--medium .x-switch__handle {
  width: 20px;
  height: 20px;
}

.x-switch--small .x-switch__handle {
  width: 16px;
  height: 16px;
}

.x-switch--checked .x-switch__handle {
  transform: translateX(20px);
}

.x-switch--small.x-switch--checked .x-switch__handle {
  transform: translateX(16px);
}

.x-switch--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
