<template>
  <div class="left-card">
    <m-card title="关键技术攻坚">
      <v-chart ref="vChart" :option="option" :autoresize="true"/>
    </m-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"
import {
    useGetConfigKey
} from '@/hooks/useGetConfigKey'

/**
 * 参数获取
 */
const {
    configValue: gjjsgj,
    getConfigKeyFunc: fetchGjjsgj
} = useGetConfigKey('brain.livableEcosystem.gjjsgj') // 智慧大脑-产城生态-关键技术攻坚

// 统一数据结构
const chartData = ref({
  years: [/*"2022", "2023", "2024", "2025"*/],
  items: [
    // {
    //   name: '技术瓶颈',
    //   color: '#4292c8',
    //   data: [5, 4, 3, 8]
    // },
    // {
    //   name: '技术突破',
    //   color: '#35c084',
    //   data: [3, 2, 3, 5]
    // }
  ]
})

onMounted(() => {
    init()
});

async function init(str) {
    // 获取需要的参数
    await Promise.all([
        fetchGjjsgj(),
    ])
    chartData.value.years = JSON.parse(gjjsgj.value).years
    chartData.value.items = JSON.parse(gjjsgj.value).items
}

const option = computed(() => ({
  title: {
    text: "个",
    left: "5%",
    top: "8%",
    textStyle: {
      color: "#D3F8F2",
      fontSize: 8,
    },
  },
  grid: {
    left: "12%",
    top: "25%",
    width: "82%",
    height: "55%",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      shadowStyle: { opacity: 0 },
    },
    backgroundColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    borderColor: "#999999",
    textStyle: {
      color: "#ffffff",
      fontSize: 10,
    },
  },
  legend: {
    top: "4%",
    icon: "circle",
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      color: "#90979c",
      fontSize: 12,
      lineHeight: 20,
    },
  },
  xAxis: [
    {
      type: "category",
      interval: 0,
      axisLine: {
        show: false,
        lineStyle: {
          color: "#435459",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: "#ffffff",
        fontSize: 10,
        interval: 0,
        padding: [0, 0, 0, 0],
      },
      data: chartData.value.years,
    },
  ],
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: [2, 2],
        dashOffset: 5,
        color: ["rgba(255, 255, 255, 1)"],
        opacity: 1,
        width: 0.3,
      },
    },
    axisLabel: {
      color: "#8B9EA4",
      fontSize: 9,
    },
  },
  series: chartData.value.items.map(item => ({
    name: item.name,
    type: 'bar',
    barWidth: 10,
    stack: 'total',
    animation: true,
    animationDuration: 1500,
    animationEasing: 'elasticOut',
    itemStyle: {
      color: item.color,
    },
    data: item.data
  }))
}))
</script>

<style scoped lang="scss">

</style>