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
    { name: "产业", color: "#00FFC8" },
    { name: "创新", color: "#FF00AA" },
    { name: "人才", color: "#FFD700" },
    { name: "生活", color: "#9D4EDD" },
    { name: "服务", color: "#00B4D8" }
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
                        
            <!-- 1个产业填充椭圆 -->
            <ellipse cx="200" cy="80" rx="80" ry="20" fill="rgba(48, 220, 255, 0.2)" stroke="#30DCFF" 
                     stroke-width="1" opacity="0.8" class="three-promote-center-ellipse" />
            
            <!-- 3联共促的椭圆边线：贯穿所有3联共促文字 -->
            <ellipse cx="200" cy="150" rx="240" ry="60" fill="none" stroke="url(#lineGradient)" 
                     stroke-width="2" stroke-dasharray="6,3" opacity="0.6" class="dotted-oval three-promote-border" />
            
            <!-- 3联共促中心填充椭圆 -->
            <ellipse cx="200" cy="150" rx="120" ry="30" fill="rgba(48, 220, 255, 0.2)" stroke="#30DCFF" 
                     stroke-width="1" opacity="0.8" class="three-promote-center-ellipse" />
            
            <!-- 5大生态的椭圆边线：贯穿所有生态文字 -->
            <ellipse cx="200" cy="270" rx="320" ry="80" fill="none" stroke="url(#lineGradient)" 
                     stroke-width="2" stroke-dasharray="8,4" opacity="0.7" class="dotted-oval eco-border" />
            
            <!-- 5大生态中心填充椭圆 -->
            <ellipse cx="200" cy="270" rx="160" ry="40" fill="rgba(0, 200, 150, 0.2)" stroke="#00C896" 
                     stroke-width="1" opacity="0.8" class="eco-center-ellipse" />
          </svg>

          <!-- 核心文字 -->
          <div class="center-text">
            <div class="center-name">{{ coreData.center.name }}</div>
            <div class="center-glow"></div>
          </div>

          <!-- 3联共促文字 -->
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

          <!-- 5大生态文字 -->
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
          
          <!-- 5大生态中心标签 -->
          <div class="eco-center-label">
            <div class="eco-center-text">“5”大生态</div>
          </div>
          
          <!-- 3联共促中心标签 -->
          <div class="three-promote-center-label">
            <div class="three-promote-center-text">“3”联共促</div>
          </div>
          
          <!-- 1个产业中心标签 -->
          <div class="one-industry-center-label">
            <div class="one-industry-center-text">“1”个产业</div>
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
  top: 8%;
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
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(48, 220, 255, 0.2), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: center-pulse 3s ease-in-out infinite;
  z-index: 1;
}

