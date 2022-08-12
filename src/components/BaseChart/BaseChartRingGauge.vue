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
    color: ['#027AFF'],
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
        },
        axisLine: {
          lineStyle: {
            width: 10,
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: [
          {
            value: 60,
            name: 'xxx得分',
            title: {
              offsetCenter: ['0%', '-35%'],
              fontSize: 18,
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '0%'],
            },
          },
        ],
        title: {
          fontSize: 14,
        },
        detail: {
          width: 50,
          height: 20,
          fontSize: 16,
          // color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 1,
          // formatter: '{value}%',
        },
      },
    ],
    graphic: [
      {
        type: 'text',
        left:
          // 偏移到图表的中间
          parseInt(window.getComputedStyle(chartDom.value!, null)!.width, 10) /
            2 -
          ('较差'.length * 18) / 2,
        bottom: '30%',
        style: {
          fill: '#FB8500',
          text: '较差',
          font: `bold 18px sans-serif`,
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
