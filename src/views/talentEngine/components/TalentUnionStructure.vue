<template>
    <div class="left-card">
        <m-card title="人才结构分布">
            <div class="population-proportion">
                <div class="population-proportion-chart">
                    <v-chart ref="vChart" :option="option" :autoresize="true" />
                    <div class="label-name">人才占比</div>
                </div>
                <div class="pie-legend">
                    <div class="pie-legend-item" v-for="(item, index) in state.pieData" :key="index">
                        <div class="icon" :style="{ borderColor: state.pieDataColor[index] }"></div>
                        <div class="name">{{ item.name }}</div>
                        <div class="value">{{ item.value }}<span class="unit">人</span></div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>
<script setup>
import {ref, reactive, onMounted, onBeforeUnmount, nextTick, watch} from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const props = defineProps({
    talentData: {
        type: Array,
        default: () => []
    }
})

const state = reactive({
    pieDataColor: ["#17E6C3", "#40CFFF", "#1979FF"],
    pieColor: [
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "rgba(3,65,128,1)" },
            { offset: 1, color: "rgba(115,208,255,1)" },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "rgba(11, 77, 44, 1)" },
            { offset: 1, color: "rgba(77, 255, 181, 1)" },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "rgba(117, 117, 117, 1)" },
            { offset: 1, color: "rgba(230, 230, 230, 1)" },
        ]),
    ],
    pieData: [],
})
const option = ref({
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            shadowStyle: { opacity: 0 },
        },
        backgroundColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        borderColor: "#999999",
        textStyle: {
            color: "#ffffff",
            fontSize: 10,
        },
    },

    series: [
        {
            name: "",
            type: "pie",
            itemStyle: {
                borderWidth: 5,
                borderColor: "rgba(26, 57, 77,1)",
            },
            label: { show: false },
            radius: ["55%", "70%"],
            color: ["#c487ee", "#deb140", "#49dff0"],

            data: [],
        },
    ],
})

watch(() => props.talentData, (newVal) => {
    if (newVal && Array.isArray(newVal)) {
        // 对 typeName 进行分类统计
        const typeMap = new Map();

        newVal.forEach(item => {
            const typeName = item.typeName || '未知类型';
            const count = 1;

            if (typeMap.has(typeName)) {
                typeMap.set(typeName, typeMap.get(typeName) + count);
            } else {
                typeMap.set(typeName, count);
            }
        });

        // 转换为数组格式并赋值给 state.pieData
        let index = 0;
        const pieData = Array.from(typeMap, ([name, value]) => {
            const itemStyle = {
                color: state.pieColor[index % state.pieColor.length]
            };
            index++;
            return { name, value, itemStyle };
        });
        state.pieData = pieData;

        // 更新图表数据
        if (option.value && option.value.series && option.value.series[0]) {
            nextTick(() => {
                option.value.series[0].data = pieData;
            });
        }
    }
}, { immediate: true });

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
            font-size: 12px;
            color: #c4e3fd;
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
    }
}
</style>
