<script setup lang="ts">
// @ts-nocheck
// delete this ⬆️ comment and you can see the error
import type { Test } from './type.ts'

const props = defineProps<Test>()
const state = reactive({})
</script>
<template>
  <div class="test-container"></div>
</template>
