<script setup>
import { ref, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"
import mCountTo from "@/components/mCountTo/index.js"

const kpiData = ref([
  { title: '园区', value: 13, unit: '家' },
  { title: '研究院', value: 2, unit: '家' },
  { title: '专项基金', value: 3, unit: '支' },
  { title: '产业政策', value: 1, unit: '项' }
])

const showCards = ref([false, false, false, false])
const startCount = ref([false, false, false, false])

onMounted(() => {
  // 依次显示卡片，每张卡片间隔300ms
  showCards.value.forEach((_, index) => {
    setTimeout(() => {
      showCards.value[index] = true
      // 延迟一点时间开始数字动画
      setTimeout(() => {
        startCount.value[index] = true
      }, 500)
    }, index * 300)
  })
})
</script>

<template>
  <div class="left-card">
    <m-card title="发展基石" :height="300">
      <div class="kpi-matrix">
        <div 
          v-for="(item, index) in kpiData" 
          :key="index"
          class="kpi-card"
          :class="{ 'show': showCards[index] }"
        >
          <div class="kpi-value">
            <mCountTo 
              v-if="startCount[index]"
              :startVal="0" 
              :endVal="item.value" 
              :duration="2000"
            />
            <span class="kpi-unit">{{ item.unit }}</span>
          </div>
          <div class="kpi-title">{{ item.title }}</div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<style scoped lang="scss">
.kpi-matrix {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.kpi-card {
    background-image: url("@/assets/images/grandBlueprint/jigsaw.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  &:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }

  &:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
  }

  &:nth-child(3) {
    grid-column: 1;
    grid-row: 2;
  }

  &:nth-child(4) {
    grid-column: 2;
    grid-row: 2;
  }
}

.kpi-value {
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  text-shadow: 0 0 12px rgba(48, 220, 255, 0.8);
  
  :deep(.count-to-wrapper) {
    background: linear-gradient(to bottom, #fff, #a0eaff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 32px;
  }
}

.kpi-unit {
  font-size: 18px;
  color: #30DCFF;
  margin-left: 6px;
  font-weight: bold;
}

.kpi-title {
  font-size: 16px;
  color: #30DCFF;
  text-align: center;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(48, 220, 255, 0.6);
}
</style>