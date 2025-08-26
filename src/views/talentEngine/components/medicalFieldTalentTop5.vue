<template>
    <div class="right-card">
        <m-card title="医疗领域人才TOP5">
            <v-chart ref="vChart" :option="option" :autoresize="true" />
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const information = {
    color: "#069DFD",
    area: ["药学", "免疫学", "肿瘤学", "医疗影像", "医疗器械"],
    dataArray: [20, 15, 10, 8, 5],
};

const style = {
    width: 32,
    height: 24,
    padding: [5, 6, 0, 0],
    fontSize: 20,
    align: "center",
    color: "#ffffff"
}

const option = {
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
            data: information.area,
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
                color: "#59c5c6",
                fontSize: 20,
                margin: 20,
                formatter: function (value) {
                    return value+'人';
                },
            },
            data: information.dataArray,
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
            data: information.dataArray.map((item) => {
                return {
                    value: item,
                    itemStyle: {
                        borderRadius: 5,
                        color: information.color,
                    },
                };
            }),
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
            data: [20, 15, 10, 8, 5],
        },
    ],
};

</script>

<style scoped lang="scss">

</style>