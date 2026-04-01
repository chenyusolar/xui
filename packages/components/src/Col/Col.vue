<template>
  <view class="x-col" :class="colClasses" :style="colStyle">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from '@xui/core'

const props = withDefaults(
  defineProps<{
    span?: number
    offset?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }>(),
  {
    span: 24,
    offset: 0,
  }
)

const gutter = inject('x-row-gutter', 0)

const colClasses = computed(() => {
  const classes: string[] = []
  classes.push(`x-col--${props.span}`)
  if (props.offset) classes.push(`x-col--offset-${props.offset}`)
  if (props.xs) classes.push(`x-col--xs-${props.xs}`)
  if (props.sm) classes.push(`x-col--sm-${props.sm}`)
  if (props.md) classes.push(`x-col--md-${props.md}`)
  if (props.lg) classes.push(`x-col--lg-${props.lg}`)
  if (props.xl) classes.push(`x-col--xl-${props.xl}`)
  return classes
})

const colStyle = computed(() => {
  const style: Record<string, any> = {}
  if (gutter) {
    style.paddingLeft = `${gutter / 2}px`
    style.paddingRight = `${gutter / 2}px`
  }
  return style
})
</script>

<style scoped>
.x-col {
  box-sizing: border-box;
}

.x-col--0 { display: none; }
.x-col--1 { flex: 0 0 4.166667%; max-width: 4.166667%; }
.x-col--2 { flex: 0 0 8.333333%; max-width: 8.333333%; }
.x-col--3 { flex: 0 0 12.5%; max-width: 12.5%; }
.x-col--4 { flex: 0 0 16.666667%; max-width: 16.666667%; }
.x-col--5 { flex: 0 0 20.833333%; max-width: 20.833333%; }
.x-col--6 { flex: 0 0 25%; max-width: 25%; }
.x-col--7 { flex: 0 0 29.166667%; max-width: 29.166667%; }
.x-col--8 { flex: 0 0 33.333333%; max-width: 33.333333%; }
.x-col--9 { flex: 0 0 37.5%; max-width: 37.5%; }
.x-col--10 { flex: 0 0 41.666667%; max-width: 41.666667%; }
.x-col--11 { flex: 0 0 45.833333%; max-width: 45.833333%; }
.x-col--12 { flex: 0 0 50%; max-width: 50%; }
.x-col--13 { flex: 0 0 54.166667%; max-width: 54.166667%; }
.x-col--14 { flex: 0 0 58.333333%; max-width: 58.333333%; }
.x-col--15 { flex: 0 0 62.5%; max-width: 62.5%; }
.x-col--16 { flex: 0 0 66.666667%; max-width: 66.666667%; }
.x-col--17 { flex: 0 0 70.833333%; max-width: 70.833333%; }
.x-col--18 { flex: 0 0 75%; max-width: 75%; }
.x-col--19 { flex: 0 0 79.166667%; max-width: 79.166667%; }
.x-col--20 { flex: 0 0 83.333333%; max-width: 83.333333%; }
.x-col--21 { flex: 0 0 87.5%; max-width: 87.5%; }
.x-col--22 { flex: 0 0 91.666667%; max-width: 91.666667%; }
.x-col--23 { flex: 0 0 95.833333%; max-width: 95.833333%; }
.x-col--24 { flex: 0 0 100%; max-width: 100%; }

.x-col--offset-0 { margin-left: 0; }
.x-col--offset-1 { margin-left: 4.166667%; }
.x-col--offset-2 { margin-left: 8.333333%; }
.x-col--offset-3 { margin-left: 12.5%; }
.x-col--offset-4 { margin-left: 16.666667%; }
.x-col--offset-5 { margin-left: 20.833333%; }
.x-col--offset-6 { margin-left: 25%; }
.x-col--offset-7 { margin-left: 29.166667%; }
.x-col--offset-8 { margin-left: 33.333333%; }
.x-col--offset-9 { margin-left: 37.5%; }
.x-col--offset-10 { margin-left: 41.666667%; }
.x-col--offset-11 { margin-left: 45.833333%; }
.x-col--offset-12 { margin-left: 50%; }
.x-col--offset-13 { margin-left: 54.166667%; }
.x-col--offset-14 { margin-left: 58.333333%; }
.x-col--offset-15 { margin-left: 62.5%; }
.x-col--offset-16 { margin-left: 66.666667%; }
.x-col--offset-17 { margin-left: 70.833333%; }
.x-col--offset-18 { margin-left: 75%; }
.x-col--offset-19 { margin-left: 79.166667%; }
.x-col--offset-20 { margin-left: 83.333333%; }
.x-col--offset-21 { margin-left: 87.5%; }
.x-col--offset-22 { margin-left: 91.666667%; }
.x-col--offset-23 { margin-left: 95.833333%; }
.x-col--offset-24 { margin-left: 100%; }

