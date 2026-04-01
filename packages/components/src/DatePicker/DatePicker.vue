<template>
  <view class="x-date-picker">
    <XInput
      :model-value="displayValue"
      :placeholder="placeholder || t('xui.datePicker.placeholder')"
      :disabled="disabled"
      readonly
      @click="openPicker"
    >
      <template #suffix>
        <text class="x-date-picker__icon">📅</text>
      </template>
    </XInput>
    <XPicker
      v-model:visible="pickerVisible"
      :title="title || t('xui.datePicker.title')"
      :columns="pickerColumns"
      :default-value="defaultPickerValues"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from '@xui/core'
import { t } from '@xui/core'
import XInput from '../Input/Input.vue'
import XPicker from '../Picker/Picker.vue'

export type DatePickerType = 'date' | 'datetime' | 'year-month' | 'time'
export type DateValueType = string | Date | null

const props = withDefaults(
  defineProps<{
    modelValue?: DateValueType
    type?: DatePickerType
    placeholder?: string
    disabled?: boolean
    title?: string
    format?: string
    minDate?: Date
    maxDate?: Date
  }>(),
  {
    modelValue: null,
    type: 'date',
    placeholder: '',
    disabled: false,
    title: '',
    format: '',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: DateValueType]
  change: [value: DateValueType]
}>()

const pickerVisible = ref(false)

const defaultFormat = computed(() => {
  if (props.format) return props.format
  switch (props.type) {
    case 'datetime': return 'YYYY-MM-DD HH:mm'
    case 'year-month': return 'YYYY-MM'
    case 'time': return 'HH:mm'
    default: return 'YYYY-MM-DD'
  }
})

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  const date = props.modelValue instanceof Date ? props.modelValue : new Date(props.modelValue)
  if (isNaN(date.getTime())) return ''
  return formatDate(date, defaultFormat.value)
})

const pickerColumns = computed(() => {
  const cols: Array<{ label: string; value: string | number }[]> = []
  const now = new Date()
  const minDate = props.minDate || new Date(now.getFullYear() - 10, 0, 1)
  const maxDate = props.maxDate || new Date(now.getFullYear() + 10, 11, 31)

  if (props.type === 'time') {
    cols.push(Array.from({ length: 24 }, (_, i) => ({ label: `${String(i).padStart(2, '0')}时`, value: i })))
    cols.push(Array.from({ length: 60 }, (_, i) => ({ label: `${String(i).padStart(2, '0')}分`, value: i })))
    return cols
  }

  const years: { label: string; value: number }[] = []
  for (let y = minDate.getFullYear(); y <= maxDate.getFullYear(); y++) {
    years.push({ label: `${y}年`, value: y })
  }
  cols.push(years)

  if (props.type === 'year-month' || props.type === 'date' || props.type === 'datetime') {
    cols.push(Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}月`, value: i + 1 })))
  }

  if (props.type === 'date' || props.type === 'datetime') {
    cols.push(Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}日`, value: i + 1 })))
  }

  if (props.type === 'datetime') {
    cols.push(Array.from({ length: 24 }, (_, i) => ({ label: `${String(i).padStart(2, '0')}时`, value: i })))
    cols.push(Array.from({ length: 60 }, (_, i) => ({ label: `${String(i).padStart(2, '0')}分`, value: i })))
  }

  return cols
})

const defaultPickerValues = computed(() => {
  if (!props.modelValue) {
    const now = new Date()
    return getDefaultValues(now)
  }
  const date = props.modelValue instanceof Date ? props.modelValue : new Date(props.modelValue)
  return getDefaultValues(date)
})

function getDefaultValues(date: Date) {
  const values: (string | number)[] = [date.getFullYear(), date.getMonth() + 1]
  if (props.type === 'date' || props.type === 'datetime') {
    values.push(date.getDate())
  }
  if (props.type === 'datetime') {
    values.push(date.getHours(), date.getMinutes())
  }
  return values
}

function formatDate(date: Date, format: string): string {
  const map: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  }
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (m) => map[m])
}

function handleConfirm(values: (string | number)[], options: any[]) {
  if (props.type === 'time') {
    const h = Number(values[0])
    const m = Number(values[1])
    emit('update:modelValue', `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    emit('change', `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    return
  }

  const year = Number(values[0])
  const month = Number(values[1]) - 1
  const day = props.type === 'year-month' ? 1 : Number(values[2]) || 1
  const hour = (props.type === 'datetime' ? Number(values[3]) : 0) || 0
  const minute = (props.type === 'datetime' ? Number(values[4]) : 0) || 0

  const date = new Date(year, month, day, hour, minute)
  emit('update:modelValue', date)
  emit('change', date)
}

function handleCancel() {
  pickerVisible.value = false
}

function openPicker() {
  if (!props.disabled) {
    pickerVisible.value = true
  }
}
</script>

<style scoped>
.x-date-picker__icon {
  font-size: 16px;
}
</style>
