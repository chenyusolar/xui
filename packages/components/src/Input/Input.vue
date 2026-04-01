<template>
  <view class="x-input-wrapper" :class="{ 'x-input-wrapper--focused': isFocused, 'x-input-wrapper--error': error }">
    <view v-if="label" class="x-input-label">
      <text class="x-input-label__text">{{ label }}</text>
      <text v-if="required" class="x-input-label__required">*</text>
    </view>
    <view class="x-input-inner">
      <view v-if="$slots.prefix || prefix" class="x-input-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </view>
      <input
        class="x-input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <view v-if="$slots.suffix || suffix || clearable" class="x-input-suffix">
        <view v-if="clearable && modelValue" class="x-input-clear" @click="handleClear">×</view>
        <slot name="suffix">{{ suffix }}</slot>
      </view>
    </view>
    <text v-if="error" class="x-input-error">{{ error }}</text>
    <text v-if="maxlength" class="x-input-count">{{ String(modelValue || '').length }}/{{ maxlength }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from '@xui/core'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    type?: 'text' | 'number' | 'password' | 'email' | 'tel'
    label?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    error?: string
    prefix?: string
    suffix?: string
    clearable?: boolean
    maxlength?: number
  }>(),
  {
    modelValue: '',
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
    required: false,
    error: '',
    prefix: '',
    suffix: '',
    clearable: false,
    maxlength: undefined,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const isFocused = ref(false)

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('change', target.value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
}
</script>

<style scoped>
.x-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.x-input-inner {
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 0 12px;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fff;
}

.x-input-wrapper--focused .x-input-inner {
  border-color: #1677ff;
  box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
}

.x-input-wrapper--error .x-input-inner {
  border-color: #ff4d4f;
}

.x-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 0;
  font-size: 14px;
  background: transparent;
  color: #1f1f1f;
}

.x-input::placeholder {
  color: #bfbfbf;
}

.x-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.x-input-label {
  display: flex;
  align-items: center;
  gap: 2px;
}

.x-input-label__text {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.x-input-label__required {
  color: #ff4d4f;
}

.x-input-prefix,
.x-input-suffix {
  display: flex;
  align-items: center;
  color: #8c8c8c;
  font-size: 14px;
}

.x-input-clear {
  cursor: pointer;
  font-size: 16px;
  color: #bfbfbf;
  padding: 0 4px;
}

.x-input-clear:hover {
  color: #8c8c8c;
}

.x-input-error {
  font-size: 12px;
  color: #ff4d4f;
}

.x-input-count {
  font-size: 12px;
  color: #8c8c8c;
  text-align: right;
}
</style>
