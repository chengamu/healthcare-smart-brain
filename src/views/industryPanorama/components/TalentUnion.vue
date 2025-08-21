<template>
    <div class="left-card">
        <m-card title="人才联盟概况">
            <v-chart ref="vChart" :option="option" :autoresize="true"/>
        </m-card>
    </div>
</template>
<script setup>
import {ref, onMounted, onBeforeUnmount, nextTick} from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const option = ref({
    grid: {
        left: "12%",
        top: "25%",
        right: "12%",
        height: "55%",
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            shadowStyle: {opacity: 0},
        },
        backgroundColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        borderColor: "#999999",
        textStyle: {
            color: "#ffffff",
            fontSize: 10,
        },
        formatter: (params) => {
            return `
          <div class="tooltip-container">
            <div class="tooltip-title">${params[0].axisValue}年</div>
            <div class="tooltip-item">
              ${params[0].marker}
              <span class="tooltip-item-name">人才总数：</span>
              <span class="tooltip-item-value">${params[0].data}人</span>
            </div>
            <div class="tooltip-item">
              ${params[1].marker}
              <span class="tooltip-item-name">增长率：</span>
              <span class="tooltip-item-value">${params[1].data}%</span>
            </div>
          </div>
          `
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
    yAxis: [
        {
            name: "人数(人)",
            type: "value",
            nameTextStyle: {
                color: "#D3F8F2",
                fontWeight: 'bold',
                fontSize: 8,
                padding: [0, 20, 0, 0],
            },
            nameGap: 15, // 控制名称与轴线的距离
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
        {
            name: "增长率(%)",
            type: "value",
            nameTextStyle: {
                color: "#D3F8F2",
                fontWeight: 'bold',
                fontSize: 8,
                padding: [0, 0, 0, 20],
            },
            nameGap: 15, // 控制名称与轴线的距离
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
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
        }
    ],
    series: [
        {
            name: "人才总数",
            data: [20, 25, 32, 37],
            type: "bar",
            barWidth: 4,
            label: {
                show: false,
            },
            itemStyle: {
                borderRadius: 0,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 0, color: "#79EBCF"},
                    {offset: 1, color: "#0B6360"},
                ]),
            },
        },
        {
            name: '增长率',
            data: [20, 25, 28, 16],
            type: "line",
            smooth: true,
            symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ5JREFUOE+1la1OQ0EQRs8kCFIQdVCCxIBpCK1AInkDHC+B4QkwvASub4GsaE0NGCRpKhGFVDQZ+Mjem9vNbkphmWTMfjNnd3b2x0iYuxuwH7wNbIewBfAGzORm5nG6ElfM3QU6AXZSkzXG3oEnMxO8thWgux8DR2tAsfxiZs/VYA38Jazi1NBvYCizv+HK4vCRyrfQgIsf7Nm6+bSnjwIeAGeZaGnXQDfoE+ABmGbixwKeAoeJAMHuv3w30ubATQb6KqDKjZPEuAXOMysZAncJbS7gJbCVEAdAKwP8AK4S2vJfgMVLLt6UDtAreWx0W8od7OJXryq16OPwR2j6+WpAyz2wDagape7vARt9AZ+G3HmhiKS3xwAAAABJRU5ErkJggg==",
            symbolSize: 10,
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
            z: 0,
            // 设置高亮样式
            emphasis: {
                focus: "none",
                itemStyle: {color: "white"},
            },
            label: {
                show: true,
                position: "top",
                distance: 10,
                color: "#ffffff",
                fontSize: 10,
            },

            lineStyle: {
                shadowColor: "rgba(0, 0, 0, 0.4)",
                shadowBlur: 3,
                shadowOffsetY: 10,
                width: 3,
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
            yAxisIndex: 1,
        },
    ]
})
</script>

<style scoped lang="scss">

</style>