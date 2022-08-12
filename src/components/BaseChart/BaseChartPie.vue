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
    title: {
      text: props.chartOptions.title,
      left: 'left',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      align: 'auto',
      width: '70%',
      bottom: '2%',
      itemWidth: 14,
      formatter: ['{a|{name}}'].join('\n'),
      textStyle: {
        rich: {
          a: {
            width: 60,
            fontSize: 12,
            lineHeight: 12,
          },
        },
      },
    },
    color: props.chartOptions.color.length
      ? props.chartOptions.color
      : [
          '#5470c6',
          '#91cc75',
          '#fac858',
          '#ee6666',
          '#73c0de',
          '#3ba272',
          '#fc8452',
          '#9a60b4',
          '#ea7ccc',
        ],
    series: [
      {
        name: props.chartOptions.title,
        type: 'pie',
        radius: '40%',
        center: ['50%', '40%'],
        data: props.chartOptions.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
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
      border: 1px solid #99999957;
    "
  ></div>
</template>