// 三环文字样式
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
  
  // 三角形布局 - 增大间距，保持水平显示
  &.ring-0 {
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &.ring-1 {
    top: 40%;
    left: 25%;
    transform: translateX(-50%);
  }
  
  &.ring-2 {
    top: 40%;
    left: 75%;
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
    transform: scale(1.15) rotate(0deg) !important;
    
    .eco-name {
      text-shadow: 0 0 25px var(--eco-color);
    }
    
    .eco-underline {
      width: 100%;
      opacity: 1;
    }
  }
  
  // 五边形布局 - 底部椭圆弧形排布（移除倾斜，增大间距）
  &.eco-0 {
    bottom: 15%;
    left: 15%;
    transform: translateX(-50%);
  }
  
  &.eco-1 {
    bottom: 8%;
    left: 30%;
    transform: translateX(-50%);
  }
  
  &.eco-2 {
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &.eco-3 {
    bottom: 8%;
    left: 70%;
    transform: translateX(-50%);
  }
  
  &.eco-4 {
    bottom: 15%;
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

// 三角形连接线样式 - 弧形路径
.three-promote-border {
  animation: three-promote-flow 6s linear infinite;
  filter: url(#glow);
  transition: all 0.3s ease;
  
  &:hover {
    stroke-width: 3 !important;
    opacity: 1 !important;
    stroke-dasharray: 4, 2;
  }
}

// 3联共促中心标签
.three-promote-center-label {
  position: absolute;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 12;
  pointer-events: none;
}

.three-promote-center-text {
  font-size: 14px;
  font-weight: bold;
  color: #30DCFF;
  text-shadow: 
    0 0 10px rgba(48, 220, 255, 0.8),
    0 0 20px rgba(48, 220, 255, 0.4);
  letter-spacing: 1px;
  animation: three-promote-text-glow 3s ease-in-out infinite;
}

// 1个产业中心标签
.one-industry-center-label {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 12;
  pointer-events: none;
}

.one-industry-center-text {
  font-size: 14px;
  font-weight: bold;
  color: #30DCFF;
  text-shadow: 
    0 0 10px rgba(48, 220, 255, 0.8),
    0 0 20px rgba(48, 220, 255, 0.4);
  letter-spacing: 1px;
  animation: three-promote-text-glow 3s ease-in-out infinite;
}

// 椭圆边线样式
.eco-border {
  animation: eco-border-flow 8s linear infinite;
  filter: url(#glow);
  transition: all 0.3s ease;
  
  &:hover {
    stroke-width: 3 !important;
    opacity: 1 !important;
    stroke-dasharray: 6, 2;
  }
}

// 5大生态中心标签
.eco-center-label {
  position: absolute;
  top: 68%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 12;
  pointer-events: none;
}

.eco-center-text {
  font-size: 14px;
  font-weight: bold;
  color: #00C896;
  text-shadow: 
    0 0 10px rgba(0, 200, 150, 0.8),
    0 0 20px rgba(0, 200, 150, 0.4);
  letter-spacing: 1px;
  animation: eco-text-glow 3s ease-in-out infinite;
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

// 3联共促椭圆边线动画
@keyframes three-promote-flow {
  0% {
    stroke-dashoffset: 0;
    opacity: 0.5;
  }
  25% {
    opacity: 0.8;
  }
  50% {
    stroke-dashoffset: -18;
    opacity: 0.6;
  }
  75% {
    opacity: 0.7;
  }
  100% {
    stroke-dashoffset: -36;
    opacity: 0.5;
  }
}

// 3联共促中心填充椭圆脉冲动画
@keyframes three-promote-center-pulse {
  0%, 100% {
    fill: rgba(48, 220, 255, 0.2);
    transform: scale(1);
  }
  50% {
    fill: rgba(48, 220, 255, 0.3);
    transform: scale(1.05);
  }
}

// 3联共促文字发光动画
@keyframes three-promote-text-glow {
  0%, 100% {
    text-shadow: 
      0 0 10px rgba(48, 220, 255, 0.6),
      0 0 20px rgba(48, 220, 255, 0.3);
  }
  50% {
    text-shadow: 
      0 0 15px rgba(48, 220, 255, 1),
      0 0 30px rgba(48, 220, 255, 0.6);
  }
}

// 椭圆边线动画
@keyframes eco-border-flow {
  0% {
    stroke-dashoffset: 0;
    opacity: 0.6;
  }
  25% {
    opacity: 0.8;
  }
  50% {
    stroke-dashoffset: -24;
    opacity: 0.7;
  }
  75% {
    opacity: 0.9;
  }
  100% {
    stroke-dashoffset: -48;
    opacity: 0.6;
  }
}

// 5大生态中心填充椭圆脉冲动画
@keyframes eco-center-pulse {
  0%, 100% {
    fill: rgba(0, 200, 150, 0.2);
    transform: scale(1);
  }
  50% {
    fill: rgba(0, 200, 150, 0.3);
    transform: scale(1.05);
  }
}

// 5大生态文字发光动画
@keyframes eco-text-glow {
  0%, 100% {
    text-shadow: 
      0 0 10px rgba(0, 200, 150, 0.6),
      0 0 20px rgba(0, 200, 150, 0.3);
  }
  50% {
    text-shadow: 
      0 0 15px rgba(0, 200, 150, 1),
      0 0 30px rgba(0, 200, 150, 0.6);
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