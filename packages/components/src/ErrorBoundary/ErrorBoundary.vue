<script setup lang="ts">
import { ref, onErrorCaptured, type VNode } from 'vue'

const props = withDefaults(
  defineProps<{
    fallback?: string
  }>(),
  {
    fallback: 'Something went wrong',
  }
)

const emit = defineEmits<{
  error: [error: Error, instance: any, info: string]
}>()

const error = ref<Error | null>(null)

onErrorCaptured((err, instance, info) => {
  error.value = err as Error
  emit('error', err as Error, instance, info)
  return false
})

function reset() {
  error.value = null
}

defineExpose({ reset })
</script>

<template>
  <view v-if="error" class="x-error-boundary">
    <slot name="fallback">
      <view class="x-error-boundary__default">
        <text class="x-error-boundary__icon">⚠️</text>
        <text class="x-error-boundary__message">{{ fallback }}</text>
        <view class="x-error-boundary__retry" @click="reset">
          <text>Retry</text>
        </view>
      </view>
    </slot>
  </view>
  <slot v-else />
</template>

<style scoped>
.x-error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 8px;
}

.x-error-boundary__default {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.x-error-boundary__icon {
  font-size: 24px;
}

.x-error-boundary__message {
  font-size: 14px;
  color: #ff4d4f;
}

.x-error-boundary__retry {
  padding: 6px 16px;
  background: #ff4d4f;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s;
}

.x-error-boundary__retry:hover {
  background: #ff7875;
}
</style>
