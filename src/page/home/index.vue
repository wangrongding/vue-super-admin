<script setup lang="ts">
import BaseChartBar from '@/components/BaseChart/BaseChartBar.vue'
// import BaseChartPieVue from '@/components/BaseChart/BaseChartPie.vue'

const chartData = {
  data: [
    {
      label: '第一个',
      value: 100,
      color: '#47ba80',
    },
    {
      label: '第二个',
      value: 200,
      color: '#ffc107',
    },
    {
      label: '第三个',
      value: 300,
      color: '#ff5722',
    },
    {
      label: '第四个',
      value: 400,
      color: '#f44336',
    },
    {
      label: '第五个',
      value: 500,
      color: '#9c27b0',
    },
    {
      label: '第六个',
      value: 600,
      color: '#673ab7',
    },
    {
      label: '第七个',
      value: 700,
      color: '#3f51b5',
    },
    {
      label: '第八个',
      value: 800,
      color: '#2196f3',
    },
    {
      label: '第九个',
      value: 900,
      color: '#03a9f4',
    },
    {
      label: '第十个',
      value: 1000,
      color: '#00bcd4',
    },
  ],
}

function openGithub() {
  window.open('https://github.com/wangrongding')
}
</script>

<template>
  <div class="home-container">
    <div>
      <p align="center">
        <img width="300" src="@/assets/logo.png" alt="Vue logo" />
      </p>
      <h1>
        Vue Super 👉
        <el-button type="primary" size="default" @click="openGithub">
          仓库
        </el-button>
      </h1>
    </div>
    <BaseChartBar :chart-options="chartData" style="height: 300px" />
    <div class="bottom-panel">
      <BaseChartBar :chart-options="chartData" />
      <BaseChartBar :chart-options="chartData" />
      <BaseChartBar :chart-options="chartData" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  // height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h1 {
    color: $base-text-color;
    margin: 40px;

    a {
      color: $base-text-color;
    }
  }

  .top-panel {
    height: 400px;
  }

  .bottom-panel {
    margin: 10px 0;
    height: 300px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
}
</style>
