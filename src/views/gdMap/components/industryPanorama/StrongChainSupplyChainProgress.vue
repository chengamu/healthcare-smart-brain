<template>
  <div class="right-card">
    <m-card title="强链补链进度">
      <v-chart ref="vChart" :option="option" :autoresize="true" />
    </m-card>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const colorMap = ref({
  '已落地': '#4292c8', // 科技蓝
  '在建中': '#35c084', // 生命绿
  '招引中': '#d09c42'  // 辉煌金
});

const data = ref({
  '已落地': [5, 4, 3, 8],
  '在建中': [3, 2, 4, 5],
  '招引中': [4, 3, 2, 6]
})

const option = ref({
  title: {
    text: "项目/企业数量",
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
      data: ["体外诊断", "生物材料", "植介入器材", "创新药"],
    },
    {
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(0,0,0,0)",
        },
      },
      data: [],
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
  series: Object.keys(data.value).map(name => ({
    name: name,
    type: 'bar',
    barWidth: 10,
    stack: 'total',
    data: data.value[name]
  }))
})

</script>
<style lang="scss"></style>
