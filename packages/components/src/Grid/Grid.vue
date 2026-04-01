<template>
  <view class="x-grid" :class="[`x-grid--${columns}`]" :style="gridStyle">
    <view
      v-for="(item, index) in dataSource"
      :key="item[keyField] || index"
      class="x-grid__item"
      :class="{ 'x-grid__item--clickable': clickable }"
      @click="handleClick(item, index)"
    >
      <slot name="item" :item="item" :index="index" />
    </view>
  </view>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from '@xui/core'

const props = withDefaults(
  defineProps<{
    dataSource: T[]
    columns?: number
    gap?: number
    keyField?: keyof T & string
    clickable?: boolean
    customStyle?: Record<string, any>
  }>(),
  {
    columns: 2,
    gap: 12,
    keyField: 'id',
    clickable: false,
    customStyle: () => ({}),
  }
)

const emit = defineEmits<{
  itemClick: [item: T, index: number]
}>()

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  gap: `${props.gap}px`,
  ...props.customStyle,
}))

const handleClick = (item: T, index: number) => {
  if (props.clickable) {
    emit('itemClick', item, index)
  }
}
</script>

<style scoped>
.x-grid__item {
  min-width: 0;
}

.x-grid__item--clickable {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.x-grid__item--clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
