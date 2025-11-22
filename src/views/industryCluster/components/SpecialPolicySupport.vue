<template>
  <div class="right-card">
    <m-card title="企业规模形态">
      <div class="pie-chat-wrap">
        <div class="pie-chat">
          <m-pie
              ref="pie"
              :data="state.pieData"
              :delay="3000"
              :colors="state.pieDataColor"
              :opacity="0.6"
              class="pieCanvas"
          >
            <template v-slot:default="slotProps">
              <div class="pieCanvas-content">
                <div class="pieCanvas-content-value">
                  <mCountTo
                      :startVal="0"
                      :endVal="getNumber(slotProps)"
                      :decimals="2"
                      :duration="1000"
                      :autoplay="true"
                  ></mCountTo>
                  %
                </div>
                <div class="pieCanvas-content-name">
                  {{ slotProps.data.name }}
                </div>
              </div>
            </template>
          </m-pie>
        </div>

        <div class="pie-legend">
          <div class="pie-legend-item" v-for="(item, index) in state.pieData" :key="index">
            <div class="icon" :style="{ borderColor: state.pieDataColor[index] }"></div>
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}<span class="unit">家</span></div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from "vue"
import mCard from "@/components/mCard/index.vue"
import mPie from "@/components/mPie/index.vue"
import { useGetConfigKey } from '@/hooks/useGetConfigKey'
import mCountTo from "@/components/mCountTo/index.js"
import {countPolicyByType} from "@/api/brain.js";

const {
    configValue: qygmxt,
    getConfigKeyFunc: fetchQygmxt
} = useGetConfigKey('brain.industryCluster.qygmxt')

const pie = ref(null)
const state = reactive({
  pieDataColor: ["#30DCFF", "#00FF88", "#8B5CF6"],
  pieData: [
    {
      name: "产业化拿地项目",
      value: 8,
    },
    {
      name: "创新型租赁企业",
      value: 29,
    },
  ],
})

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchQygmxt(),
    ])

    try {
        const parsedData = JSON.parse(qygmxt.value)
        state.pieData = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        state.pieData = [
            {
                name: "产业化拿地项目",
                value: 8,
            },
            {
                name: "创新型租赁企业",
                value: 29,
            },
        ]
    }
    // await getCountPolicyByType()
}

function getCountPolicyByType() {
    return countPolicyByType().then(response => {
        state.pieData = response.data.filter(it =>it.dictLabel !== '人才落地').map((it, index) => {
            return {
                name: it.dictLabel,
                value: it.count
            }
        })
    });
}

function getNumber(slotProps) {
  return Number(((slotProps.data.value / slotProps.data.count) * 100).toFixed(2))
}


</script>
<style lang="scss" scoped>
.pie-chat-wrap {
  width: 100%;
  height: 100%;
  display: flex;
}
// 饼图
.pie-chat {
  pointer-events: all;
  position: relative;
  width: 236px;
  height: 100%;

  .pieCanvas {
    width: 100%;
    height: 100%;
    pointer-events: all;
  }
  .pieCanvas-content {
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 12px;
    &-value {
      font-size: 15px;
      font-weight: bold;
      text-shadow: 0 0 10px rgb(0 0 0);
    }
    &-name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
