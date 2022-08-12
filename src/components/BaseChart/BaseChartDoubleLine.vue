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
      text: props.chartOptions?.title || '',
      left: 'left',
    },
    tooltip: {
      trigger: 'axis',
      formatter: props.chartOptions?.formatter,
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true,
    },
    legend: {
      // icon: 'line',
      orient: 'horizontal',
      left: 'right',
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
    color: props.chartOptions?.color?.length
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

    xAxis: {
      type: 'category',
      nameLocation: 'middle',
    },
    yAxis: {},
    series: props.chartOptions?.series?.length
      ? props.chartOptions?.series.map((item: any) => {
          return {
            name: item.name,
            type: 'line',
            data: item.data,
            symbol: item.symbol,
            symbolSize: item.symbolSize,
            lineStyle: item.lineStyle,
          }
        })
      : [],
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
