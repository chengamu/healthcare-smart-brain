<template>
    <div class="left-card">
        <m-card title="青年人才引育目标">
            <v-chart ref="vChart" :option="option" :autoresize="true" />
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const pointerData = 55; // 仪表指针数据
const pointerMaxData = 150; // 仪表指针最大数据

const steps = 10; // 总共10个步骤
const borderColor = {

    colorStops: [{
        offset: 0,
        color: 'rgba(208, 244, 255, 1)'
    }, {
        offset: 1,
        color: 'rgba(35, 190, 240, 1)'
    }]
}; // 边框颜色

// 使用数组和循环动态生成颜色数组
const axisLinecolor = Array.from({ length: steps + 1 }, (_, index) => {
    const ratio = index / steps;
    const colorValue = ratio <= (pointerData / pointerMaxData) ? borderColor : 'transparent';
    return [ratio, colorValue];
});

console.log("axisLinecolor", axisLinecolor)

const option = {
    backgroundColor: "#041F34",
    title: [
        {
            text: pointerData + '/' + pointerMaxData,
            x: 'center',
            top: '40%',
            textStyle: {
                color: '#43E7FF',
                fontSize: 16,
                fontWeight: '600',
            },
        },],
    series: [
        {
            name: "",
            type: 'gauge',
            splitNumber: 4, //刻度数量
            min: 0,
            max: 100,
            radius: '90%', //图表尺寸
            // center: ['50%', '60%'],
            zlevel: 12,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 0,
                    shadowBlur: 0,
                    color: [
                        [1, '#cccccccc']
                    ]
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: 'auto',
                    width: 10
                },
                length: 28,
                splitNumber: 5
            },
            splitLine: {
                show: true,
                length: 22,
                lineStyle: {
                    color: 'auto',
                }
            },
            axisLabel: {
                show: false
            },
            pointer: { //仪表盘指针
                show: 0,
            },
            detail: {
                show: 0,
            },
            // data: [
            //    {

            //       name: "PM2.5",
            //       title: {
            //          // 配置“家居总数”的样式
            //          show: true,
            //          fontSize: 28,
            //          fontWeight: 700,
            //          // fontFamily: fontFamily.fontFamily65W,
            //          color: "rgba(128,255,255,1)",
            //          offsetCenter: ["0", "70%"],

            //       },
            //    },
            // ],
        },
        {
            name: '统计',
            type: 'gauge',
            splitNumber: 4, //刻度数量
            min: 0,
            max: 100,
            radius: '90%', //图表尺寸
            // center: ['50%', '60%'],
            zlevel: 21,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 0,
                    shadowBlur: 0,
                    shadowColor: '#0093ee', //默认透明
                    color: axisLinecolor,


                }
            },
            axisTick: {

                show: true,
                lineStyle: {
                    color: 'auto',
                    width: 10
                },
                length: 28,
                splitNumber: 5
            },
            splitLine: {

                show: true,
                length: 22,
                lineStyle: {
                    color: 'auto',
                }
            },
            axisLabel: {
                show: false
            },
            pointer: { //仪表盘指针
                show: 0,
                length: '70%',
                width: 2,

            },

            detail: {
                valueAnimation: true,
                show: false,
                color: "#fff",
                fontFamily: 'sans-serif',
                offsetCenter: [-30, '10%'],
                fontSize: 16,
            },
            title: {
                offsetCenter: [0, '25%'],
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: 16
            },
            // data: [{
            //     name: "",
            //     value: 10
            // }]
            data: [{ 'name': '青年人才',  }],
        },

        {
            type: 'pie',
            name: '内层细圆环',
            radius: ['85%', '90%'],

            hoverAnimation: false,
            zlevel: 2,
            clockWise: true,
            startAngle: '225',
            endAngle: -45,
            splitNumber: 50,
            itemStyle: {
                normal: {
                    color: '#07b6e3',
                },
            },
            label: {
                show: false,
            },
            data: [
                {
                    value: 150,
                    itemStyle: {
                        normal: {
                            color: '#1D63B1',
                        },
                    },
                },
                {
                    value: 1,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            color: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                        },
                        emphasis: {
                            color: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                        },
                    },
                },
            ],
        },
    ]
};

</script>

<style scoped lang="scss">

</style>