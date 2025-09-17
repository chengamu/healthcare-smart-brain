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
        
        // 使用医疗健康主题渐变色
        const colors = [
            ['#30DCFF', '#00FF88'], // 医疗蓝到生物绿
            ['#00FF88', '#8B5CF6'], // 生物绿到制药紫
            ['#8B5CF6', '#30DCFF'], // 制药紫到医疗蓝
            ['#30DCFF', '#00FF88'], 
            ['#00FF88', '#8B5CF6']
        ];
        
        option.value.series[0].data = data.map((item, index) => {
            return {
                value: item.count,
                itemStyle: {
                    borderRadius: [0, 8, 8, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: colors[index][0] },
                        { offset: 1, color: colors[index][1] }
                    ]),
                    shadowColor: colors[index][0],
                    shadowBlur: 10,
                    shadowOffsetX: 2
                },
            };
        })
        option.value.series[1].data = data.map(it => it.count)
    });
}

const option = ref({
    tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#30DCFF',
        borderWidth: 1,
        textStyle: {
            color: '#ffffff',
            fontSize: 12
        },
        formatter: function(params) {
            return `${params[0].name}: ${params[0].value}家企业`;
        }
    },
    grid: {
        left: "8%",
        right: "8%",
        top: "5%",
        bottom: "5%",
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
            data: [],
            axisLabel: {
                color: "rgba(255, 255, 255, 0.9)",
                margin: 15,
                formatter: (name, index) => {
                    const id = index + 1;
                    const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#30DCFF', '#00FF88'];
                    const color = colors[index] || '#ffffff';
                    return `{id|${id}}{nameStyle|${name}}`;
                },
                rich: {
                    id:{
                        padding: [2, 6, 2, 6],
                        fontSize: 14,
                        color: '#000000',
                        backgroundColor: '#30DCFF',
                        borderRadius: 10,
                        fontWeight: 'bold'
                    },
                    nameStyle: {
                        padding: [0, 0, 0, 10],
                        fontSize: 14,
                        color: '#ffffff',
                        fontWeight: '500'
                    }
                },
            },
        },
        {
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
                color: "#00FF88",
                fontSize: 14,
                margin: 20,
                fontWeight: 'bold',
                formatter: function (value) {
                    return value + '家';
                },
            },
            data: [],
        },
    ],
    series: [
        {
            type: "bar",
            barWidth: 16,
            MaxSize: 0,
            showBackground: true,
            backgroundStyle: {
                color: "rgba(48, 220, 255, 0.1)",
                borderRadius: [0, 8, 8, 0],
            },
            data: [],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        },
        {
            type: 'scatter',
            emphasis: {
                scale: false
            },
            symbol: 'circle',
            itemStyle: {
                color: '#ffffff',
                shadowColor: '#30DCFF',
                shadowBlur: 8,
                borderWidth: 2,
                borderColor: '#30DCFF',
                opacity: 0.9
            },
            symbolSize: 8,
            z: 3,
            data: [],
            animationDuration: 2500,
            animationDelay: 500
        },
    ],
});

</script>

<style scoped lang="scss">

</style>