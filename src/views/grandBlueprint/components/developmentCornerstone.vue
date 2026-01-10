<script setup>
import { ref, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"
import { useGetConfigKey } from '@/hooks/useGetConfigKey'
import mCountTo from "@/components/mCountTo/index.js"
import gsap from "gsap"

const {
    configValue: fzjs,
    getConfigKeyFunc: fetchFzjs
} = useGetConfigKey('brain.grandBlueprint.fzjs')

const kpiData = ref([])

const showCards = ref([false, false, false, false])
const startCount = ref([false, false, false, false])
const cardRefs = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchFzjs(),
    ])

    try {
        const parsedData = JSON.parse(fzjs.value)
        kpiData.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        kpiData.value = [
            { title: '企业', value: 40, unit: '家', icon: '🏢' },
            { title: '研究院', value: 2, unit: '家', icon: '🔬' },
            { title: '基金', value: 108, unit: '亿元', icon: '💰' },
            { title: '专项政策', value: 1, unit: '个', icon: '📋' }
        ]
    }

    // 依次显示卡片，每张卡片间隔300ms
    showCards.value.forEach((_, index) => {
        setTimeout(() => {
            showCards.value[index] = true
            // 延迟一点时间开始数字动画
            setTimeout(() => {
                startCount.value[index] = true
                // 添加脉冲动画
                addPulseAnimation(index)
            }, 500)
        }, index * 300)
    })

    // 添加背景粒子动画
    setTimeout(() => {
        createParticleAnimation()
    }, 1000)
}

const addPulseAnimation = (index) => {
  if (cardRefs.value[index]) {
    gsap.to(cardRefs.value[index], {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })
  }
}

const createParticleAnimation = () => {
  const container = document.querySelector('.container-wrapper')
  if (!container) return
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = (Math.random() * 80 + 10) + '%'  // 限制在10%-90%范围内
    particle.style.top = (Math.random() * 80 + 10) + '%'   // 限制在10%-90%范围内
    particle.style.animationDelay = Math.random() * 4 + 's'
    container.appendChild(particle)
  }
}

const handleCardHover = (index, isHover) => {
  if (cardRefs.value[index]) {
    gsap.to(cardRefs.value[index], {
      scale: isHover ? 1.05 : 1,
      rotationY: isHover ? 3 : 0,
      z: isHover ? 20 : 0,
      duration: 0.5,
      ease: "power2.out"
    })
  }
}
</script>

<template>
  <div class="left-card">
    <m-card title="发展基石">
      <div class="container-wrapper">
        <div class="kpi-matrix">
          <div 
            v-for="(item, index) in kpiData" 
            :key="index"
            :ref="el => cardRefs[index] = el"
            class="kpi-card"
            :class="{ 'show': showCards[index] }"
            @mouseenter="handleCardHover(index, true)"
            @mouseleave="handleCardHover(index, false)"
          >
            <div class="card-background">
              <div class="glow-effect"></div>
              <div class="scan-line"></div>
            </div>
            
            <div class="kpi-icon">{{ item.icon }}</div>
            
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
            
            <div class="pulse-ring"></div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<style scoped lang="scss">
.container-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.kpi-matrix {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  position: relative;
  overflow: visible;
  align-items: stretch;
}

.kpi-card {
  background-image: url("@/assets/images/grandBlueprint/jigsaw.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transform: translateY(20px) rotateX(10deg);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3),
              0 0 15px rgba(48, 220, 255, 0.2);
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  transform-style: preserve-3d;
  padding: 12px 6px;

  &.show {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }

  &:hover {
    .glow-effect {
      opacity: 0.8;
    }
    
    .scan-line {
      animation: scan 2s linear infinite;
    }
    
    .pulse-ring {
      animation: pulse 1.5s ease-out infinite;
    }
  }

  &:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    grid-column: 1;
    grid-row: 2;
    animation-delay: 0.6s;
  }

  &:nth-child(4) {
    grid-column: 2;
    grid-row: 2;
    animation-delay: 0.9s;
  }
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.glow-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle, rgba(48, 220, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.scan-line {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #30DCFF, transparent);
  z-index: 2;
}

.kpi-icon {
  font-size: 24px;
  position: relative;
  z-index: 10;
  animation: iconFloat 3s ease-in-out infinite;
}

.kpi-value {
  font-size: 28px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  text-shadow: 0 0 15px rgba(48, 220, 255, 0.9),
               0 0 30px rgba(48, 220, 255, 0.6);
  position: relative;
  z-index: 10;
  
  :deep(.count-to-wrapper) {
    background: linear-gradient(135deg, #fff 0%, #30DCFF 50%, #00B1E9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 28px;
    filter: drop-shadow(0 0 8px rgba(48, 220, 255, 0.8));
  }
}

.kpi-unit {
  font-size: 16px;
  color: #30DCFF;
  margin-left: 6px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(48, 220, 255, 0.8);
}

.kpi-title {
  font-size: 14px;
  color: #30DCFF;
  text-align: center;
  font-weight: bold;
  text-shadow: 0 0 12px rgba(48, 220, 255, 0.8),
               0 0 24px rgba(48, 220, 255, 0.4);
  position: relative;
  z-index: 10;
  letter-spacing: 1px;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  border: 2px solid rgba(48, 220, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 0;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: radial-gradient(circle, #30DCFF, transparent);
  border-radius: 50%;
  animation: float 4s ease-in-out infinite;
  pointer-events: none;
  opacity: 0.8;
}

@keyframes scan {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}
</style>