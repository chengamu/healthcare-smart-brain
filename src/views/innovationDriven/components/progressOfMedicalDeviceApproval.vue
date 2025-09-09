<template>
    <div class="right-card">
        <m-card title="医疗器械获批进度">
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
import {ref, onMounted, computed, nextTick} from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"
import {listInstrumentAll} from "@/api/brain.js";

const emit = defineEmits(['update:instrumentData'])

const progressData = ref([
    {
        label: '二类器械获批', current: 3, goal: 15, unit: '个',
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {offset: 0, color: "rgba(3,65,128,1)"},
            {offset: 1, color: "rgba(115,208,255,1)"},
        ])
    },
    {
        label: '三类器械获批', current: 4, goal: 15, unit: '个',
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {offset: 0, color: "rgba(11, 77, 44, 1)"},
            {offset: 1, color: "rgba(77, 255, 181, 1)"},
        ])
    },
])

// 计算所有目标值中的最大值，用于统一x轴最大值
const maxGoal = ref(3)

// 根据最大goal值计算每条数据的新current值
const calculateAdjustedCurrent = (current, goal, maxGoal) => {
    // 按比例计算新的current值
    return (current / goal) * maxGoal
}

const option = computed(() => {
    return {
        grid: {
            left: "5%",
            top: "10%",
            width: "90%",
            height: "86%",
        },
        legend: {
            top: "8%",
            icon: "circle",
            itemWidth: 8,
            itemHeight: 8,
            textStyle: {
                color: "#90979c",
                fontSize: 12,
                lineHeight: 20,
            },
        },

        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                shadowStyle: {opacity: 0.2},
            },
            backgroundColor: "rgba(0,0,0,1)",
            borderWidth: 1,
            borderColor: "#999999",
            textStyle: {
                color: "#ffffff",
                fontSize: 10,
                lineHeight: 16,
            },
        },
        xAxis: [
            {
                type: "value",
                // 设置x轴最大值为所有目标值中的最大值，确保所有进度条对齐
                max: maxGoal.value,
                interval: maxGoal.value > 10 ? undefined : 1,

                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#407A80",
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    color: "#CFDAE6",
                    fontSize: 10,
                    interval: 0,
                },
            },
        ],

        yAxis: [
            {
                type: "category",
                inverse: true,
                axisLabel: {
                    color: "#CFDAE6",
                    fontSize: 10,
                    interval: 0,
                    show: false,
                    verticalAlign: "top",
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                data: progressData.value.map(it => it.label),
            },
            {
                inverse: true,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(0,0,0,0)",
                    },
                },
                data: [],
            },
        ],
        color: ["rgba(115,208,255,1)", "rgba(77, 255, 181, 1)", "rgba(230, 230, 230, 1)", "rgba(255, 200, 89, 1)"],
        series: [
            {
                data: progressData.value.map(it => {
                    return {
                        value: calculateAdjustedCurrent(it.current, it.goal, maxGoal.value),
                        itemStyle: {
                            color: it.color,
                        },
                    }
                }),
                type: "bar",
                barWidth: 7,
                yAxisIndex: 0,
                showBackground: false,
                z: 2,
                label: {
                    show: true,
                    position: "middle",
                    padding: [-18, 0, 0, 0],
                    color: "#16C1A6",
                    fontSize: 12,
                    formatter: (params) => {
                        const item = progressData.value[params.dataIndex];
                        return `{label|${item.label}}{value|${item.current} / ${item.goal} ${item.unit}}`;
                    },
                    rich: {
                        label: {
                            align: 'left',
                            width: 100
                        },
                        value: {
                            align: 'right',
                            width: 100
                        }
                    }
                },
                itemStyle: {
                    borderRadius: 0,
                    borderWidth: 2,
                    borderColor: "rgba(26, 57, 77,1)",
                },
            },
            {
                name: "",
                type: "bar",
                yAxisIndex: 1,
                barGap: "-100%",
                data: [maxGoal.value, maxGoal.value], // 添加单位信息
                barWidth: 10,
                z: 0,
                itemStyle: {
                    color: "none",
                    borderColor: "rgba(172,191,188,0.4)",
                    borderWidth: 1,
                    borderRadius: 0,
                },
            },
        ],
    }
})

const chartReady = ref(false)

const instrumentData = ref('')

onMounted(() => {
    init()
})

async function init() {
    await getListInstrumentAll()
    // 数据加载完成后刷新图表
    await nextTick()
    chartReady.value = true
    await nextTick()
}

async function getListInstrumentAll() {
    try {
        const response = await listInstrumentAll()
        progressData.value[0].current = response.filter(it => it.level === '2').length || 0
        progressData.value[1].current = response.filter(it => it.level === '3').length || 0
        maxGoal.value = Math.max(...progressData.value.map(item => item.goal))
        instrumentData.value = progressData.value[0].current + progressData.value[1].current
        emit('update:instrumentData', instrumentData.value)
    } catch (error) {
        console.error('获取平台数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

</script>

<style lang="scss"></style>