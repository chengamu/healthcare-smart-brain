<template>
    <div class="right-card">
        <m-card title="医疗领域人才分布">
            <v-chart ref="vChart" :option="option" :autoresize="true" />
        </m-card>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, nextTick, watch} from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

// 注册词云图插件
import "echarts-wordcloud";

const props = defineProps({
    talentData: {
        type: Array,
        default: () => []
    }
})

// 词云图数据
const data = ref([
    { name: "不忘初心", value: 100 },
    { name: "高质量发展", value: 95 },
    { name: "新质生产力", value: 90 },
    { name: "牢记使命", value: 85 },
    { name: "艰苦奋斗", value: 80 },
    { name: "廉洁自律", value: 75 },
    { name: "为民服务", value: 70 },
    { name: "勇于担当", value: 65 },
    { name: "改革创新", value: 60 },
    { name: "团结协作", value: 55 },
    { name: "无私奉献", value: 50 },
    { name: "实事求是", value: 45 }
])

// 词云图配置选项
const option = ref({
    series: [{
        type: 'wordCloud',
        sizeRange: [12, 60],
        rotationRange: [-45, 45],
        rotationStep: 45,
        gridSize: 4,
        shape: 'circle',
        drawOutOfBound: false,
        layoutAnimation: true,
        textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
                return 'rgb(' + [
                    Math.round(Math.random() * 160 + 50),
                    Math.round(Math.random() * 160 + 50),
                    Math.round(Math.random() * 160 + 50)
                ].join(',') + ')';
            }
        },
        emphasis: {
            textStyle: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: data.value.sort(function (a, b) {
            return b.value - a.value;
        })
    }]
})

watch(() => props.talentData, (newVal) => {
    if (newVal && Array.isArray(newVal)) {
        // 对 typeName 进行分类统计
        const typeMap = new Map();

        newVal.forEach(item => {
            const typeName = item.development || '';
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
            return { name, value };
        });
        data.value = pieData;

        // 更新图表数据
        if (option.value && option.value.series && option.value.series[0]) {
            nextTick(() => {
                option.value.series[0].data = pieData;
            });
        }
    }
}, { immediate: true });
</script>

<style scoped lang="scss">
.right-card {
    height: 100%;
}

:deep(.echarts) {
    width: 100%;
    height: 100%;
}
</style>