<script setup>
import { ref, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"
import mCountTo from "@/components/mCountTo/index.js"

const kpiData = ref([
  { title: '产业规模', value: 500, unit: '亿', progress: 85 },
  { title: '计划总投资', value: 200, unit: '亿', progress: 70 },
  { title: '细分赛道项目', value: 30, unit: '+个', progress: 90 }
])

const showCards = ref([false, false, false])
const startCount = ref([false, false, false])
const progressPercents = ref([0, 0, 0])

onMounted(() => {
  // 依次显示卡片，每张卡片间隔400ms
  showCards.value.forEach((_, index) => {
    setTimeout(() => {
      showCards.value[index] = true
      // 延迟一点时间开始数字动画
      setTimeout(() => {
        startCount.value[index] = true
        // 同时开始进度条动画
        animateProgress(index)
      }, 500)
    }, index * 400)
  })
})

const animateProgress = (index) => {
  const target = kpiData.value[index].progress
  const duration = 2000 // 2秒内完成
  const startTime = Date.now()
  
  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1) * target
    progressPercents.value[index] = progress
    
    if (progress < target) {
      requestAnimationFrame(updateProgress)
    }
  }
  
  requestAnimationFrame(updateProgress)
}
</script>

<template>
  <div class="right-card">
    <m-card title="2030年核心总目标">
      <div class="kpi-flip-container">
        <div 
          v-for="(item, index) in kpiData" 
          :key="index"
          class="kpi-flip-card"
          :class="{ 'show': showCards[index] }"
        >
          <div class="kpi-value-wrapper">
            <div class="kpi-value">
              <mCountTo 
                v-if="startCount[index]"
                :startVal="0" 
                :endVal="item.value" 
                :duration="3000"
              />
              <span class="kpi-unit">{{ item.unit }}</span>
            </div>
          </div>
          <div class="kpi-title">{{ item.title }}</div>
          <div class="progress-container">
            <div 
              class="progress-bar" 
              :style="{ width: progressPercents[index] + '%' }"
            ></div>
          </div>
          <div class="progress-text">完成度: {{ Math.round(progressPercents[index]) }}%</div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<style scoped lang="scss">
.kpi-flip-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.kpi-flip-card {
  width: 30%;
  background: linear-gradient(135deg, rgba(26, 57, 77, 0.8), rgba(48, 220, 255, 0.15));
  border: 1px solid rgba(48, 220, 255, 0.5);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 12px;
  opacity: 0;
  transform: translateY(50px) rotateX(30deg);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;

  &.show {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(48, 220, 255, 0.6), rgba(48, 220, 255, 0.1));
    border-radius: 18px;
    z-index: -1;
  }
}

.kpi-value-wrapper {
  margin-bottom: 15px;
}

.kpi-value {
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 15px rgba(48, 220, 255, 0.8);
  
  :deep(.count-to-wrapper) {
    background: linear-gradient(to bottom, #fff, #a0eaff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 40px;
  }
}

.kpi-unit {
  font-size: 24px;
  color: #30DCFF;
  margin-left: 8px;
  font-weight: bold;
}

.kpi-title {
  font-size: 15px;
  color: #30DCFF;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 0 0 8px rgba(48, 220, 255, 0.6);
  white-space: nowrap;
  width: 100%;
}

.progress-container {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 8px;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #30DCFF, #00B1E9);
  border-radius: 5px;
  transition: width 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0 10px rgba(48, 220, 255, 0.6);
}

.progress-text {
  font-size: 14px;
  color: #30DCFF;
  font-weight: bold;
  text-shadow: 0 0 6px rgba(48, 220, 255, 0.6);
}
</style>