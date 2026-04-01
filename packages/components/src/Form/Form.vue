<template>
  <view class="x-form" :class="[`x-form--${labelPosition}`]" :style="formStyle">
    <view v-for="field in fields" :key="field.name" class="x-form__item" :class="{ 'x-form__item--error': errors[field.name] }">
      <view v-if="field.label && labelPosition !== 'top'" class="x-form__label">
        <text class="x-form__label-text">{{ field.label }}</text>
        <text v-if="field.required" class="x-form__label-required">*</text>
      </view>
      <view class="x-form__control">
        <view v-if="field.label && labelPosition === 'top'" class="x-form__label">
          <text class="x-form__label-text">{{ field.label }}</text>
          <text v-if="field.required" class="x-form__label-required">*</text>
        </view>
        <slot :name="field.name" :field="field" :error="errors[field.name]" :value="model[field.name]" />
        <text v-if="errors[field.name]" class="x-form__error">{{ errors[field.name] }}</text>
        <text v-if="field.help" class="x-form__help">{{ field.help }}</text>
      </view>
    </view>
    <view v-if="$slots.actions" class="x-form__actions">
      <slot name="actions" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from '@xui/core'

export interface FormField {
  name: string
  label?: string
  required?: boolean
  help?: string
  rules?: Array<{ validator: (value: any) => boolean | string; message?: string }>
}

const props = withDefaults(
  defineProps<{
    model: Record<string, any>
    fields: FormField[]
    labelPosition?: 'left' | 'top' | 'right'
    labelWidth?: string
    customStyle?: Record<string, any>
  }>(),
  {
    labelPosition: 'left',
    labelWidth: '100px',
    customStyle: () => ({}),
  }
)

const emit = defineEmits<{
  submit: [values: Record<string, any>]
  validate: [valid: boolean, errors: Record<string, string>]
}>()

const errors = reactive<Record<string, string>>({})

const formStyle = computed(() => ({
  '--label-width': props.labelWidth,
  ...props.customStyle,
}))

function validate(): boolean {
  const newErrors: Record<string, string> = {}
  let valid = true

  for (const field of props.fields) {
    if (field.rules) {
      for (const rule of field.rules) {
        const result = rule.validator(props.model[field.name])
        if (result !== true) {
          newErrors[field.name] = typeof result === 'string' ? result : rule.message || '验证失败'
          valid = false
          break
        }
      }
    }
    if (field.required && !props.model[field.name]) {
      newErrors[field.name] = `${field.label || field.name}不能为空`
      valid = false
    }
  }

  Object.keys(errors).forEach((key) => delete errors[key])
  Object.assign(errors, newErrors)
  emit('validate', valid, errors)
  return valid
}

function reset() {
  Object.keys(errors).forEach((key) => delete errors[key])
}

defineExpose({ validate, reset, errors })
</script>

<style scoped>
.x-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.x-form__item {
  display: flex;
  align-items: flex-start;
}

.x-form--left .x-form__item {
  flex-direction: row;
}

.x-form--top .x-form__item {
  flex-direction: column;
}

.x-form__label {
  display: flex;
  align-items: center;
  gap: 2px;
  width: var(--label-width, 100px);
  flex-shrink: 0;
  padding-top: 8px;
}

.x-form--top .x-form__label {
  width: 100%;
  padding-top: 0;
  margin-bottom: 6px;
}

.x-form__label-text {
  font-size: 14px;
  color: #333;
}

.x-form__label-required {
  color: #ff4d4f;
}

.x-form__control {
  flex: 1;
  min-width: 0;
}

.x-form__error {
  font-size: 12px;
  color: #ff4d4f;
  margin-top: 4px;
  display: block;
}

.x-form__help {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 4px;
  display: block;
}

.x-form__item--error .x-form__control > input,
.x-form__item--error .x-form__control > textarea {
  border-color: #ff4d4f;
}

.x-form__actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 8px;
}
</style>
