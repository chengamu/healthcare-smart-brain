<template>
  <div class="left-card">
    <m-card title="金融资本助力">
      <v-chart ref="vChart" :option="option" :autoresize="true" />
    </m-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

const option = ref({
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: {
    type: 'sankey',
    layout: 'none',
    emphasis: {
      focus: 'adjacency'
    },
    data: [
      {
        name: '龙磐基金'
      },
      {
        name: '415X'
      },
      {
        name: '辰德资本'
      },
      {
        name: '国科资本'
      },
      {
        name: '景岳堂'
      },
      {
        name: '先声诊断'
      },
      {
        name: '美年大健康'
      },
      {
        name: '美年甄选'
      },
    ],
    links: [
      {
        source: '龙磐基金',
        target: '景岳堂',
        value: 5
      },
      {
        source: '龙磐基金',
        target: '先声诊断',
        value: 3
      },
      {
        source: '415X',
        target: '美年大健康',
        value: 1
      },
      {
        source: '415X',
        target: '美年甄选',
        value: 2
      },
      {
        source: '辰德资本',
        target: '美年大健康',
        value: 1
      },
      {
        source: '辰德资本',
        target: '美年甄选',
        value: 2
      },
      {
        source: '国科资本',
        target: '美年大健康',
        value: 1
      },
      {
        source: '国科资本',
        target: '美年甄选',
        value: 2
      }
    ],
    lineStyle: {
      color: 'gradient',
      curveness: 0.5
    }
  }
})
</script>

<style scoped lang="scss">

</style>