@media (max-width: 576px) {
  .x-col--xs-0 { display: none; }
  .x-col--xs-1 { flex: 0 0 4.166667%; max-width: 4.166667%; }
  .x-col--xs-2 { flex: 0 0 8.333333%; max-width: 8.333333%; }
  .x-col--xs-3 { flex: 0 0 12.5%; max-width: 12.5%; }
  .x-col--xs-4 { flex: 0 0 16.666667%; max-width: 16.666667%; }
  .x-col--xs-5 { flex: 0 0 20.833333%; max-width: 20.833333%; }
  .x-col--xs-6 { flex: 0 0 25%; max-width: 25%; }
  .x-col--xs-7 { flex: 0 0 29.166667%; max-width: 29.166667%; }
  .x-col--xs-8 { flex: 0 0 33.333333%; max-width: 33.333333%; }
  .x-col--xs-9 { flex: 0 0 37.5%; max-width: 37.5%; }
  .x-col--xs-10 { flex: 0 0 41.666667%; max-width: 41.666667%; }
  .x-col--xs-11 { flex: 0 0 45.833333%; max-width: 45.833333%; }
  .x-col--xs-12 { flex: 0 0 50%; max-width: 50%; }
  .x-col--xs-13 { flex: 0 0 54.166667%; max-width: 54.166667%; }
  .x-col--xs-14 { flex: 0 0 58.333333%; max-width: 58.333333%; }
  .x-col--xs-15 { flex: 0 0 62.5%; max-width: 62.5%; }
  .x-col--xs-16 { flex: 0 0 66.666667%; max-width: 66.666667%; }
  .x-col--xs-17 { flex: 0 0 70.833333%; max-width: 70.833333%; }
  .x-col--xs-18 { flex: 0 0 75%; max-width: 75%; }
  .x-col--xs-19 { flex: 0 0 79.166667%; max-width: 79.166667%; }
  .x-col--xs-20 { flex: 0 0 83.333333%; max-width: 83.333333%; }
  .x-col--xs-21 { flex: 0 0 87.5%; max-width: 87.5%; }
  .x-col--xs-22 { flex: 0 0 91.666667%; max-width: 91.666667%; }
  .x-col--xs-23 { flex: 0 0 95.833333%; max-width: 95.833333%; }
  .x-col--xs-24 { flex: 0 0 100%; max-width: 100%; }
}

