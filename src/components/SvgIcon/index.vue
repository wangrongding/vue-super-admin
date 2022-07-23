<script setup lang="ts">
interface IProps {
  /** svg 的图标的名称 */
  iconName: string
  prefix: string
  color: string
}
// const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const props = defineProps<IProps>()
const symbolId = computed(() => `#icon-${props.iconName}`)
</script>

<template>
  <svg aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>
