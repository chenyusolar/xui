import { ref, computed, watch, watchEffect, reactive, readonly, toRefs, toRef, nextTick, onMounted, onUnmounted, onBeforeMount, provide, inject, Ref, ComputedRef, Reactive, WritableComputedRef } from 'vue'

export {
  ref,
  computed,
  watch,
  watchEffect,
  reactive,
  readonly,
  toRefs,
  toRef,
  nextTick,
  onMounted,
  onUnmounted,
  onBeforeMount,
  provide,
  inject,
}

export type { Ref, ComputedRef, Reactive, WritableComputedRef }

import { platform, getPlatform } from './platform-impl'

export function usePlatform() {
  return { platform, getPlatform }
}

export { platform, getPlatform }
