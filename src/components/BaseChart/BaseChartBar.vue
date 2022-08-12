<!-- 饼状图 -->
<script setup lang="ts">
import * as echarts from 'echarts'
import { ECharts } from 'echarts'
import { useEventListener, tryOnUnmounted, useTimeoutFn } from '@vueuse/core'

const props = defineProps({
  chartOptions: {
    type: Object,
    default: () => {},
  } as any,
})

let echartsInstance: ECharts
type EChartsOption = echarts.EChartsOption
const chartDom = ref<HTMLElement>()

// 绘制图表
function render() {
  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: props?.chartOptions?.data?.map((item) => item.label),
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    yAxis: {
      type: 'value',
    },
    color: ['#47ba80'],
    series: [
      {
        data: props?.chartOptions?.data?.map((item) => {
          return {
            value: item.value,
            itemStyle: {
              color: item.color,
            },
          }
        }),
        type: 'bar',
      },
    ],
  }
  echartsInstance = echarts.init(chartDom.value as HTMLElement)
  echartsInstance.setOption(options)
}

watch(
  () => props.chartOptions,
  () => {
    nextTick(() => {
      if (!echartsInstance) return
      echartsInstance.dispose()
      render()
    })
  },
  {
    deep: true,
  },
)

onBeforeMount(() => {
  nextTick(() => {
    render()
  })
})

onMounted(() => {
  nextTick(() => {
    useEventListener('resize', () => {
      if (!echartsInstance) return
      useTimeoutFn(() => {
        echartsInstance.resize()
      }, 180)
    })
  })
})

tryOnUnmounted(() => {
  if (!echartsInstance) return
  echartsInstance.dispose()
})
</script>
<template>
  <div
    id="chartDom"
    ref="chartDom"
    class="chart-dom"
    style="
      min-height: 100px;
      height: 100%;
      width: 100%;
      border: 1px solid #47ba80;
    "
  ></div>
</template>