@media (min-width: 577px) and (max-width: 768px) {
  .x-col--sm-0 { display: none; }
  .x-col--sm-1 { flex: 0 0 4.166667%; max-width: 4.166667%; }
  .x-col--sm-2 { flex: 0 0 8.333333%; max-width: 8.333333%; }
  .x-col--sm-3 { flex: 0 0 12.5%; max-width: 12.5%; }
  .x-col--sm-4 { flex: 0 0 16.666667%; max-width: 16.666667%; }
  .x-col--sm-5 { flex: 0 0 20.833333%; max-width: 20.833333%; }
  .x-col--sm-6 { flex: 0 0 25%; max-width: 25%; }
  .x-col--sm-7 { flex: 0 0 29.166667%; max-width: 29.166667%; }
  .x-col--sm-8 { flex: 0 0 33.333333%; max-width: 33.333333%; }
  .x-col--sm-9 { flex: 0 0 37.5%; max-width: 37.5%; }
  .x-col--sm-10 { flex: 0 0 41.666667%; max-width: 41.666667%; }
  .x-col--sm-11 { flex: 0 0 45.833333%; max-width: 45.833333%; }
  .x-col--sm-12 { flex: 0 0 50%; max-width: 50%; }
  .x-col--sm-13 { flex: 0 0 54.166667%; max-width: 54.166667%; }
  .x-col--sm-14 { flex: 0 0 58.333333%; max-width: 58.333333%; }
  .x-col--sm-15 { flex: 0 0 62.5%; max-width: 62.5%; }
  .x-col--sm-16 { flex: 0 0 66.666667%; max-width: 66.666667%; }
  .x-col--sm-17 { flex: 0 0 70.833333%; max-width: 70.833333%; }
  .x-col--sm-18 { flex: 0 0 75%; max-width: 75%; }
  .x-col--sm-19 { flex: 0 0 79.166667%; max-width: 79.166667%; }
  .x-col--sm-20 { flex: 0 0 83.333333%; max-width: 83.333333%; }
  .x-col--sm-21 { flex: 0 0 87.5%; max-width: 87.5%; }
  .x-col--sm-22 { flex: 0 0 91.666667%; max-width: 91.666667%; }
  .x-col--sm-23 { flex: 0 0 95.833333%; max-width: 95.833333%; }
  .x-col--sm-24 { flex: 0 0 100%; max-width: 100%; }
}

@media (min-width: 769px) and (max-width: 992px) {
  .x-col--md-0 { display: none; }
  .x-col--md-1 { flex: 0 0 4.166667%; max-width: 4.166667%; }
  .x-col--md-2 { flex: 0 0 8.333333%; max-width: 8.333333%; }
  .x-col--md-3 { flex: 0 0 12.5%; max-width: 12.5%; }
  .x-col--md-4 { flex: 0 0 16.666667%; max-width: 16.666667%; }
  .x-col--md-5 { flex: 0 0 20.833333%; max-width: 20.833333%; }
  .x-col--md-6 { flex: 0 0 25%; max-width: 25%; }
  .x-col--md-7 { flex: 0 0 29.166667%; max-width: 29.166667%; }
  .x-col--md-8 { flex: 0 0 33.333333%; max-width: 33.333333%; }
  .x-col--md-9 { flex: 0 0 37.5%; max-width: 37.5%; }
  .x-col--md-10 { flex: 0 0 41.666667%; max-width: 41.666667%; }
  .x-col--md-11 { flex: 0 0 45.833333%; max-width: 45.833333%; }
  .x-col--md-12 { flex: 0 0 50%; max-width: 50%; }
  .x-col--md-13 { flex: 0 0 54.166667%; max-width: 54.166667%; }
  .x-col--md-14 { flex: 0 0 58.333333%; max-width: 58.333333%; }
  .x-col--md-15 { flex: 0 0 62.5%; max-width: 62.5%; }
  .x-col--md-16 { flex: 0 0 66.666667%; max-width: 66.666667%; }
  .x-col--md-17 { flex: 0 0 70.833333%; max-width: 70.833333%; }
  .x-col--md-18 { flex: 0 0 75%; max-width: 75%; }
  .x-col--md-19 { flex: 0 0 79.166667%; max-width: 79.166667%; }
  .x-col--md-20 { flex: 0 0 83.333333%; max-width: 83.333333%; }
  .x-col--md-21 { flex: 0 0 87.5%; max-width: 87.5%; }
  .x-col--md-22 { flex: 0 0 91.666667%; max-width: 91.666667%; }
  .x-col--md-23 { flex: 0 0 95.833333%; max-width: 95.833333%; }
  .x-col--md-24 { flex: 0 0 100%; max-width: 100%; }
}

