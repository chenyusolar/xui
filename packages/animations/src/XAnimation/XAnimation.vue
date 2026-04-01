<template>
  <Transition
    :name="transitionName"
    :css="useCss"
    :duration="resolvedDuration"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type AnimationType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom'
  | 'scale'
  | 'bounce'
  | 'flip'
  | 'rotate'

const props = withDefaults(
  defineProps<{
    type?: AnimationType
    duration?: number | { enter: number; leave: number }
    delay?: number
    useCss?: boolean
    customClass?: string
  }>(),
  {
    type: 'fade',
    duration: 300,
    delay: 0,
    useCss: true,
    customClass: '',
  }
)

const emit = defineEmits<{
  beforeEnter: [el: Element]
  enter: [el: Element, done: () => void]
  afterEnter: [el: Element]
  beforeLeave: [el: Element]
  leave: [el: Element, done: () => void]
  afterLeave: [el: Element]
}>()

const transitionName = computed(() => `x-anim-${props.type}`)

const resolvedDuration = computed(() => {
  if (typeof props.duration === 'object') return props.duration
  return { enter: props.duration, leave: props.duration }
})

const onBeforeEnter = (el: Element) => emit('beforeEnter', el)
const onEnter = (el: Element, done: () => void) => {
  emit('enter', el, done)
  if (!props.useCss) done()
}
const onAfterEnter = (el: Element) => emit('afterEnter', el)
const onBeforeLeave = (el: Element) => emit('beforeLeave', el)
const onLeave = (el: Element, done: () => void) => {
  emit('leave', el, done)
  if (!props.useCss) done()
}
const onAfterLeave = (el: Element) => emit('afterLeave', el)
</script>

<style>
.x-anim-fade-enter-active,
.x-anim-fade-leave-active {
  transition: opacity var(--anim-duration, 300ms) ease;
}
.x-anim-fade-enter-from,
.x-anim-fade-leave-to {
  opacity: 0;
}

.x-anim-slide-up-enter-active,
.x-anim-slide-up-leave-active {
  transition: transform var(--anim-duration, 300ms) ease, opacity var(--anim-duration, 300ms) ease;
}
.x-anim-slide-up-enter-from,
.x-anim-slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.x-anim-slide-down-enter-active,
.x-anim-slide-down-leave-active {
  transition: transform var(--anim-duration, 300ms) ease, opacity var(--anim-duration, 300ms) ease;
}
.x-anim-slide-down-enter-from,
.x-anim-slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.x-anim-slide-left-enter-active,
.x-anim-slide-left-leave-active {
  transition: transform var(--anim-duration, 300ms) ease, opacity var(--anim-duration, 300ms) ease;
}
.x-anim-slide-left-enter-from,
.x-anim-slide-left-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.x-anim-slide-right-enter-active,
.x-anim-slide-right-leave-active {
  transition: transform var(--anim-duration, 300ms) ease, opacity var(--anim-duration, 300ms) ease;
}
.x-anim-slide-right-enter-from,
.x-anim-slide-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.x-anim-zoom-enter-active,
.x-anim-zoom-leave-active {
  transition: transform var(--anim-duration, 300ms) ease, opacity var(--anim-duration, 300ms) ease;
}
.x-anim-zoom-enter-from,
.x-anim-zoom-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

.x-anim-scale-enter-active,
.x-anim-scale-leave-active {
  transition: transform var(--anim-duration, 300ms) cubic-bezier(0.34, 1.56, 0.64, 1);
}
.x-anim-scale-enter-from,
.x-anim-scale-leave-to {
  transform: scale(0);
}

.x-anim-bounce-enter-active {
  animation: xBounceIn var(--anim-duration, 500ms) cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.x-anim-bounce-leave-active {
  animation: xBounceOut var(--anim-duration, 300ms) ease;
}

@keyframes xBounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes xBounceOut {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.3); opacity: 0; }
}

.x-anim-flip-enter-active {
  animation: xFlipIn var(--anim-duration, 500ms) ease;
}
.x-anim-flip-leave-active {
  animation: xFlipOut var(--anim-duration, 300ms) ease;
}

@keyframes xFlipIn {
  0% { transform: perspective(400px) rotateY(90deg); opacity: 0; }
  100% { transform: perspective(400px) rotateY(0); opacity: 1; }
}

@keyframes xFlipOut {
  0% { transform: perspective(400px) rotateY(0); opacity: 1; }
  100% { transform: perspective(400px) rotateY(-90deg); opacity: 0; }
}

.x-anim-rotate-enter-active {
  animation: xRotateIn var(--anim-duration, 500ms) ease;
}
.x-anim-rotate-leave-active {
  animation: xRotateOut var(--anim-duration, 300ms) ease;
}

@keyframes xRotateIn {
  0% { transform: rotate(-180deg) scale(0); opacity: 0; }
  100% { transform: rotate(0) scale(1); opacity: 1; }
}

@keyframes xRotateOut {
  0% { transform: rotate(0) scale(1); opacity: 1; }
  100% { transform: rotate(180deg) scale(0); opacity: 0; }
}
</style>
