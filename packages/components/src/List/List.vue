<template>
  <view class="x-list" :class="{ 'x-list--bordered': bordered }" :style="customStyle">
    <view v-for="(item, index) in dataSource" :key="item[keyField] || index" class="x-list__item" :class="{ 'x-list__item--clickable': clickable, 'x-list__item--active': activeIndex === index }" @click="handleItemClick(item, index)">
      <view v-if="$slots.item" class="x-list__item-content">
        <slot name="item" :item="item" :index="index" />
      </view>
      <view v-else class="x-list__item-content">
        <text class="x-list__item-title">{{ item[titleField] }}</text>
        <text v-if="descriptionField && item[descriptionField]" class="x-list__item-desc">{{ item[descriptionField] }}</text>
      </view>
      <view v-if="$slots.extra || extraField" class="x-list__item-extra">
        <slot name="extra" :item="item" :index="index">
          <text v-if="extraField">{{ item[extraField] }}</text>
        </slot>
      </view>
    </view>
    <view v-if="$slots.footer" class="x-list__footer">
      <slot name="footer" />
    </view>
  </view>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
const props = withDefaults(
  defineProps<{
    dataSource: T[]
    keyField?: keyof T & string
    titleField?: keyof T & string
    descriptionField?: keyof T & string
    extraField?: keyof T & string
    bordered?: boolean
    clickable?: boolean
    activeIndex?: number
    customStyle?: Record<string, any>
  }>(),
  {
    keyField: 'id',
    titleField: 'title',
    descriptionField: 'description',
    extraField: '',
    bordered: false,
    clickable: false,
    activeIndex: -1,
    customStyle: () => ({}),
  }
)

const emit = defineEmits<{
  itemClick: [item: T, index: number]
}>()

const handleItemClick = (item: T, index: number) => {
  if (props.clickable) {
    emit('itemClick', item, index)
  }
}
</script>

<style scoped>
.x-list {
  background: #fff;
}

.x-list--bordered {
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
}

.x-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.2s;
}

.x-list__item:last-child {
  border-bottom: none;
}

.x-list__item--clickable {
  cursor: pointer;
}

.x-list__item--clickable:hover {
  background: #fafafa;
}

.x-list__item--active {
  background: #e6f4ff;
}

.x-list__item-content {
  flex: 1;
  min-width: 0;
}

.x-list__item-title {
  font-size: 14px;
  color: #1f1f1f;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-list__item-desc {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 4px;
  display: block;
}

.x-list__item-extra {
  margin-left: 12px;
  flex-shrink: 0;
}

.x-list__footer {
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}
</style>
