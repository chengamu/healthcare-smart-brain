<template>
    <div class="right-card">
        <m-card title="项目引进情况">
            <v-chart ref="vChart" :option="option" :autoresize="true"/>
        </m-card>
    </div>
</template>
<script setup>
import {ref, onMounted, onBeforeUnmount, nextTick, computed} from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import {useGetConfigKey} from '@/hooks/useGetConfigKey'
import VChart from "vue-echarts"

const {
    configValue: xmyjqk,
    getConfigKeyFunc: fetchXmyjqk
} = useGetConfigKey('brain.industryCluster.xmyjqk')

const colorMap = ref({
    '50亿元以上': '#30DCFF', // 医疗蓝
    '10亿元以上': '#00FF88', // 生物绿
    '亿元以上': '#8B5CF6',  // 制药紫
    '银发企业关联度': '#F2C55C',  // 黄
});

const data = ref({
    'xAxis': [],
    'yAxis': {
        '50亿元以上': [],
        '5亿元以上': [],
        '亿元以上': [],
        '银发企业关联度': []
    }
})

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchXmyjqk(),
    ])

    try {
        const parsedData = JSON.parse(xmyjqk.value)
        data.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        data.value = {
            'xAxis': ['2024', '2025'],
            'yAxis': {
                '50亿元以上': [1, 0],
                '5亿元以上': [2, 0],
                '亿元以上': [6, 7],
                '银发企业关联度': [47, 55],
            }
        }
    }
}

const option = computed(() => ({
    animationDuration: 2000,
    animationEasing: 'cubicOut',
    grid: {
        left: "15%",
        top: "25%",
        width: "70%",
        height: "60%",
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
            fontSize: 12,
        },
        formatter: function (params) {
            let result = `<div style="font-weight: bold; margin-bottom: 5px;">${params[0].axisValue}年</div>`;
            let total = 0;
            params.forEach(param => {
                if(param.seriesName !== '银发企业关联度') {
                    total += param.value;
                }
                let unit = param.seriesName === '银发企业关联度' ? '%' : '个';
                result += `<div style="margin: 3px 0;">
          <span style="display: inline-block; width: 10px; height: 10px; background: ${param.color}; border-radius: 2px; margin-right: 8px;"></span>
          ${param.seriesName}: <span style="color: ${param.color}; font-weight: bold;">${param.value}${unit}</span>
        </div>`;
            });
            if(total > 0) {
                result += `<div style="margin-top: 8px; padding-top: 5px; border-top: 1px solid #30DCFF;">
        <span style="font-weight: bold; color: #30DCFF;">总计: ${total}个项目</span>
      </div>`;
            }
            return result;
        }
    },
    legend: {
        top: "4%",
        right: "8%",
        icon: "rect",
        itemWidth: 12,
        itemHeight: 8,
        itemGap: 15,
        textStyle: {
            color: "#ffffff",
            fontSize: 12,
            fontWeight: '500'
        },
        data: Object.keys(data.value.yAxis)
    },
    xAxis: [
        {
            type: "category",
            interval: 0,
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
            data: data.value.xAxis,
        }
    ],
    yAxis: [
        {
            type: "value",
            name: '项目数量(个)',
            nameTextStyle: {
                color: "#30DCFF",
                fontSize: 12,
            },
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
        {
            type: "value",
            name: '关联度(%)',
            nameTextStyle: {
                color: "#30DCFF",
                fontSize: 12,
            },
            min: 0,
            max: 100,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                color: "#ffffff",
                fontSize: 10,
                opacity: 0.8
            },
        }
    ],
    series: Object.keys(data.value.yAxis).map((name, index) => {
        const colors = ['#30DCFF', '#00FF88', '#8B5CF6'];
        const isTopStack = index === Object.keys(data.value.yAxis).length - 2; // 考虑到银发企业关联度是最后一个
        const isLineChart = name === '银发企业关联度';
        
        if(isLineChart) {
            return {
                name: name,
                type: 'line',
                yAxisIndex: 1, // 使用第二个Y轴
                data: data.value.yAxis[name],
                itemStyle: {
                    color: '#F2C55C',
                },
                lineStyle: {
                    color: '#F2C55C',
                    width: 3,
                },
                symbolSize: 8,
                symbol: 'circle',
                emphasis: {
                    itemStyle: {
                        color: '#ffffff',
                        borderColor: '#F2C55C',
                        borderWidth: 2,
                    },
                    lineStyle: {
                        width: 4,
                    }
                },
                label: {
                    show: true,
                    position: 'bottom',
                    color: '#F2C55C',
                    fontSize: 11,
                    fontWeight: 'bold',
                    formatter: function (params) {
                        return params.value + '%';
                    }
                },
                animationDuration: 2500,
                animationDelay: function (idx) {
                    return idx * 300 + index * 100;
                },
                animationEasing: 'elasticOut'
            }
        } else {
            return {
                name: name,
                type: 'bar',
                barWidth: 20,
                stack: 'total',
                data: data.value.yAxis[name],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: colors[index]},
                        {offset: 0.5, color: colors[index] + 'CC'},
                        {offset: 1, color: colors[index] + '80'}
                    ]),
                    borderRadius: isTopStack ? [6, 6, 0, 0] : 0,
                    shadowColor: colors[index],
                    shadowBlur: 12,
                    shadowOffsetY: 3,
                    borderWidth: 1,
                    borderColor: colors[index] + '40'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: colors[index],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: colors[index]},
                            {offset: 1, color: '#ffffff'}
                        ])
                    }
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: '#ffffff',
                    fontSize: 11,
                    fontWeight: 'bold',
                    textShadowColor: '#000000',
                    textShadowBlur: 3,
                    formatter: function (params) {
                        return params.value > 0 ? params.value : '';
                    }
                },
                animationDuration: 2500,
                animationDelay: function (idx) {
                    return idx * 300 + index * 100;
                },
                animationEasing: 'elasticOut'
            }
        }
    })
}))
</script>
<style lang="scss"></style>