<template>
  <div class="right-card">
    <m-card title="高新企业增长">
      <v-chart ref="vChart" :option="option" :autoresize="true" />
    </m-card>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const option = ref({
  title: {
    text: "企业数量(家)",
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
    data: ["专精特新", "国家高新技术企业"],
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
  series: [
    {
      name: "专精特新",
      data: [12, 18, 25, 35],
      type: "line",
      smooth: true,
      symbol:
          "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ5JREFUOE+1la1OQ0EQRs8kCFIQdVCCxIBpCK1AInkDHC+B4QkwvASub4GsaE0NGCRpKhGFVDQZ+Mjem9vNbkphmWTMfjNnd3b2x0iYuxuwH7wNbIewBfAGzORm5nG6ElfM3QU6AXZSkzXG3oEnMxO8thWgux8DR2tAsfxiZs/VYA38Jazi1NBvYCizv+HK4vCRyrfQgIsf7Nm6+bSnjwIeAGeZaGnXQDfoE+ABmGbixwKeAoeJAMHuv3w30ubATQb6KqDKjZPEuAXOMysZAncJbS7gJbCVEAdAKwP8AK4S2vJfgMVLLt6UDtAreWx0W8od7OJXryq16OPwR2j6+WpAyz2wDagape7vARt9AZ+G3HmhiKS3xwAAAABJRU5ErkJggg==",
      symbolSize: 10,
      showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
      xAxisIndex: 1,
      z: 3,
      // 设置高亮样式
      emphasis: {
        focus: "none",
        itemStyle: { color: "white" },
      },
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
        width: 1,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(115, 208, 255, 1)",
          },
          {
            offset: 1,
            color: "rgba(18,60,98,1)",
          },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(25, 255, 236, 0.4)",
          },
          {
            color: "rgba(51, 153, 255, 0)",
            offset: 1,
          },
        ]),
      },
    },
    {
      name: "国家高新技术企业",
      data: [20, 28, 40, 55],
      type: "line",
      smooth: true,
      symbol:
          "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ5JREFUOE+1la1OQ0EQRs8kCFIQdVCCxIBpCK1AInkDHC+B4QkwvASub4GsaE0NGCRpKhGFVDQZ+Mjem9vNbkphmWTMfjNnd3b2x0iYuxuwH7wNbIewBfAGzORm5nG6ElfM3QU6AXZSkzXG3oEnMxO8thWgux8DR2tAsfxiZs/VYA38Jazi1NBvYCizv+HK4vCRyrfQgIsf7Nm6+bSnjwIeAGeZaGnXQDfoE+ABmGbixwKeAoeJAMHuv3w30ubATQb6KqDKjZPEuAXOMysZAncJbS7gJbCVEAdAKwP8AK4S2vJfgMVLLt6UDtAreWx0W8od7OJXryq16OPwR2j6+WpAyz2wDagape7vARt9AZ+G3HmhiKS3xwAAAABJRU5ErkJggg==",
      symbolSize: 10,
      showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
      xAxisIndex: 1,
      z: 0,
      // 设置高亮样式
      emphasis: {
        focus: "none",
        itemStyle: { color: "white" },
      },
      label: {
        show: true,
        position: "top",
        distance: 10,
        color: "#ffffff",
        fontSize: 8,
      },

      lineStyle: {
        shadowColor: "rgba(69, 233, 164, 1)",
        shadowBlur: 20,
        shadowOffsetY: 0,
        width: 1,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#45E9A4",
          },
          {
            offset: 1,
            color: "rgba(19,99,61,1)",
          },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(25, 255, 236, 0.4)",
          },
          {
            color: "rgba(51, 153, 255, 0)",
            offset: 1,
          },
        ]),
      },
    },
  ],
})
</script>

<style lang="scss"></style>
