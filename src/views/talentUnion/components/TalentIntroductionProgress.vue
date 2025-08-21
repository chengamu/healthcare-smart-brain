<template>
  <div class="left-card">
    <m-card title="人才引进进度">
      <v-chart ref="vChart" :option="option" :autoresize="true" />
    </m-card>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const progressData = ref([
  { label: '行业顶尖专家', current: 14, goal: 50, unit: '人',
    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
      { offset: 0, color: "rgba(3,65,128,1)" },
      { offset: 1, color: "rgba(115,208,255,1)" },
    ]) },
  { label: '省级以上领军型人才', current: 1, goal: 5, unit: '人',
    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
      { offset: 0, color: "rgba(11, 77, 44, 1)" },
      { offset: 1, color: "rgba(77, 255, 181, 1)" },
    ])
  },
  { label: '专业技能人才和青年人才', current: 17, goal: 150, unit: '人',
    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
      { offset: 0, color: "rgba(117, 117, 117, 1)" },
      { offset: 1, color: "rgba(230, 230, 230, 1)" },
    ])
  },
])

// 计算所有目标值中的最大值，用于统一x轴最大值
const maxGoal = Math.max(...progressData.value.map(item => item.goal))

// 根据最大goal值计算每条数据的新current值
const calculateAdjustedCurrent = (current, goal, maxGoal) => {
  // 按比例计算新的current值
  return (current / goal) * maxGoal
}

// 为所有数据项计算调整后的current值
const adjustedProgressData = progressData.value.map(item => {
  return {
    ...item,
    maxGoal: maxGoal,
    adjustedCurrent: calculateAdjustedCurrent(item.current, item.goal, maxGoal)
  }
})

const option = ref({
  grid: {
    left: "5%",
    top: "10%",
    width: "90%",
    height: "86%",
  },
  legend: {
    top: "8%",
    icon: "circle",
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      color: "#90979c",
      fontSize: 12,
      lineHeight: 20,
    },
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
      lineHeight: 16,
    },

      formatter: (params) => {
          const item = adjustedProgressData[params[0].dataIndex];
          return `
          <div class="tooltip-container">
            <div class="tooltip-title">${params[0].axisValue}</div>
            <div class="tooltip-item">
              ${params[0].marker}
              <span class="tooltip-item-value">${item.current}${item.unit}</span>
            </div>
          </div>
          `
      },
  },
  xAxis: [
    {
      type: "value",
      // 设置x轴最大值为所有目标值中的最大值，确保所有进度条对齐
      max: maxGoal,
      interval: maxGoal > 10 ? undefined : 1,

      axisLine: {
        show: false,
        lineStyle: {
          color: "#407A80",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: "#CFDAE6",
        fontSize: 10,
        interval: 0,
      },
    },
  ],

  yAxis: [
    {
      type: "category",
      inverse: true,
      axisLabel: {
        color: "#CFDAE6",
        fontSize: 10,
        interval: 0,
        show: false,
        verticalAlign: "top",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      data: progressData.value.map(it => it.label),
    },
    {
      inverse: true,
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(0,0,0,0)",
        },
      },
      data: [],
    },
  ],
  color: ["rgba(115,208,255,1)", "rgba(77, 255, 181, 1)", "rgba(230, 230, 230, 1)", "rgba(255, 200, 89, 1)"],
  series: [
    {
      data: adjustedProgressData.map(it => {
        return {
          value: it.adjustedCurrent,
          itemStyle: {
            color: it.color,
          },
        }
      }),
      type: "bar",
      barWidth: 7,
      yAxisIndex: 0,
      showBackground: false,
      z: 2,
      label: {
        show: true,
        position: "middle",
        padding: [-18, 0, 0, 0],
        color: "#16C1A6",
        fontSize: 12,
        formatter: (params) => {
          const item = adjustedProgressData[params.dataIndex];
          return `{label|${item.label}}{value|${item.current} / ${item.goal} ${item.unit}}`;
        },
        rich: {
          label: {
            align: 'left',
            width: 100
          },
          value: {
            align: 'right',
            width: 100
          }
        }
      },
      itemStyle: {
        borderRadius: 0,
        borderWidth: 2,
        borderColor: "rgba(26, 57, 77,1)",
      },
    },
    {
      name: "",
      type: "bar",
      yAxisIndex: 1,
      barGap: "-100%",
      data: adjustedProgressData.map(it => it.maxGoal), // 添加单位信息
      barWidth: 10,
      z: 0,
      itemStyle: {
        color: "none",
        borderColor: "rgba(172,191,188,0.4)",
        borderWidth: 1,
        borderRadius: 0,
      },
    },
  ],
})

</script>

<style lang="scss"></style>