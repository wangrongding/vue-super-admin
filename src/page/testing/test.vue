<script setup lang="ts">
// delete this ⬆️ comment and you can see the error
// import type { Test } from './type.ts'
import { Test } from './type'

const props = defineProps<Test>()
const state = reactive({})

type testA = typeof props.text
</script>
<template>
  <div class="test-container">{{ text }}</div>
</template>
