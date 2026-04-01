<template>
  <view class="x-virtual-list" :style="{ height: `${height}px` }" @scroll="handleScroll">
    <view class="x-virtual-list__phantom" :style="{ height: `${totalHeight}px` }" />
    <view class="x-virtual-list__content" :style="{ transform: `translateY(${offsetY}px)` }">
      <view
        v-for="item in visibleData"
        :key="item.key"
        class="x-virtual-list__item"
        :style="{ height: `${itemSize}px` }"
      >
        <slot :item="item.data" :index="item.index" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" generic="T">
import { ref, computed } from '@xui/core'

export interface VirtualItem {
  key: string | number
  index: number
  data: any
}

const props = withDefaults(
  defineProps<{
    dataSource: T[]
    itemSize: number
    height: number
    keyField?: keyof T & string
    bufferSize?: number
  }>(),
  {
    keyField: 'id',
    bufferSize: 5,
  }
)

const emit = defineEmits<{
  scroll: [scrollTop: number]
  reachEnd: []
}>()

const scrollTop = ref(0)

const totalHeight = computed(() => props.dataSource.length * props.itemSize)

const visibleCount = computed(() => Math.ceil(props.height / props.itemSize))

const visibleData = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemSize)
  const end = Math.min(start + visibleCount.value + props.bufferSize * 2, props.dataSource.length)
  const items: VirtualItem[] = []
  for (let i = Math.max(0, start - props.bufferSize); i < end; i++) {
    items.push({
      key: (props.dataSource[i] as any)[props.keyField] ?? i,
      index: i,
      data: props.dataSource[i],
    })
  }
  return items
})

const offsetY = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemSize)
  return Math.max(0, start - props.bufferSize) * props.itemSize
})

function handleScroll(e: Event) {
  const target = e.target as HTMLElement
  scrollTop.value = target.scrollTop
  emit('scroll', target.scrollTop)

  const isNearBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 10
  if (isNearBottom) {
    emit('reachEnd')
  }
}
</script>

<style scoped>
.x-virtual-list {
  overflow-y: auto;
  position: relative;
  width: 100%;
}

.x-virtual-list__phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.x-virtual-list__content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.x-virtual-list__item {
  overflow: hidden;
}
</style>
