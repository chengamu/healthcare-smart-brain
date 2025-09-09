<template>
    <div class="left-card">
        <m-card title="顶尖专家引进目标">
            <v-chart ref="vChart" :option="option" :autoresize="true" />
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch, defineProps } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

// 定义组件属性
const props = defineProps({
    talentData: {
        type: Array,
        default: () => []
    }
})

const maxValue = 50
const startAngle = 225

// 计算属性，根据props.talentData计算相关值
const gaugeVal = computed(() => {
    if (Array.isArray(props.talentData)) {
        return props.talentData.length || 0
    }
    return props.talentData || 0
})

const topBarVal = computed(() => {
    return (gaugeVal.value / maxValue) * 270
})

const gaugeMaxVal = computed(() => maxValue)

function seriesHandle() {
    const barWidth = 15
    const yhAngle = 232
    
    //上层圆环
    const topyh = {
        type: 'bar',
        barWidth: barWidth,
        data: [
            {
                value: topBarVal.value,
                itemStyle: {
                    color: '#1598FF'
                }
            }
        ],
        barGap: '-100%',
        coordinateSystem: 'polar',
        roundCap: true,
        z: 10
    }
    
    //下层圆环，显示最大值
    const bottomyh = {
        type: 'bar',
        z: 8,
        hoverAnimation: false,
        barWidth: barWidth,
        data: [
            {
                value: 270,
                itemStyle: {
                    color: '#e5f5ff',
                    borderWidth: 4
                }
            }
        ],
        coordinateSystem: 'polar',
        roundCap: true,
        emphasis: { disabled: true }
    }
    
    // 圆环的边框
    const borderyh = [
        {
            type: 'pie',
            z: 6,
            radius: ['90%', '78%'],
            center: ['50%', '50%'],
            startAngle: yhAngle,
            endAngle: yhAngle + 76,
            data: [
                {
                    value: 1,
                    itemStyle: {
                        borderRadius: 10,
                        color: '#ffffff'
                    }
                }
            ],
            emphasis: { scale: false }
        },
        {
            type: 'pie',
            z: 4,
            radius: ['92%', '76%'],
            center: ['50%', '50%'],
            startAngle: yhAngle + 2,
            endAngle: yhAngle + 74,
            data: [
                {
                    value: 1,
                    itemStyle: {
                        borderRadius: 10,
                        color: '#e8f7fc'
                    }
                }
            ],
            emphasis: { scale: false }
        }
    ]
    
    //仪表盘
    const gauge = {
        type: 'gauge',
        z: 8,
        startAngle: 225,
        endAngle: -45,
        radius: '35%',
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitLabel: {
            show: false
        },
        pointer: {
            shadowColor: 'auto',
            shadowBlur: 2,
            length: '20%',
            width: 3
        },
        itemStyle: {
            color: '#1598FF',
            borderColor: '#1598FF',
            borderWidth: 30
        },
        data: [gaugeVal.value / gaugeMaxVal.value * 100],
        detail: {
            show: false
        }
    }
    
    //指针外环
    const zzOut = {
        type: 'pie',
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['10%', '31%'],
        z: 6,
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        data: [
            {
                value: 20,
                itemStyle: {
                    color: '#e4f6fb'
                }
            }
        ]
    }
    
    //指针内环
    const zzIn = {
        type: 'pie',
        emphasis: { scale: 0 },
        legendHoverLink: false,
        radius: ['0%', '25%'],
        z: 10,
        label: {
            show: true
        },
        labelLine: {
            show: false
        },
        data: [
            {
                value: 100,
                label: {
                    show: true,
                    position: 'center',
                    fontSize: 8,
                    fontWeight: 'bold',
                    formatter: function () {
                        return `{total|${gaugeVal.value}/${gaugeMaxVal.value}}`
                    },
                    rich: {
                        total: {
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#ffffff'
                        }
                    }
                },
                itemStyle: {
                    color: '#0098ff'
                }
            }
        ]
    }
    
    return [topyh, bottomyh, ...borderyh, gauge, zzOut, zzIn]
}

const title = computed(() => [
    {
        text: '顶尖专家',
        bottom: '10%',
        x: 'center',
        padding: [3, 7],
        textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#1598FF'
        }
    }
])

const angleAxis = {
    show: false,
    max: 360,
    type: 'value',
    startAngle,
    splitLine: { show: false }
}

const option = computed(() => ({
    title: title.value,
    angleAxis,
    barMaxWidth: 15,
    radiusAxis: { show: false, type: 'category' },
    polar: {
        center: ['50%', '50%'],
        radius: '167.5%'
    },
    series: seriesHandle()
}))

</script>

<style scoped lang="scss">

</style>