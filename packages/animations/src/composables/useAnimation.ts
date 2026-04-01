import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseAnimationOptions {
  duration?: number
  easing?: string
  delay?: number
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fill?: 'none' | 'forwards' | 'backwards' | 'both' | 'auto'
}

export function useAnimation(options: UseAnimationOptions = {}) {
  const {
    duration = 300,
    easing = 'ease',
    delay = 0,
    iterations = 1,
    direction = 'normal',
    fill = 'forwards',
  } = options

  const elementRef = ref<HTMLElement | null>(null)
  const isAnimating = ref(false)
  let animation: Animation | null = null

  function animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, opts?: Partial<UseAnimationOptions>) {
    if (!elementRef.value) return

    const resolvedOpts = { duration, easing, delay, iterations, direction, fill, ...opts }
    isAnimating.value = true

    animation = elementRef.value.animate(keyframes, {
      duration: resolvedOpts.duration,
      easing: resolvedOpts.easing,
      delay: resolvedOpts.delay,
      iterations: resolvedOpts.iterations,
      direction: resolvedOpts.direction,
      fill: resolvedOpts.fill,
    })

    animation.onfinish = () => {
      isAnimating.value = false
    }

    animation.oncancel = () => {
      isAnimating.value = false
    }

    return animation
  }

  function fadeIn() {
    return animate([{ opacity: 0 }, { opacity: 1 }])
  }

  function fadeOut() {
    return animate([{ opacity: 1 }, { opacity: 0 }])
  }

  function slideIn(direction: 'up' | 'down' | 'left' | 'right' = 'up') {
    const offsets: Record<string, string> = {
      up: '20px',
      down: '-20px',
      left: '20px',
      right: '-20px',
    }
    const axis = direction === 'up' || direction === 'down' ? 'Y' : 'X'
    return animate([
      { transform: `translate${axis}(${offsets[direction]})`, opacity: 0 },
      { transform: 'translateY(0) translateX(0)', opacity: 1 },
    ])
  }

  function scaleIn(from = 0.8) {
    return animate([{ transform: `scale(${from})`, opacity: 0 }, { transform: 'scale(1)', opacity: 1 }])
  }

  function stop() {
    if (animation) {
      animation.cancel()
      animation = null
    }
    isAnimating.value = false
  }

  onUnmounted(() => {
    stop()
  })

  return {
    elementRef,
    isAnimating,
    animate,
    fadeIn,
    fadeOut,
    slideIn,
    scaleIn,
    stop,
  }
}

export function useStaggerAnimation(count: number, options: UseAnimationOptions & { staggerDelay?: number } = {}) {
  const { staggerDelay = 50, ...animOptions } = options
  const visibleItems = ref<number[]>([])

  function showAll() {
    visibleItems.value = []
    const items: number[] = []
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        items.push(i)
        visibleItems.value = [...items]
      }, i * staggerDelay)
    }
  }

  function hideAll() {
    visibleItems.value = []
  }

  onMounted(() => {
    showAll()
  })

  return { visibleItems, showAll, hideAll }
}
