<template>
    <div class="right-card">
        <m-card title="人才公寓使用率">
            <v-chart ref="vChart" :option="option" :autoresize="true" />
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

function seriesHandle({ barWidth, topBarVal, yhAngle, gaugeVal, gaugeMaxVal }) {
    topyh.barWidth = barWidth
    topyh.data[0].value = topBarVal
    bottomyh.barWidth = barWidth
    borderyh[0].startAngle = yhAngle
    borderyh[0].endAngle = yhAngle + 76
    borderyh[1].startAngle = yhAngle + 2
    borderyh[1].endAngle = yhAngle + 74
    gauge.data = [gaugeVal]
    zzIn.data[0].label.formatter = function () {
        const percentage = Math.round((gaugeVal / gaugeMaxVal) * 100)
        return `{total|${percentage}%}`
    }
    const series = [topyh, bottomyh, ...borderyh, gauge, zzOut, zzIn]
    return series
}
const name = '使用率'
const value = 14
const maxValue = 50

// 起始角度
const startAngle = 225 // 360 - 90 - 45 // 225

// 仪表盘的值 指针的值 满级为100
const gaugeVal = value
const gaugeMaxVal = maxValue
// 圆环的宽度
const barWidth = 15
// 上层圆环  值为度数 满级为360, 但如果有偏移值 就以偏移后的总度数为准,我这里的总度数为270度
const topBarVal = (value / maxValue) * 270

const yhAngle = 232

const title = [
    {
        text: name,
        bottom: '10%',
        x: 'center',
        // borderColor: '#1598FF',
        // borderWidth: 1,
        // borderRadius: 15,
        // backgroundColor: 'green',
        padding: [3, 7],
        textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#1598FF'
        }
    }
]
const angleAxis = {
    show: false,
    max: 360, // (getmax * 360) / 270, //-45度到225度，二者偏移值是270度除360度
    type: 'value',
    startAngle, //极坐标初始角度 225  逆时针方向
    splitLine: { show: false }
}
//上层圆环
const topyh = {
    type: 'bar',
    barWidth: 0,
    data: [
        {
            value: 0, // 顺时针旋转的度数值
            itemStyle: {
                color: '#1598FF'
            }
        }
    ],
    barGap: '-100%', //柱间距离,上下两层圆环重合
    coordinateSystem: 'polar',
    roundCap: true, //顶端圆角
    z: 10 //圆环层级，同zindex
}
//下层圆环，显示最大值
const bottomyh = {
    type: 'bar',
    z: 8,
    hoverAnimation: false,
    barWidth: 0,
    data: [
        {
            value: 270, // getmax,
            itemStyle: {
                color: '#e5f5ff',
                // color: 'red',
                // opacity: 0.2,
                borderWidth: 4
            }
        }
    ],
    coordinateSystem: 'polar',
    roundCap: true,
    emphasis: { vdisabled: true }
}
// 圆环的边框
const borderyh = [
    {
        type: 'pie',
        z: 6,
        radius: ['90%', '78%'],
        center: ['50%', '50%'],
        // adjust the start and end angle
        startAngle: 0,
        endAngle: 0 + 80,
        data: [
            {
                value: 1,
                itemStyle: {
                    borderRadius: 10,
                    color: '#ffffff'
                    // color: 'pink'
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
        startAngle: 0,
        endAngle: 0,
        data: [
            {
                value: 1,
                itemStyle: {
                    borderRadius: 10,
                    color: '#e8f7fc'
                    // color: 'green'
                }
            }
        ],
        emphasis: { scale: false }
    }
]
// //仪表盘
const gauge = {
    type: 'gauge',
    z: 8,
    startAngle: 225, //起始角度，同极坐标
    endAngle: -45, //终止角度，同极坐标   根据起始角度，顺时针走动
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
        // 分隔线
        shadowColor: 'auto', //默认透明
        shadowBlur: 2,
        length: '20%',
        width: 3
    },
    itemStyle: {
        color: '#1598FF',
        borderColor: '#1598FF',
        borderWidth: 30
    },
    data: [],
    detail: {
        show: false
    }
}
//指针外环
const zzOut = {
    type: 'pie',
    // emphasis: { scale: 0 },
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
// //指针内环
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
                formatter: function () {},
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

const option = {
//   backgroundColor: 'yellow',
    title,
    angleAxis,
    barMaxWidth: 15, //圆环宽度
    radiusAxis: { show: false, type: 'category' },
    //圆环位置和大小
    polar: {
        center: ['50%', '50%'],
        radius: '167.5%'
    },
    series: seriesHandle({ barWidth, topBarVal, yhAngle, gaugeVal, gaugeMaxVal })
}

</script>

<style scoped lang="scss">

</style>