<template>
  <view class="x-table" :class="{ 'x-table--bordered': bordered, 'x-table--striped': striped, 'x-table--hoverable': hoverable }" :style="tableStyle">
    <view class="x-table__header">
      <view class="x-table__row">
        <view v-for="col in columns" :key="col.key" class="x-table__cell x-table__head-cell" :style="{ width: col.width, textAlign: col.align, flex: col.width ? undefined : 1 }">
          <text class="x-table__head-text">{{ col.title }}</text>
        </view>
      </view>
    </view>
    <view class="x-table__body">
      <view v-for="(row, rowIndex) in dataSource" :key="row[keyField] || rowIndex" class="x-table__row" :class="{ 'x-table__row--striped': striped && rowIndex % 2 === 1 }" @click="handleRowClick(row, rowIndex)">
        <view v-for="col in columns" :key="col.key" class="x-table__cell x-table__body-cell" :style="{ width: col.width, textAlign: col.align, flex: col.width ? undefined : 1 }">
          <slot :name="col.key" :row="row" :index="rowIndex">
            <text class="x-table__body-text">{{ row[col.key] }}</text>
          </slot>
        </view>
      </view>
      <view v-if="dataSource.length === 0" class="x-table__empty">
        <slot name="empty">
          <text class="x-table__empty-text">暂无数据</text>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from '@xui/core'

export interface TableColumn {
  key: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(
  defineProps<{
    columns: TableColumn[]
    dataSource: T[]
    keyField?: keyof T & string
    bordered?: boolean
    striped?: boolean
    hoverable?: boolean
    customStyle?: Record<string, any>
  }>(),
  {
    keyField: 'id',
    bordered: true,
    striped: false,
    hoverable: true,
    customStyle: () => ({}),
  }
)

const emit = defineEmits<{
  rowClick: [row: T, index: number]
}>()

const tableStyle = computed(() => props.customStyle)

const handleRowClick = (row: T, index: number) => {
  emit('rowClick', row, index)
}
</script>

<style scoped>
.x-table {
  width: 100%;
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
}

.x-table--bordered {
  border: 1px solid #f0f0f0;
}

.x-table__header {
  background: #fafafa;
}

.x-table__row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
}

.x-table__row:last-child {
  border-bottom: none;
}

.x-table__row--striped {
  background: #fafafa;
}

.x-table--hoverable .x-table__row:hover {
  background: #e6f4ff;
}

.x-table__cell {
  padding: 12px 16px;
  min-width: 0;
}

.x-table__head-cell {
  font-weight: 600;
  color: #1f1f1f;
}

.x-table__body-cell {
  color: #595959;
}

.x-table__head-text,
.x-table__body-text {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.x-table__empty {
  padding: 40px 0;
  text-align: center;
}

.x-table__empty-text {
  color: #bfbfbf;
  font-size: 14px;
}
</style>
