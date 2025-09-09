<template>
    <div class="right-card">
        <m-card title="企业发展方向TOP5">
            <v-chart ref="vChart" :option="option" :autoresize="true" />
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"
import {countEnterpriseByDevelopment} from "@/api/brain.js";

const information = ref({
    color: "#069DFD",
    area: ["药学", "免疫学", "肿瘤学", "医疗影像", "医疗器械"],
    dataArray: [20, 15, 10, 8, 5],
});

const style = {
    width: 32,
    height: 24,
    padding: [5, 6, 0, 0],
    fontSize: 20,
    align: "center",
    color: "#ffffff"
}

onMounted(() => {
    init()
})

async function init() {
    await getCountEnterpriseByDevelopment()
}

function getCountEnterpriseByDevelopment() {
    return countEnterpriseByDevelopment({ visible: '1' }).then(response => {
        let data = response.data
            .sort((a, b) => b.count - a.count)  // 按count降序排序
            .slice(0, 5)  // 获取前5个数据
        option.value.yAxis[0].data = data.map(it => it.dictLabel)
        option.value.yAxis[1].data = data.map(it => it.count)
        option.value.series[0].data = data.map(it => it.count).map((item) => {
            return {
                value: item,
                itemStyle: {
                    borderRadius: 5,
                    color: information.value.color,
                },
            };
        })
        option.value.series[1].data = data.map(it => it.count)
        // information.value.dataArray = data.map(it => it.count)
    });
}

const option = ref({
    tooltip: {
        show: false,
    },
    grid: {
        left: "5%",
        right: "5%",
        top: "10%",
        bottom: "10%", // 特殊
        containLabel: true,
    },
    xAxis: [
        {
            type: "value",
            show: false,
        },
    ],
    yAxis: [
        {
            type: "category",
            splitLine: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            inverse: true,
            // data: information.value.area,
            data: [],
            axisLabel: {
                color: "rgba(96, 98, 102, 1)",
                margin: 10,
                formatter: (name, index) => {
                    const id = index + 1;
                    if (id <5) {
                        return `{id|${id}}{nameStyle|${name}}`;
                    } else {
                        return `{ids|${id}}{nameStyle|${name}}`;
                    }
                },
                rich: {
                    id:{
                        padding: [0, 0, 0, 2],
                        fontSize: 16,
                        color: '#fff',
                    },
                    ids:{
                        padding: [0, 0, 0, 2],
                        fontSize: 16,
                        color: '#b4bec8',
                    },
                    nameStyle: {
                        padding: [0, 10, 0, 2],
                        fontSize: 16,
                        color: '#fff',
                    },
                    rank: {
                        ...style,
                        backgroundColor: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
                            {
                                offset: 0,
                                color: '#E7F4FF',
                            },
                            {
                                offset: 0.95,
                                color: '#fff',
                            },
                        ]),
                    },
                    rank1: {
                        ...style,
                        color: "#FF992B",
                        backgroundColor: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
                            {
                                offset: 0,
                                color: '#E7F4FF',
                            },
                            {
                                offset: 0.95,
                                color: '#fff',
                            },
                        ]),
                    },
                },
            },
        },
        {
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
                color: "#6bc7f6",
                fontSize: 16,
                margin: 16,
                formatter: function (value) {
                    return value + '家';
                },
            },
            // data: information.value.dataArray,
            data: [],
        },
    ],
    series: [
        {
            type: "bar",
            barWidth: 10, // 柱子宽度
            MaxSize: 0,
            showBackground: true,
            backgroundStyle: {
                color: "rgb(10, 51, 126)",
                borderRadius: 5, //设置背景的圆角
            },
            // data: information.value.dataArray.map((item) => {
            //     return {
            //         value: item,
            //         itemStyle: {
            //             borderRadius: 5,
            //             color: information.value.color,
            //         },
            //     };
            // }),
            data: [],
        },
        {
            type: 'scatter',
            emphasis: {
                scale: false
            },
            symbol: 'rect',
            itemStyle: {
                barBorderRadius: [30, 0, 0, 30],
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 1,
                borderWidth: 1,
                opacity: 1
            },
            symbolSize: [4, 10], // 进度条白点的大小
            z: 2,
            // data: information.value.dataArray,
            data: [],
        },
    ],
});

</script>

<style scoped lang="scss">

</style>