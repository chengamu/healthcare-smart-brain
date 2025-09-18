<template>
    <div class="left-card">
        <m-card :title="title">
            <div style="width: 100%; height: 100%;">
                <v-chart
                    v-if="chartReady"
                    ref="vChart"
                    :option="option"
                    :autoresize="true"
                    style="width: 100%; height: 100%;"
                />
            </div>
        </m-card>
    </div>
</template>
<script setup>
import {ref, onMounted, nextTick, computed} from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"
import {listFundDataAll, listFundTypeAll} from "@/api/brain.js";

const props = defineProps({
    title: {
        type: String,
        default: '产业规模增长曲线'
    },
})

const cygmTypeId = ref('')
const jhztzTypeId = ref('')

const xAxisData = ref([])
const yAxisData = ref([])
const chartReady = ref(false)

onMounted(() => {
    init()
})

async function init() {
    await getListFundTypeAll()
    await getListFundDataAll(cygmTypeId.value, 0)
    await getListFundDataAll(jhztzTypeId.value, 1)
    // 数据加载完成后刷新图表
    chartReady.value = true
    await nextTick()
    // 图表会在v-if条件满足后自动渲染，无需手动调用setOption
}

async function getListFundTypeAll() {
    try {
        const response = await listFundTypeAll()
        cygmTypeId.value = response.find(it => it.code === 'cygm').id;
        jhztzTypeId.value = response.find(it => it.code === 'jhztz').id;
    } catch (error) {
        console.error('获取资金类型数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

async function getListFundDataAll(id, index) {
    try {
        const response = await listFundDataAll({fundTypeId: id})
        xAxisData.value = response.map(it => it.year);
        if (!yAxisData.value) yAxisData.value = []
        yAxisData.value[index] = response.map(it => it.value);
    } catch (error) {
        console.error(`获取资金数据失败 (id: ${id}, index: ${index}):`, error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

const option = computed(() => ({
    title: {
        text: "亿元",
        left: "8%",
        top: "12%",
        textStyle: {
            color: "#30DCFF",
            fontSize: 12,
            fontWeight: 'bold'
        },
    },
    grid: {
        left: "15%",
        top: "25%",
        width: "78%",
        height: "60%",
    },
    legend: {
        top: "8%",
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
        textStyle: {
            color: "#ffffff",
            fontSize: 13,
            fontWeight: '500'
        },
        data: [
            {
                name: "产业规模",
                itemStyle: { color: '#30DCFF' }
            },
            {
                name: "总投资",
                itemStyle: { color: '#00FF88' }
            }
        ],
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "line",
            lineStyle: {
                color: '#30DCFF',
                width: 2
            }
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderWidth: 1,
        borderColor: "#30DCFF",
        textStyle: {
            color: "#ffffff",
            fontSize: 12
        },
        formatter: function(params) {
            let result = `<div style="font-weight: bold; margin-bottom: 5px;">${params[0].axisValue}年</div>`;
            params.forEach(param => {
                result += `<div style="margin: 3px 0;">
                    <span style="display: inline-block; width: 10px; height: 10px; background: ${param.color}; border-radius: 50%; margin-right: 8px;"></span>
                    ${param.seriesName}: <span style="color: ${param.color}; font-weight: bold;">${param.value}亿元</span>
                </div>`;
            });
            return result;
        }
    },
    color: ["#30DCFF", "#00FF88"],
    xAxis: [
        {
            type: "category",
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(48, 220, 255, 0.3)",
                    width: 1
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
                fontSize: 11,
                interval: 0,
                fontWeight: '500'
            },
            data: xAxisData.value,
        }
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
                type: 'dashed',
                color: ["rgba(48, 220, 255, 0.2)"],
                width: 1,
            },
        },
        axisLabel: {
            color: "#ffffff",
            fontSize: 10,
            opacity: 0.8
        },
    },
    series: [
        {
            name: "产业规模",
            data: yAxisData.value[0],
            type: xAxisData.value.length === 1 ? "bar" : "line",
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            showSymbol: true,
            lineStyle: {
                width: 3,
                shadowColor: '#30DCFF',
                shadowBlur: 10
            },
            itemStyle: {
                color: '#30DCFF',
                borderColor: '#ffffff',
                borderWidth: 2,
                shadowColor: '#30DCFF',
                shadowBlur: 8
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(48, 220, 255, 0.3)' },
                    { offset: 1, color: 'rgba(48, 220, 255, 0.05)' }
                ])
            },
            emphasis: {
                focus: "series",
                itemStyle: { 
                    color: "#ffffff",
                    borderColor: '#30DCFF',
                    shadowBlur: 15
                },
            },
            label: {
                show: true,
                position: "top",
                distance: 8,
                color: "#30DCFF",
                fontSize: 10,
                fontWeight: 'bold',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: [2, 4],
                borderRadius: 3
            },
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        },
        {
            name: "总投资",
            data: yAxisData.value[1],
            type: xAxisData.value.length === 1 ? "bar" : "line",
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            showSymbol: true,
            lineStyle: {
                width: 3,
                shadowColor: '#00FF88',
                shadowBlur: 10
            },
            itemStyle: {
                color: '#00FF88',
                borderColor: '#ffffff',
                borderWidth: 2,
                shadowColor: '#00FF88',
                shadowBlur: 8
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(0, 255, 136, 0.3)' },
                    { offset: 1, color: 'rgba(0, 255, 136, 0.05)' }
                ])
            },
            emphasis: {
                focus: "series",
                itemStyle: { 
                    color: "#ffffff",
                    borderColor: '#00FF88',
                    shadowBlur: 15
                },
            },
            label: {
                show: true,
                position: "top",
                distance: 8,
                color: "#00FF88",
                fontSize: 10,
                fontWeight: 'bold',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: [2, 4],
                borderRadius: 3
            },
            animationDuration: 2000,
            animationDelay: 500,
            animationEasing: 'cubicOut'
        },
    ],
}));

</script>

<style lang="scss"></style>