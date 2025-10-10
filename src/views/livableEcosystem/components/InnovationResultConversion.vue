<template>
  <div class="right-card">
    <m-card title="创新成果转化">
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
    configValue: cxcgzh,
    getConfigKeyFunc: fetchCxcgzh
} = useGetConfigKey('brain.livableEcosystem.cxcgzh') // 智慧大脑-产城生态-创新成果转化

// 提取数据形成统一结构
const chartData = ref({
  title: "",
  // title: "转化率/%",
  xAxisData: [/*'2022', '2023', '2024', '2025'*/],
  legendData: [/*"重医大研究中心", "绍兴生物医药创新中心"*/],
  seriesData: [
    // {
    //   name: "重医大研究中心",
    //   data: [35, 45, 60, 70],
    //   color: "#6BC7F6",
    //   shadowColor: "rgba(115, 208, 255, 1)",
    //   areaColorStart: "rgba(107, 199, 246, 0.4)",
    //   areaColorEnd: "rgba(107, 199, 246, 0)",
    // },
    // {
    //   name: "绍兴生物医药创新中心",
    //   data: [40, 48, 52, 65],
    //   color: "#44E6A2",
    //   shadowColor: "rgba(68, 230, 162, 1)",
    //   areaColorStart: "rgba(68, 230, 162, 0.4)",
    //   areaColorEnd: "rgba(68, 230, 162, 0)",
    // }
  ]
})

onMounted(() => {
    init()
});

async function init(str) {
    // 获取需要的参数
    await Promise.all([
        fetchCxcgzh(),
    ])
    chartData.value.title = JSON.parse(cxcgzh.value).title
    chartData.value.xAxisData = JSON.parse(cxcgzh.value).xAxisData
    chartData.value.legendData = JSON.parse(cxcgzh.value).legendData
    chartData.value.seriesData = JSON.parse(cxcgzh.value).seriesData
}

const option = computed(() => ({
  title: {
    text: chartData.value.title,
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
    data: chartData.value.legendData,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      shadowStyle: { opacity: 0.2 },
    },
    backgroundColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    borderColor: "#999999",
    textStyle: {
      color: "#ffffff",
      fontSize: 10,
      lineHeight: 156,
    },
  },
  color: chartData.value.seriesData.map(item => item.color),
  xAxis: [
    {
      type: "category",
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
      data: chartData.value.xAxisData,
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
  series: chartData.value.seriesData.map(item => ({
    name: item.name,
    data: item.data,
    type: "line",
    smooth: true,
    symbol: "circle",
    symbolSize: 6,
    showSymbol: false,
    label: {
      show: true,
      position: "top",
      distance: 10,
      color: "#ffffff",
      fontSize: 8,
    },
    lineStyle: {
      shadowColor: item.shadowColor,
      shadowBlur: 20,
      shadowOffsetY: 0,
      width: 2,
      color: item.color,
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: item.areaColorStart,
        },
        {
          offset: 1,
          color: item.areaColorEnd,
        },
      ]),
    },
  }))
}))
</script>

<style scoped lang="scss">
  
</style>