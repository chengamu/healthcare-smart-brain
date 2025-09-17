<template>
    <div class="right-card">
        <m-card title="一类新药研发进度">
            <div class="population-proportion">
                <div class="population-proportion-chart">
                    <v-chart ref="vChart" :option="option" :autoresize="true" />
                    <div class="label-name">研发进度</div>
                </div>
                <div class="pie-legend">
                    <div class="pie-legend-item" v-for="(item, index) in state.pieData" :key="index">
                        <div class="icon" :style="{ borderColor: state.pieDataColor[index] }"></div>
                        <div class="name">{{ item.name }}</div>
                        <div class="value">{{ item.value }}<span class="unit">个</span></div>
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
import {countDrugByPhase} from "@/api/brain.js";

const emit = defineEmits(['update:drugData'])

const drugData = ref('')

const state = reactive({
    pieDataColor: ["#30DCFF", "#00FF88", "#8B5CF6", "#FFD700", "#FF6B6B"],
    pieData: [
        {
            name: "I期",
            value: 1,
        },
        {
            name: "II期",
            value: 1,
        },
        {
            name: "III期",
            value: 1,
        },
        {
            name: "获批",
            value: 1,
        },
    ],
})

onMounted(() => {
    init()
})

async function init() {
    await getCountDrugByPhase()
}

async function getCountDrugByPhase() {
    try {
        const response = await countDrugByPhase()
        state.pieData = response.data.map((it, index) => {
            option.value.series[0].data[index].value = it.count
            option.value.series[0].data[index].name = it.dictLabel
            return {
                name: it.dictLabel,
                value: it.count
            }
        })
        // 计算所有pieData的value总和并赋值给drugData
        drugData.value = state.pieData.reduce((total, item) => total + item.value, 0)
        emit('update:drugData', drugData.value)
    } catch (error) {
        console.error('获取创新药数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}
const option = ref({
    animationDuration: 2000,
    animationEasing: 'cubicOut',
    tooltip: {
        trigger: "item",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderWidth: 1,
        borderColor: "#30DCFF",
        textStyle: {
            color: "#ffffff",
            fontSize: 12,
        },
        formatter: function(params) {
            const percent = params.percent.toFixed(1);
            return `<div style="font-weight: bold; margin-bottom: 5px;">${params.name}</div>
                     <div>数量: <span style="color: ${params.color}; font-weight: bold;">${params.value}个</span></div>
                     <div>占比: <span style="color: #30DCFF; font-weight: bold;">${percent}%</span></div>`;
        }
    },

    series: [
        {
            name: "一类新药研发进度",
            type: "pie",
            itemStyle: {
                borderWidth: 3,
                borderColor: "rgba(0, 0, 0, 0.8)",
            },
            label: { show: false },
            radius: ["55%", "70%"],
            emphasis: {
                itemStyle: {
                    shadowBlur: 15,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(48, 220, 255, 0.6)'
                },
                scale: true,
                scaleSize: 5
            },
            animationDuration: 2000,
            animationEasing: 'cubicOut',

            data: [
                {
                    value: 1,
                    name: "I期",
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                            { offset: 0, color: "#30DCFF" },
                            { offset: 0.5, color: "#20B2FF" },
                            { offset: 1, color: "#1A90FF" },
                        ]),
                        shadowColor: '#30DCFF',
                        shadowBlur: 8
                    },
                },
                {
                    value: 1,
                    name: "II期",
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                            { offset: 0, color: "#00FF88" },
                            { offset: 0.5, color: "#00E077" },
                            { offset: 1, color: "#00C266" },
                        ]),
                        shadowColor: '#00FF88',
                        shadowBlur: 8
                    },
                },
                {
                    value: 1,
                    name: "III期",
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                            { offset: 0, color: "#8B5CF6" },
                            { offset: 0.5, color: "#7C3AED" },
                            { offset: 1, color: "#6D28D9" },
                        ]),
                        shadowColor: '#8B5CF6',
                        shadowBlur: 8
                    },
                },
                {
                    value: 1,
                    name: "获批",
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                            { offset: 0, color: "#FFD700" },
                            { offset: 0.5, color: "#FFB700" },
                            { offset: 1, color: "#FF9500" },
                        ]),
                        shadowColor: '#FFD700',
                        shadowBlur: 8
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
            font-size: 14px;
            color: #30DCFF;
            font-weight: bold;
            text-shadow: 0 0 8px rgba(48, 220, 255, 0.6);
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
        
        .pie-legend-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            
            .icon {
                width: 12px;
                height: 12px;
                border-radius: 2px;
                margin-right: 8px;
                border: 2px solid;
            }
            
            .name {
                flex: 1;
                font-size: 14px;
                color: #30DCFF;
                font-weight: 500;
                text-shadow: 0 0 6px rgba(48, 220, 255, 0.4);
                margin-right: 10px;
            }
            
            .value {
                font-size: 16px;
                font-weight: bold;
                color: #ffffff;
                text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
                
                .unit {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.7);
                    margin-left: 2px;
                }
            }
        }
    }
}
</style>