<template>
  <div class="left-card">
    <m-card :title="title">
      <div class="population-proportion">
        <div class="population-proportion-chart">
          <v-chart ref="vChart" :option="option" :autoresize="true" />
          <div class="label-name">人才占比</div>
        </div>
        <div class="pie-legend">
          <div class="pie-legend-item" v-for="(item, index) in state.pieData" :key="index">
            <div class="icon" :style="{ borderColor: state.pieDataColor[index] }"></div>
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}<span class="unit">人</span></div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const props = defineProps({
    title: {
      type: String,
      default: "人才联盟构成",
    },
})

const state = reactive({
  pieDataColor: ["#17E6C3", "#40CFFF", "#1979FF"],
  pieData: [
    {
      name: "顶级专家",
      value: 14,
    },
    {
      name: "技术经理人",
      value: 12,
    },
    {
      name: "技能人才",
      value: 17,
    },
  ],
})
const option = ref({
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

  series: [
    {
      name: "",
      type: "pie",
      itemStyle: {
        borderWidth: 5,
        borderColor: "rgba(26, 57, 77,1)",
      },
      label: { show: false },
      radius: ["55%", "70%"],
      color: ["#c487ee", "#deb140", "#49dff0"],

      data: [
        {
          value: 14,
          name: "顶级专家",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(3,65,128,1)" },
              { offset: 1, color: "rgba(115,208,255,1)" },
            ]),
          },
        },
        {
          value: 12,
          name: "技术经理人",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(11, 77, 44, 1)" },
              { offset: 1, color: "rgba(77, 255, 181, 1)" },
            ]),
          },
        },
        {
          value: 17,
          name: "技能人才",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(117, 117, 117, 1)" },
              { offset: 1, color: "rgba(230, 230, 230, 1)" },
            ]),
          },
        },
      ],
    },
  ],
})

</script>
<style lang="scss">
.population-proportion {
  display: flex;
  height: 100%;
  &-chart {
    position: relative;
    width: 180px;
    height: 100%;
    margin-left: 15px;
    background: url("~@/assets/images/pie/pie-zs-bg.png") no-repeat;
    background-size: cover;
    .label-name {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 72px;
      height: 72px;
      margin-left: -36px;
      margin-top: -36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #c4e3fd;
    }
    &:after {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: -1;
      margin-left: -36px;
      margin-top: -36px;
      content: "";
      width: 72px;
      height: 72px;
      background: url("~@/assets/images/pie/pie-mid-circle.png") no-repeat;
      background-size: cover;
      animation: rotate360Animate 2s linear infinite;
    }
  }
  .pie-legend {
    padding-left: 30px;
  }
}
</style>