@media (min-width: 993px) and (max-width: 1200px) {
  .x-col--lg-0 { display: none; }
  .x-col--lg-1 { flex: 0 0 4.166667%; max-width: 4.166667%; }
  .x-col--lg-2 { flex: 0 0 8.333333%; max-width: 8.333333%; }
  .x-col--lg-3 { flex: 0 0 12.5%; max-width: 12.5%; }
  .x-col--lg-4 { flex: 0 0 16.666667%; max-width: 16.666667%; }
  .x-col--lg-5 { flex: 0 0 20.833333%; max-width: 20.833333%; }
  .x-col--lg-6 { flex: 0 0 25%; max-width: 25%; }
  .x-col--lg-7 { flex: 0 0 29.166667%; max-width: 29.166667%; }
  .x-col--lg-8 { flex: 0 0 33.333333%; max-width: 33.333333%; }
  .x-col--lg-9 { flex: 0 0 37.5%; max-width: 37.5%; }
  .x-col--lg-10 { flex: 0 0 41.666667%; max-width: 41.666667%; }
  .x-col--lg-11 { flex: 0 0 45.833333%; max-width: 45.833333%; }
  .x-col--lg-12 { flex: 0 0 50%; max-width: 50%; }
  .x-col--lg-13 { flex: 0 0 54.166667%; max-width: 54.166667%; }
  .x-col--lg-14 { flex: 0 0 58.333333%; max-width: 58.333333%; }
  .x-col--lg-15 { flex: 0 0 62.5%; max-width: 62.5%; }
  .x-col--lg-16 { flex: 0 0 66.666667%; max-width: 66.666667%; }
  .x-col--lg-17 { flex: 0 0 70.833333%; max-width: 70.833333%; }
  .x-col--lg-18 { flex: 0 0 75%; max-width: 75%; }
  .x-col--lg-19 { flex: 0 0 79.166667%; max-width: 79.166667%; }
  .x-col--lg-20 { flex: 0 0 83.333333%; max-width: 83.333333%; }
  .x-col--lg-21 { flex: 0 0 87.5%; max-width: 87.5%; }
  .x-col--lg-22 { flex: 0 0 91.666667%; max-width: 91.666667%; }
  .x-col--lg-23 { flex: 0 0 95.833333%; max-width: 95.833333%; }
  .x-col--lg-24 { flex: 0 0 100%; max-width: 100%; }
}

@media (min-width: 1201px) {
  .x-col--xl-0 { display: none; }
  .x-col--xl-1 { flex: 0 0 4.166667%; max-width: 4.166667%; }
  .x-col--xl-2 { flex: 0 0 8.333333%; max-width: 8.333333%; }
  .x-col--xl-3 { flex: 0 0 12.5%; max-width: 12.5%; }
  .x-col--xl-4 { flex: 0 0 16.666667%; max-width: 16.666667%; }
  .x-col--xl-5 { flex: 0 0 20.833333%; max-width: 20.833333%; }
  .x-col--xl-6 { flex: 0 0 25%; max-width: 25%; }
  .x-col--xl-7 { flex: 0 0 29.166667%; max-width: 29.166667%; }
  .x-col--xl-8 { flex: 0 0 33.333333%; max-width: 33.333333%; }
  .x-col--xl-9 { flex: 0 0 37.5%; max-width: 37.5%; }
  .x-col--xl-10 { flex: 0 0 41.666667%; max-width: 41.666667%; }
  .x-col--xl-11 { flex: 0 0 45.833333%; max-width: 45.833333%; }
  .x-col--xl-12 { flex: 0 0 50%; max-width: 50%; }
  .x-col--xl-13 { flex: 0 0 54.166667%; max-width: 54.166667%; }
  .x-col--xl-14 { flex: 0 0 58.333333%; max-width: 58.333333%; }
  .x-col--xl-15 { flex: 0 0 62.5%; max-width: 62.5%; }
  .x-col--xl-16 { flex: 0 0 66.666667%; max-width: 66.666667%; }
  .x-col--xl-17 { flex: 0 0 70.833333%; max-width: 70.833333%; }
  .x-col--xl-18 { flex: 0 0 75%; max-width: 75%; }
  .x-col--xl-19 { flex: 0 0 79.166667%; max-width: 79.166667%; }
  .x-col--xl-20 { flex: 0 0 83.333333%; max-width: 83.333333%; }
  .x-col--xl-21 { flex: 0 0 87.5%; max-width: 87.5%; }
  .x-col--xl-22 { flex: 0 0 91.666667%; max-width: 91.666667%; }
  .x-col--xl-23 { flex: 0 0 95.833333%; max-width: 95.833333%; }
  .x-col--xl-24 { flex: 0 0 100%; max-width: 100%; }
}
</style>
