<script setup>
import { ref, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"
import mCountTo from "@/components/mCountTo/index.js"
import { listFundTypeAll, listFundDataAll } from "@/api/brain.js"
import gsap from "gsap"

const cygmTypeId = ref('')
const jhztzTypeId = ref('')

const kpiData = ref([
  { title: '产业规模', value: 500, unit: '亿', progress: 85, color: '#30DCFF', icon: '🏢' },
  { title: '计划总投资', value: 200, unit: '亿', progress: 70, color: '#00FF88', icon: '💰' },
  { title: '细分赛道项目', value: 30, unit: '+个', progress: 90, color: '#8B5CF6', icon: '🚀' }
])

const showCards = ref([false, false, false])
const startCount = ref([false, false, false])
const progressPercents = ref([0, 0, 0])
const cardRefs = ref([])

onMounted(() => {
    init()
})

async function init() {
    await getListFundTypeAll()
    await getListFundDataAll(cygmTypeId.value, 0)
    await getListFundDataAll(jhztzTypeId.value, 1)

    // 依次显示卡片，每张卡片间隔400ms
    showCards.value.forEach((_, index) => {
        setTimeout(() => {
            showCards.value[index] = true
            // 延迟一点时间开始数字动画
            setTimeout(() => {
                startCount.value[index] = true
                // 同时开始进度条动画
                animateProgress(index)
                // 添加爆发效果
                addBurstEffect(index)
            }, 500)
        }, index * 400)
    })
}

function getListFundTypeAll() {
    return listFundTypeAll().then(response => {
        cygmTypeId.value = response.find(it => it.code === 'cygm').id;
        jhztzTypeId.value = response.find(it => it.code === 'jhztz').id;
    });
}

function getListFundDataAll(id, index) {
    return listFundDataAll({ fundTypeId: id }).then(response => {
        let current = response[response.length - 1].value
        let progress = Math.round(current / kpiData.value[index].value * 100)
        kpiData.value[index].progress = progress
    });
}

const animateProgress = (index) => {
  const target = kpiData.value[index].progress
  const duration = 3000 // 3秒内完成
  const startTime = Date.now()
  
  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1) * target
    progressPercents.value[index] = progress
    
    if (progress < target) {
      requestAnimationFrame(updateProgress)
    } else {
      // 进度完成后添加闪烁效果
      addCompletionFlash(index)
    }
  }
  
  requestAnimationFrame(updateProgress)
}

const addBurstEffect = (index) => {
  if (cardRefs.value[index]) {
    gsap.to(cardRefs.value[index], {
      scale: 1.1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })
  }
}

const addCompletionFlash = (index) => {
  if (cardRefs.value[index]) {
    const card = cardRefs.value[index]
    gsap.to(card, {
      boxShadow: `0 0 40px ${kpiData.value[index].color}`,
      duration: 0.5,
      yoyo: true,
      repeat: 2
    })
  }
}

const handleCardHover = (index, isHover) => {
  if (cardRefs.value[index]) {
    gsap.to(cardRefs.value[index], {
      rotationY: isHover ? 10 : 0,
      scale: isHover ? 1.05 : 1,
      z: isHover ? 50 : 0,
      duration: 0.6,
      ease: "power2.out"
    })
  }
}
</script>

<template>
  <div class="right-card">
    <m-card title="2030年核心总目标">
      <div class="kpi-flip-container">
        <div 
          v-for="(item, index) in kpiData" 
          :key="index"
          :ref="el => cardRefs[index] = el"
          class="kpi-flip-card"
          :class="{ 'show': showCards[index] }"
          :style="{ '--card-color': item.color }"
          @mouseenter="handleCardHover(index, true)"
          @mouseleave="handleCardHover(index, false)"
        >
          <div class="card-background">
            <div class="holographic-effect"></div>
            <div class="energy-waves"></div>
          </div>
          
          <div class="kpi-icon">{{ item.icon }}</div>
          
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
            <div class="progress-background"></div>
            <div 
              class="progress-bar" 
              :style="{ 
                width: progressPercents[index] + '%',
                background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`
              }"
            ></div>
            <div class="progress-glow" 
              :style="{ 
                left: progressPercents[index] + '%',
                boxShadow: `0 0 20px ${item.color}`
              }"
            ></div>
          </div>
          
          <div class="progress-text">
            完成度: 
            <span class="progress-number">{{ Math.round(progressPercents[index]) }}%</span>
          </div>
          
          <div class="orbital-ring"></div>
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

.progress-number {
  color: #fff;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(48, 220, 255, 0.8);
}

.progress-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.progress-glow {
  position: absolute;
  top: -5px;
  width: 8px;
  height: 20px;
  background: radial-gradient(circle, rgba(48, 220, 255, 0.8), transparent);
  border-radius: 50%;
  transition: left 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: progressGlow 2s ease-in-out infinite;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.holographic-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: conic-gradient(from 0deg, transparent, var(--card-color), transparent, var(--card-color), transparent);
  opacity: 0.2;
  animation: holographicRotate 8s linear infinite;
}

.energy-waves {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, var(--card-color) 0%, transparent 70%);
  opacity: 0.1;
  animation: energyPulse 4s ease-in-out infinite;
}

.kpi-icon {
  font-size: 32px;
  margin-bottom: 15px;
  animation: iconFloat 3s ease-in-out infinite;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

.orbital-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(48, 220, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.5s ease;
}

.kpi-flip-card:hover {
  .holographic-effect {
    opacity: 0.4;
  }
  
  .energy-waves {
    opacity: 0.3;
  }
  
  .orbital-ring {
    opacity: 1;
    animation: orbitRotate 4s linear infinite;
  }
}

@keyframes progressGlow {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes holographicRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes energyPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes orbitRotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>