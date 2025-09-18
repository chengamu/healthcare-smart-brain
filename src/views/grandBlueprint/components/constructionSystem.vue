<script setup>
import mCard from "@/components/mCard/index.vue"
import { onMounted, ref } from "vue"
import gsap from "gsap"

const coreData = {
  center: { name: "医疗健康" },
  threeRings: [
    { name: "党建联建", color: "#FF6B6B" },
    { name: "产业联盟", color: "#4ECDC4" },
    { name: "人才联通", color: "#45B7D1" }
  ],
  fiveEcosystems: [
    { name: "产业生态", color: "#00FFC8" },
    { name: "创新生态", color: "#FF00AA" },
    { name: "人才生态", color: "#FFD700" },
    { name: "生活生态", color: "#9D4EDD" },
    { name: "服务生态", color: "#00B4D8" }
  ]
}

const isAnimated = ref(false)

onMounted(() => {
  setTimeout(() => {
    isAnimated.value = true
    startAnimations()
  }, 500)
})

const startAnimations = () => {
  // 简化的动画效果，聚焦于文字展示
  console.log('文字布局动画已启动');
}
</script>

<template>
  <div class="right-card">
    <m-card title="'135'建设体系">
      <div class="relationship-graph">
        <div class="graph-container" :class="{ 'animated': isAnimated }">
          <!-- 连接线 SVG -->
          <svg class="connection-svg" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#30DCFF;stop-opacity:0.2" />
                <stop offset="50%" style="stop-color:#30DCFF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#30DCFF;stop-opacity:0.2" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>
            
            <!-- 三联共促之间的三角形连接线 -->
            <line class="triangle-line" x1="200" y1="120" x2="60" y2="250" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="8,4" opacity="0.8" />
            <line class="triangle-line" x1="110" y1="271" x2="290" y2="270" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="8,4" opacity="0.8" />
            <line class="triangle-line" x1="340" y1="250" x2="200" y2="120" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="8,4" opacity="0.8" />
            
            <!-- 5大生态之间的五边形连接线 -->
            <line class="pentagon-line" x1="200" y1="50" x2="-70" y2="150" stroke="url(#lineGradient)" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.7" />
            <line class="pentagon-line" x1="-70" y1="180" x2="-30" y2="320" stroke="url(#lineGradient)" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.7" />
            <line class="pentagon-line" x1="30" y1="351" x2="370" y2="350" stroke="url(#lineGradient)" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.7" />
            <line class="pentagon-line" x1="430" y1="320" x2="470" y2="180" stroke="url(#lineGradient)" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.7" />
            <line class="pentagon-line" x1="470" y1="150" x2="200" y2="50" stroke="url(#lineGradient)" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.7" />
          </svg>

          <!-- 核心文字 -->
          <div class="center-text">
            <div class="center-name">{{ coreData.center.name }}</div>
            <div class="center-glow"></div>
          </div>

          <!-- 3联共促文字 (三角形布局) -->
          <div 
            v-for="(ring, index) in coreData.threeRings" 
            :key="'ring-' + index"
            class="three-ring-text"
            :class="`ring-${index}`"
            :style="{ '--ring-color': ring.color }"
          >
            <div class="ring-name">{{ ring.name }}</div>
            <div class="ring-underline"></div>
          </div>

          <!-- 5大生态文字 (五边形布局) -->
          <div 
            v-for="(eco, index) in coreData.fiveEcosystems" 
            :key="'eco-' + index"
            class="five-eco-text"
            :class="`eco-${index}`"
            :style="{ '--eco-color': eco.color }"
          >
            <div class="eco-name">{{ eco.name }}</div>
            <div class="eco-underline"></div>
          </div>
          
          <!-- 背景粒子效果 -->
          <div class="background-particles">
            <div v-for="i in 15" :key="i" class="particle" :style="{animationDelay: (i * 0.3) + 's'}"></div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<style scoped lang="scss">
.relationship-graph {
  width: 100%;
  height: 100%;
  position: relative;
}

.graph-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 核心文字样式
.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
}

.center-name {
  font-size: 16px;
  font-weight: bold;
  color: #30DCFF;
  text-shadow: 0 0 20px rgba(48, 220, 255, 0.8),
               0 0 40px rgba(48, 220, 255, 0.4);
  letter-spacing: 2px;
  position: relative;
  z-index: 10;
}

.center-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(48, 220, 255, 0.2), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: center-pulse 3s ease-in-out infinite;
  z-index: 1;
}

