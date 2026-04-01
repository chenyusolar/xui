<template>
  <XPopup v-model:visible="popupVisible" position="bottom" :show-header="true" :title="title" size="full">
    <view class="x-picker">
      <view class="x-picker__toolbar">
        <view class="x-picker__btn x-picker__btn--cancel" @click="handleCancel">
          <text>{{ cancelText }}</text>
        </view>
        <text class="x-picker__title">{{ title }}</text>
        <view class="x-picker__btn x-picker__btn--confirm" @click="handleConfirm">
          <text>{{ confirmText }}</text>
        </view>
      </view>
      <view class="x-picker__columns">
        <view
          v-for="(col, colIndex) in columns"
          :key="colIndex"
          class="x-picker__column"
        >
          <view class="x-picker__mask x-picker__mask--top" />
          <view class="x-picker__mask x-picker__mask--bottom" />
          <view class="x-picker__highlight" />
          <view
            class="x-picker__scroll"
            @touchstart="handleTouchStart($event, colIndex)"
            @touchmove="handleTouchMove($event, colIndex)"
            @touchend="handleTouchEnd($event, colIndex)"
          >
            <view class="x-picker__item x-picker__item--spacer" />
            <view
              v-for="(item, index) in col"
              :key="item.value"
              class="x-picker__item"
              :class="{ 'x-picker__item--active': activeIndexes[colIndex] === index }"
              @click="handleItemClick(colIndex, index)"
            >
              <text class="x-picker__item-text">{{ item.label }}</text>
            </view>
            <view class="x-picker__item x-picker__item--spacer" />
          </view>
        </view>
      </view>
    </view>
  </XPopup>
</template>

<script setup lang="ts">
import { ref, computed, watch } from '@xui/core'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    title?: string
    columns?: PickerOption[][]
    defaultValue?: (string | number)[]
    cancelText?: string
    confirmText?: string
  }>(),
  {
    visible: false,
    title: '请选择',
    columns: () => [],
    defaultValue: () => [],
    cancelText: '取消',
    confirmText: '确定',
  }
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  confirm: [values: (string | number)[], options: PickerOption[]]
  cancel: []
  change: [values: (string | number)[], options: PickerOption[]]
}>()

const popupVisible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val),
})

const activeIndexes = ref<number[]>([])

watch(
  () => props.visible,
  (val) => {
    if (val) {
      activeIndexes.value = props.columns.map((col, i) => {
        const def = props.defaultValue[i]
        if (def !== undefined) {
          const idx = col.findIndex((o) => o.value === def)
          return idx >= 0 ? idx : 0
        }
        return 0
      })
    }
  }
)

function handleItemClick(colIndex: number, index: number) {
  activeIndexes.value[colIndex] = index
  emitChange()
}

function handleTouchStart(e: TouchEvent, colIndex: number) {
  // touch handling for mobile
}

function handleTouchMove(e: TouchEvent, colIndex: number) {
  // touch handling for mobile
}

function handleTouchEnd(e: TouchEvent, colIndex: number) {
  // touch handling for mobile
}

function emitChange() {
  const values = activeIndexes.value.map((idx, ci) => props.columns[ci]?.[idx]?.value)
  const options = activeIndexes.value.map((idx, ci) => props.columns[ci]?.[idx])
  emit('change', values, options)
}

function handleConfirm() {
  const values = activeIndexes.value.map((idx, ci) => props.columns[ci]?.[idx]?.value)
  const options = activeIndexes.value.map((idx, ci) => props.columns[ci]?.[idx])
  emit('confirm', values, options)
  emit('update:visible', false)
}

function handleCancel() {
  emit('cancel')
  emit('update:visible', false)
}
</script>

<style scoped>
.x-picker {
  display: flex;
  flex-direction: column;
  height: 280px;
}

.x-picker__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.x-picker__btn {
  padding: 4px 12px;
  cursor: pointer;
  font-size: 14px;
}

.x-picker__btn--cancel { color: #8c8c8c; }
.x-picker__btn--confirm { color: #1677ff; font-weight: 500; }

.x-picker__title {
  font-size: 16px;
  font-weight: 600;
}

.x-picker__columns {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.x-picker__column {
  flex: 1;
  position: relative;
  height: 100%;
}

.x-picker__highlight {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 40px;
  transform: translateY(-50%);
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  pointer-events: none;
  z-index: 1;
}

.x-picker__mask {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  pointer-events: none;
}

.x-picker__mask--top {
  top: 0;
  height: calc(50% - 20px);
  background: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.5));
}

.x-picker__mask--bottom {
  bottom: 0;
  height: calc(50% - 20px);
  background: linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.5));
}

.x-picker__scroll {
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.x-picker__item {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
}

.x-picker__item--spacer {
  height: calc(50% - 20px);
}

.x-picker__item--active .x-picker__item-text {
  color: #1f1f1f;
  font-weight: 500;
  font-size: 16px;
}

.x-picker__item-text {
  font-size: 14px;
  color: #8c8c8c;
  white-space: nowrap;
}
</style>
