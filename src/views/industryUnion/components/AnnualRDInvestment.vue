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
import {ref, onMounted, onBeforeUnmount, nextTick, computed} from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"
import {listFundDataAll, listFundTypeAll} from "@/api/brain.js";

const props = defineProps({
    title: {
        type: String,
        default: "年R&D投入",
    },
})

const emit = defineEmits(['update:yftrTypeData'])

const yftrTypeId = ref('')

const xAxisData = ref([])
const yAxisData = ref([])
const chartReady = ref(false)

const yftrTypeData = ref('')

onMounted(() => {
    init()
})

async function init() {
    await getListFundTypeAll()
    await getListFundDataAll(yftrTypeId.value, 0)
    // 数据加载完成后刷新图表
    chartReady.value = true
    await nextTick()
    // 图表会在v-if条件满足后自动渲染，无需手动调用setOption
}

async function getListFundTypeAll() {
    try {
        const response = await listFundTypeAll()
        yftrTypeId.value = response.find(it => it.code === 'yftr').id;
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
        yftrTypeData.value = response[response.length - 1].value
        // 通过emit将数据传递给父组件
        emit('update:yftrTypeData', yftrTypeData.value)
    } catch (error) {
        console.error(`获取资金数据失败 (id: ${id}, index: ${index}):`, error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

const option = computed(() => ({
    title: {
        text: "亿元",
        left: "5%",
        top: "8%",
        textStyle: {
            color: "#30DCFF",
            fontSize: 12,
            fontWeight: 'bold'
        },
    },
    grid: {
        left: "12%",
        top: "25%",
        width: "82%",
        height: "55%",
    },
    legend: {
        top: "4%",
        icon: "circle",
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
            color: "#30DCFF",
            fontSize: 14,
            lineHeight: 20,
            fontWeight: 'bold'
        },
        data: ["年R&D投入"],
    },

    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "line",
            lineStyle: {
                color: "#30DCFF",
                width: 2,
                type: "solid"
            },
            shadowStyle: {opacity: 0.2},
        },
        backgroundColor: "rgba(0,0,0,0.85)",
        borderWidth: 2,
        borderColor: "#30DCFF",
        borderRadius: 8,
        padding: [12, 16],
        textStyle: {
            color: "#ffffff",
            fontSize: 13,
            lineHeight: 18,
            fontWeight: 'normal'
        },
        formatter: function(params) {
            if (params && params.length > 0) {
                const data = params[0];
                return `
                    <div style="font-weight: bold; color: #30DCFF; margin-bottom: 8px; font-size: 14px;">
                        ${data.axisValue}年 R&D投入情况
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 4px;">
                        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #30DCFF; margin-right: 8px;"></span>
                        <span style="color: #ffffff;">R&D投入金额：</span>
                        <span style="color: #00FF88; font-weight: bold; margin-left: 4px;">${data.value} 亿元</span>
                    </div>
                    <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(48, 220, 255, 0.3); font-size: 11px; color: rgba(255, 255, 255, 0.7);">
                        数据来源：绍兴医疗健康产业大脑
                    </div>
                `;
            }
            return '';
        },
        extraCssText: 'box-shadow: 0 8px 25px rgba(48, 220, 255, 0.3);'
    },
    color: ["#6BC7F6", "#44E6A2"],
    xAxis: [
        {
            type: "category",

            axisLine: {
                show: false,
                lineStyle: {
                    color: "#435459",
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                color: "#30DCFF",
                fontSize: 12,
                interval: 0,
                padding: [0, 0, 0, 0],
                fontWeight: '500'
            },
            data: xAxisData.value,
        },
        {
            axisLine: {
                show: false,
                lineStyle: {
                    color: "rgba(0,0,0,0)",
                },
            },
            data: [],
        },
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
                type: [2, 2],
                dashOffset: 5,
                color: ["rgba(255, 255, 255, 1)"],
                opacity: 1,
                width: 0.3,
            },
        },
        axisLabel: {
            color: "#30DCFF",
            fontSize: 11,
            fontWeight: '500'
        },
    },
    series: [
        {
            name: "年R&D投入",
            data: yAxisData.value[0],
            type: xAxisData.value.length === 1 ? "bar" : "line",
            smooth: true,
            symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ5JREFUOE+1la1OQ0EQRs8kCFIQdVCCxIBpCK1AInkDHC+B4QkwvASub4GsaE0NGCRpKhGFVDQZ+Mjem9vNbkphmWTMfjNnd3b2x0iYuxuwH7wNbIewBfAGzORm5nG6ElfM3QU6AXZSkzXG3oEnMxO8thWgux8DR2tAsfxiZs/VYA38Jazi1NBvYCizv+HK4vCRyrfQgIsf7Nm6+bSnjwIeAGeZaGnXQDfoE+ABmGbixwKeAoeJAMHuv3w30ubATQb6KqDKjZPEuAXOMysZAncJbS7gJbCVEAdAKwP8AK4S2vJfgMVLLt6UDtAreWx0W8od7OJXryq16OPwR2j6+WpAyz2wDagape7vARt9AZ+G3HmhiKS3xwAAAABJRU5ErkJggg==",
            symbolSize: 10,
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
            xAxisIndex: 1,
            z: 3,
            // 设置高亮样式
            emphasis: {
                focus: "none",
                itemStyle: {color: "white"},
            },
            label: {
                show: true,
                position: "top",
                distance: 10,
                color: "#ffffff",
                fontSize: 8,
            },

            lineStyle: {
                shadowColor: "rgba(115, 208, 255, 1)",
                shadowBlur: 20,
                shadowOffsetY: 0,
                width: 1,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: "rgba(115, 208, 255, 1)",
                    },
                    {
                        offset: 1,
                        color: "rgba(18,60,98,1)",
                    },
                ]),
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: "rgba(25, 255, 236, 0.4)",
                    },
                    {
                        color: "rgba(51, 153, 255, 0)",
                        offset: 1,
                    },
                ]),
            },
        },
    ],
}))
</script>

<style scoped lang="scss">

</style>