// 三环文字样式 (三角形布局)
.three-ring-text {
  position: absolute;
  text-align: center;
  z-index: 8;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    
    .ring-name {
      text-shadow: 0 0 20px var(--ring-color);
    }
    
    .ring-underline {
      width: 100%;
      opacity: 1;
    }
  }
  
  // 三角形布局
  &.ring-0 {
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &.ring-1 {
    top: 65%;
    left: 30%;
    transform: translateX(-50%);
  }
  
  &.ring-2 {
    top: 65%;
    left: 70%;
    transform: translateX(-50%);
  }
}

.ring-name {
  font-size: 14px;
  font-weight: bold;
  color: var(--ring-color);
  text-shadow: 0 0 15px var(--ring-color);
  letter-spacing: 1px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

.ring-underline {
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--ring-color), transparent);
  margin: 0 auto;
  transition: all 0.5s ease;
  opacity: 0.7;
}

// 五大生态文字样式 (五边形布局)
.five-eco-text {
  position: absolute;
  text-align: center;
  z-index: 6;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.15);
    
    .eco-name {
      text-shadow: 0 0 25px var(--eco-color);
    }
    
    .eco-underline {
      width: 100%;
      opacity: 1;
    }
  }
  
  // 五边形布局 - 进一步向外扩展
  &.eco-0 {
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &.eco-1 {
    top: 40%;
    left: 15%;
    transform: translateX(-50%);
  }
  
  &.eco-2 {
    top: 85%;
    left: 20%;
    transform: translateX(-50%);
  }
  
  &.eco-3 {
    top: 85%;
    left: 80%;
    transform: translateX(-50%);
  }
  
  &.eco-4 {
    top: 40%;
    left: 85%;
    transform: translateX(-50%);
  }
}

.eco-name {
  font-size: 13px;
  font-weight: bold;
  color: var(--eco-color);
  text-shadow: 0 0 12px var(--eco-color);
  letter-spacing: 1px;
  margin-bottom: 3px;
  transition: all 0.3s ease;
}

.eco-underline {
  width: 0;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--eco-color), transparent);
  margin: 0 auto;
  transition: all 0.5s ease;
  opacity: 0.6;
}

@keyframes center-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.6;
  }
}

.connection-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.connection-line {
  stroke-dasharray: 5, 5;
  stroke-dashoffset: 0;
  animation: line-flow 3s linear infinite;
  filter: url(#glow);
  
  &:hover {
    stroke-width: 4 !important;
    opacity: 1 !important;
  }
}

// 三角形连接线样式
.triangle-line {
  stroke-dasharray: 8, 4;
  stroke-dashoffset: 0;
  animation: triangle-flow 4s linear infinite;
  filter: url(#glow);
  transition: all 0.3s ease;
  
  &:hover {
    stroke-width: 3 !important;
    opacity: 1 !important;
    stroke-dasharray: 6, 2;
  }
}

// 五边形连接线样式
.pentagon-line {
  stroke-dasharray: 6, 3;
  stroke-dashoffset: 0;
  animation: pentagon-flow 5s linear infinite;
  filter: url(#glow);
  transition: all 0.3s ease;
  
  &:hover {
    stroke-width: 2.5 !important;
    opacity: 1 !important;
    stroke-dasharray: 4, 2;
  }
}

.background-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #30DCFF;
  border-radius: 50%;
  opacity: 0;
  animation: particle-float 8s ease-in-out infinite;
  
  &:nth-child(odd) {
    animation-direction: reverse;
  }
  
  @for $i from 1 through 15 {
    &:nth-child(#{$i}) {
      left: random(100) * 1%;
      top: random(100) * 1%;
      animation-delay: $i * 0.5s;
    }
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0;
  }
}

@keyframes orbit-ring {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 1;
  }
}

@keyframes line-flow {
  0% {
    stroke-dashoffset: 0;
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -20;
    opacity: 0.8;
  }
}

@keyframes triangle-flow {
  0% {
    stroke-dashoffset: 0;
    opacity: 0.8;
  }
  25% {
    opacity: 1;
  }
  50% {
    stroke-dashoffset: -12;
    opacity: 0.9;
  }
  75% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -24;
    opacity: 0.8;
  }
}

@keyframes pentagon-flow {
  0% {
    stroke-dashoffset: 0;
    opacity: 0.7;
  }
  20% {
    opacity: 0.9;
  }
  40% {
    stroke-dashoffset: -9;
    opacity: 0.8;
  }
  60% {
    opacity: 1;
  }
  80% {
    stroke-dashoffset: -18;
    opacity: 0.9;
  }
  100% {
    stroke-dashoffset: -27;
    opacity: 0.7;
  }
}

@keyframes particle-float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    transform: translateY(-30px) translateX(20px);
    opacity: 0.8;
  }
  75% {
    opacity: 0.5;
  }
}
</style>