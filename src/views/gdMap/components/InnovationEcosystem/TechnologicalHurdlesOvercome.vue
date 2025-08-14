<template>
  <div class="left-card">
    <m-card title="关键技术攻坚">
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
  '技术瓶颈': '#4292c8', // 科技蓝
  '技术突破': '#35c084', // 生命绿
});

const data = ref({
  '技术瓶颈': [5, 4, 3, 8],
  '技术突破': [3, 2, 3, 5],
})

const option = ref({
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
      data: ["2022", "2023", "2024", "2025"],
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
    type: 'pictorialBar',
    // --- **关键：通过象形柱图模拟3D效果** ---
    symbol: 'rect',
    symbolSize: ['100%', '100%'],
    barWidth: 10,
    stack: 'total',
    // --- **关键：加载时的“拔地而起”动画** ---
    animation: true,
    animationDuration: 1500,
    animationEasing: 'elasticOut',
    animationDelay: (dataIndex, params) => params.index * 100,

    itemStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{
          offset: 0, color: echarts.color.lift(colorMap.value[name], 0.3) // 顶部亮色
        }, {
          offset: 1, color: colorMap.value[name] // 底部主色
        }]
      },
    },
    // --- **关键：鼠标悬浮高亮效果** ---
    emphasis: {
      itemStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0, color: echarts.color.lift(colorMap.value[name], 0.6)
          }, {
            offset: 1, color: echarts.color.lift(colorMap.value[name], 0.2)
          }]
        },
        // 添加渐变色外圈
        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#FFFFFF' },
          { offset: 1, color: colorMap.value[name] }
        ]),
        borderWidth: 3
      }
    },
    data: data.value[name]
  }))
})

</script>
<style lang="scss"></style>
