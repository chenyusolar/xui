<template>
  <view class="x-select" :class="{ 'x-select--disabled': disabled, 'x-select--focused': dropdownVisible }">
    <view class="x-select__trigger" @click="toggleDropdown">
      <text v-if="displayLabel" class="x-select__value">{{ displayLabel }}</text>
      <text v-else class="x-select__placeholder">{{ placeholder || t('xui.select.placeholder') }}</text>
      <view class="x-select__arrow" :class="{ 'x-select__arrow--active': dropdownVisible }">▼</view>
    </view>
    <view v-if="dropdownVisible" class="x-select__dropdown">
      <view
        v-for="(option, index) in options"
        :key="option.value"
        class="x-select__option"
        :class="{ 'x-select__option--active': modelValue === option.value, 'x-select__option--disabled': option.disabled }"
        @click.stop="handleSelect(option)"
      >
        <text class="x-select__option-text">{{ option.label }}</text>
        <text v-if="modelValue === option.value" class="x-select__option-check">✓</text>
      </view>
      <view v-if="options.length === 0" class="x-select__empty">
        <text class="x-select__empty-text">{{ t('xui.select.empty') || '暂无选项' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from '@xui/core'
import { t } from '@xui/core'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    options?: SelectOption[]
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
  }>(),
  {
    modelValue: undefined,
    options: () => [],
    placeholder: '',
    disabled: false,
    clearable: false,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
  change: [value: string | number | undefined, option: SelectOption | undefined]
}>()

const dropdownVisible = ref(false)

const displayLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue)
  return found?.label
})

function toggleDropdown() {
  if (!props.disabled) {
    dropdownVisible.value = !dropdownVisible.value
  }
}

function handleSelect(option: SelectOption) {
  if (option.disabled) return
  const newValue = props.modelValue === option.value && props.clearable ? undefined : option.value
  emit('update:modelValue', newValue)
  emit('change', newValue, props.modelValue === option.value && props.clearable ? undefined : option)
  dropdownVisible.value = false
}

function handleClickOutside(e: MouseEvent) {
  const el = document.querySelector('.x-select')
  if (el && !el.contains(e.target as Node)) {
    dropdownVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.x-select {
  position: relative;
  display: inline-block;
  width: 100%;
}

.x-select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.x-select--focused .x-select__trigger {
  border-color: #1677ff;
  box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
}

.x-select--disabled .x-select__trigger {
  background: #f5f5f5;
  cursor: not-allowed;
}

.x-select__value {
  font-size: 14px;
  color: #1f1f1f;
}

.x-select__placeholder {
  font-size: 14px;
  color: #bfbfbf;
}

.x-select__arrow {
  font-size: 10px;
  color: #8c8c8c;
  transition: transform 0.2s;
}

.x-select__arrow--active {
  transform: rotate(180deg);
}

.x-select__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 240px;
  overflow-y: auto;
}

.x-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.15s;
}

.x-select__option:hover {
  background: #f5f5f5;
}

.x-select__option--active {
  background: #e6f4ff;
  color: #1677ff;
}

.x-select__option--disabled {
  color: #d9d9d9;
  cursor: not-allowed;
}

.x-select__option-text {
  font-size: 14px;
}

.x-select__option-check {
  color: #1677ff;
  font-size: 14px;
}

.x-select__empty {
  padding: 20px 0;
  text-align: center;
}

.x-select__empty-text {
  font-size: 14px;
  color: #bfbfbf;
}
</style>
