<template>
    <div class="right-card">
        <m-card title="强化理论学习">
            <v-chart ref="vChart" :option="option" :autoresize="true" />
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

// 注册词云图插件
import "echarts-wordcloud";

// 词云图数据
const data = [
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
]

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
    data: data.sort(function (a, b) {
      return b.value - a.value;
    })
  }]
})
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