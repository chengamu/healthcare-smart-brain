<template>
  <div class="right-card">
    <m-card title="创新成果转化">
      <v-chart ref="vChart" :option="option" :autoresize="true"/>
    </m-card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const option = ref({
  title: {
    text: "转化率/%",
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
    data: ["重医大研究中心", "绍兴生物医药创新中心"],
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
  color: ["#6BC7F6", "#44E6A2"],
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
      data: ['2022', '2023', '2024', '2025'],
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
  series: [
    {
      name: "重医大研究中心",
      data: [35, 45, 60, 70],
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
        shadowColor: "rgba(115, 208, 255, 1)",
        shadowBlur: 20,
        shadowOffsetY: 0,
        width: 2,
        color: "#6BC7F6",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(107, 199, 246, 0.4)",
          },
          {
            offset: 1,
            color: "rgba(107, 199, 246, 0)",
          },
        ]),
      },
    },
    {
      name: "绍兴生物医药创新中心",
      data: [40, 48, 52, 65],
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
        shadowColor: "rgba(68, 230, 162, 1)",
        shadowBlur: 20,
        shadowOffsetY: 0,
        width: 2,
        color: "#44E6A2",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(68, 230, 162, 0.4)",
          },
          {
            offset: 1,
            color: "rgba(68, 230, 162, 0)",
          },
        ]),
      },
    },
  ],
})
</script>

<style scoped lang="scss">
  
</style>