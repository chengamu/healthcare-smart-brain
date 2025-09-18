<template>
  <div :class="`${position}-card`">
    <m-card title="产业联盟构成">
      <div class="population-proportion">
        <div class="population-proportion-chart">
          <v-chart ref="vChart" :option="option" :autoresize="true" />
          <div class="label-name">产业占比</div>
        </div>
        <div class="pie-legend">
          <div class="pie-legend-item" v-for="(item, index) in state.pieData" :key="index">
            <div class="icon" :style="{ borderColor: state.pieDataColor[index] }"></div>
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}<span class="unit">家</span></div>
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
import {countEnterpriseByType} from "@/api/brain.js";

const state = reactive({
  pieDataColor: ["#17E6C3", "#40CFFF", "#1979FF", "#FFC472", "#E673FF", "#FF8C42", "#73FFFE"],
  pieData: [
    {
      name: "高端医疗器械",
      value: 9,
    },
    {
      name: "创新药",
      value: 14,
    },
    {
      name: "大健康消费",
      value: 4,
    },
    {
      name: "CRO/CDMO",
      value: 2,
    },
    {
      name: "研究院",
      value: 2,
    },
    {
      name: "医院",
      value: 2,
    },
    {
      name: "基金机构",
      value: 4,
    },
  ],
})

onMounted(() => {
    init()
})

async function init() {
    await getCountEnterpriseByType()
}

function getCountEnterpriseByType() {
    return countEnterpriseByType().then(response => {
        state.pieData = response.data.map((it, index) => {
            option.value.series[0].data[index].value = it.count
            option.value.series[0].data[index].name = it.dictLabel
            return {
                name: it.dictLabel,
                value: it.count
            }
        })
    });
}

const props = defineProps({
    position: {
        type: String,
        default: 'left'
    }
})
const option = ref({
  animationDuration: 2000,
  animationEasing: 'cubicOut',
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      shadowStyle: { opacity: 0 },
    },
    backgroundColor: "rgba(0,0,0,0.8)",
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
      color: ["#c487ee", "#deb140", "#49dff0", "#034079", "#6f81da", "#00ffb4"],
      emphasis: {
        itemStyle: {
          shadowBlur: 15,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        scale: true,
        scaleSize: 5
      },
      animationDuration: 2000,
      animationEasing: 'cubicOut',

      data: [
        {
          value: 9,
          name: "高端医疗器械",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(3,65,128,1)" },
              { offset: 1, color: "rgba(115,208,255,1)" },
            ]),
          },
        },
        {
          value: 14,
          name: "创新药",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(11, 77, 44, 1)" },
              { offset: 1, color: "rgba(77, 255, 181, 1)" },
            ]),
          },
        },
        {
          value: 4,
          name: "大健康消费",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(117, 117, 117, 1)" },
              { offset: 1, color: "rgba(230, 230, 230, 1)" },
            ]),
          },
        },
        {
          value: 2,
          name: "CRO/CDMO",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(153, 105, 38, 1)" },
              { offset: 1, color: "rgba(255, 200, 89, 1)" },
            ]),
          },
        },
        {
          value: 2,
          name: "研究院",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(89, 38, 153, 1)" },
              { offset: 1, color: "rgba(200, 89, 255, 1)" },
            ]),
          },
        },
        {
          value: 2,
          name: "医院",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(38, 153, 128, 1)" },
              { offset: 1, color: "rgba(89, 255, 200, 1)" },
            ]),
          },
        },
        {
          value: 4,
          name: "基金机构",
          itemStyle: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: "rgba(153, 89, 38, 1)" },
              { offset: 1, color: "rgba(255, 178, 89, 1)" },
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
