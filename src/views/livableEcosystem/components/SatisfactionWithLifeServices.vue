<template>
    <div :class="`${position}-card`">
        <m-card :title="title">
            <div class="satisfaction-container">
                <div class="satisfaction-chart-container">
                    <v-chart ref="vChart" :option="option" :autoresize="true"/>
                </div>
                <div class="pie-legend satisfaction-label-container">
                    <div class="pie-legend-item" v-for="(item, index) in data" :key="index">
                        <div class="icon" :style="{ borderColor: item.color }"></div>
                        <div class="name">{{ item.name }}</div>
                        <div class="value">{{ item.value }}<span class="unit">%</span></div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, nextTick} from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const props = defineProps({
    title: {
        type: String,
        default: "生活服务满意度"
    },
    position: {
        type: String,
        default: "right"
    }
});

const colors = ref([
    ['#00BFFF', '#48D1CC'], // 蓝-青
    ['#48D1CC', '#98FB98'], // 青-绿
    ['#8A2BE2', '#00BFFF'], // 紫-蓝
    ['#F9D423', '#FFA500'], // 黄-橙
]);

const data = ref([
    {name: '人才公寓', value: 94.95, color: colors.value[0]},
    {name: '商业配套', value: 69.40, color: colors.value[1]},
    {name: '医疗服务', value: 71.55, color: colors.value[2]},
    {name: '交通便利度', value: 99.68, color: colors.value[3]},
]);

const option = ref({
    backgroundColor: 'transparent',
    angleAxis: {
        type: 'category',
        data: data.value.map(item => item.name),
        axisLine: {show: false}, axisTick: {show: false},
        axisLabel: {show: false}, splitLine: {show: false}
    },
    radiusAxis: {
        max: 100,
        axisLine: {show: false}, axisTick: {show: false},
        axisLabel: {show: false},
        splitLine: {
            show: true,
            lineStyle: {color: 'rgba(0, 191, 255, 0.2)', type: 'solid'}
        }
    },
    polar: {
        radius: '70%',
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(0, 191, 255, 0.02)', 'rgba(0, 191, 255, 0.05)']
            }
        }
    },
    series: [
        {
            type: 'bar',
            data: data.value.map((item, index) => ({
                value: item.value,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {offset: 0, color: item.color[1]},
                        {offset: 1, color: item.color[0]}
                    ]),
                    shadowBlur: 20,
                    shadowColor: item.color[0]
                }
            })),
            coordinateSystem: 'polar',
            label: {show: false},
            barWidth: 15,
            roundCap: true,
            animation: true,
            animationDuration: 1500,
            animationEasing: 'cubicOut'
        },
        {
            type: 'bar',
            data: [100, 100, 100, 100, 100],
            coordinateSystem: 'polar',
            name: '内圈',
            stack: 'a',
            silent: true,
            itemStyle: {
                color: 'rgba(0, 191, 255, 0.1)',
                borderColor: 'rgba(0, 191, 255, 0.3)',
                borderWidth: 1
            },
            barWidth: 35,
        }
    ]
})

let rotationTimer = null;
let startAngle = 0;

const startRotation = () => {
    rotationTimer = setInterval(() => {
        startAngle += 0.5;
        if (startAngle >= 360) startAngle = 0;
        option.value.angleAxis.startAngle = startAngle;
    }, 50);
};

const stopRotation = () => {
    if (rotationTimer) {
        clearInterval(rotationTimer);
        rotationTimer = null;
    }
};

onMounted(() => {
    startRotation();
});

onBeforeUnmount(() => {
    stopRotation();
});
</script>

<style lang="scss">
.satisfaction-container {
    width: 100%;
    height: 100%;
    display: flex;
}

.satisfaction-chart-container {
    height: 100%;
    width: 50%;
}

.satisfaction-label-container {
    height: 100%;
    width: 50%;
    box-sizing: border-box;
}
</style>