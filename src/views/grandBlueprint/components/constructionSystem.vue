<script setup>
import mCard from "@/components/mCard/index.vue"
import { onMounted, ref } from "vue"
import gsap from "gsap"

const coreData = {
  center: { name: "医疗健康产业" },
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
  // 三环呼吸动画效果
  gsap.to('.sub-ring.ring-0', {
    scale: 1.15,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  })
  
  gsap.to('.sub-ring.ring-1', {
    scale: 1.12,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    delay: 0.5
  })
  
  gsap.to('.sub-ring.ring-2', {
    scale: 1.18,
    duration: 3.8,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    delay: 1
  })
  
  // 三环光晕脉冲效果
  gsap.to('.ring-pulse', {
    scale: 1.8,
    opacity: 0,
    duration: 2.5,
    repeat: -1,
    ease: "power2.out",
    stagger: 0.4
  })
}
</script>

<template>
  <div class="right-card">
    <m-card title="“135”建设体系">
      <div class="relationship-graph">
        <div class="graph-container" :class="{ 'animated': isAnimated }">
          <!-- 核心光球 -->
          <div class="core-sphere">
            <div class="sphere-content">
              <div class="sphere-glow"></div>
              <div class="sphere-name">{{ coreData.center.name }}</div>
              <div class="core-pulse"></div>
              <div class="core-rings">
                <div class="ring ring-1"></div>
                <div class="ring ring-2"></div>
                <div class="ring ring-3"></div>
              </div>
            </div>
          </div>

          <!-- 连接线 SVG -->
          <svg class="connection-svg" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#30DCFF;stop-opacity:0" />
                <stop offset="50%" style="stop-color:#30DCFF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#30DCFF;stop-opacity:0" />
              </linearGradient>
            </defs>
            
            <!-- 连接到三环的线条 -->
            <line class="connection-line" x1="200" y1="200" x2="200" y2="120" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="5,5" />
            <line class="connection-line" x1="200" y1="200" x2="130" y2="260" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="5,5" />
            <line class="connection-line" x1="200" y1="200" x2="270" y2="260" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="5,5" />
            
            <!-- 连接到卫星节点的线条 -->
            <line class="connection-line" x1="200" y1="200" x2="200" y2="50" stroke="url(#lineGradient)" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
            <line class="connection-line" x1="200" y1="200" x2="90" y2="110" stroke="url(#lineGradient)" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
            <line class="connection-line" x1="200" y1="200" x2="310" y2="110" stroke="url(#lineGradient)" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
            <line class="connection-line" x1="200" y1="200" x2="80" y2="280" stroke="url(#lineGradient)" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
            <line class="connection-line" x1="200" y1="200" x2="320" y2="280" stroke="url(#lineGradient)" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
          </svg>

          <!-- 3联共促子光环 -->
          <div 
            v-for="(ring, index) in coreData.threeRings" 
            :key="'ring-' + index"
            class="sub-ring"
            :class="`ring-${index}`"
            :style="{ '--ring-color': ring.color }"
          >
            <div class="ring-content">
              <div class="ring-glow"></div>
              <div class="ring-name">{{ ring.name }}</div>
              <div class="ring-pulse"></div>
            </div>
          </div>

          <!-- 5大生态卫星节点 -->
          <div 
            v-for="(eco, index) in coreData.fiveEcosystems" 
            :key="'eco-' + index"
            class="satellite-node"
            :class="`node-${index}`"
            :style="{ '--node-color': eco.color }"
          >
            <div class="node-content">
              <div class="node-glow"></div>
              <div class="node-name">{{ eco.name }}</div>
              <div class="node-orbit"></div>
            </div>
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

.core-sphere {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #30DCFF, #0077be);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 30px rgba(48, 220, 255, 0.6),
              inset 0 0 20px rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 10;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.sphere-content {
  text-align: center;
  color: white;
  padding: 5px;
}

.sphere-name {
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  z-index: 5;
  position: relative;
}

.core-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(48, 220, 255, 0.8), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.core-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.ring {
  position: absolute;
  border: 1px solid rgba(48, 220, 255, 0.4);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  &.ring-1 {
    width: 100px;
    height: 100px;
    animation: pulse-ring 3s ease-in-out infinite;
  }
  
  &.ring-2 {
    width: 130px;
    height: 130px;
    animation: pulse-ring 3s ease-in-out infinite 1s;
  }
  
  &.ring-3 {
    width: 160px;
    height: 160px;
    animation: pulse-ring 3s ease-in-out infinite 2s;
  }
}

.sub-ring {
  position: absolute;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transform: scale(1);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 5;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent, var(--ring-color), transparent, var(--ring-color), transparent);
    animation: rotate 6s linear infinite;
    z-index: -1;
    opacity: 0.6;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--ring-color), transparent);
    z-index: -1;
    opacity: 0.3;
  }
  
  &:hover {
    transform: scale(1.1);
    
    .ring-glow {
      opacity: 0.8;
    }
  }
  
  &.ring-0 {
    width: 85px;
    height: 85px;
    background: linear-gradient(135deg, 
      rgba(255, 107, 107, 0.9), 
      rgba(255, 107, 107, 0.5),
      rgba(255, 107, 107, 0.9)
    );
    border: 3px solid #FF6B6B;
    box-shadow: 0 0 30px rgba(255, 107, 107, 0.8),
                0 0 60px rgba(255, 107, 107, 0.4),
                inset 0 0 20px rgba(255, 255, 255, 0.3);
    top: 30%;
    left: 50%;
    margin-top: -42px;
    margin-left: -42px;
  }
  
  &.ring-1 {
    width: 85px;
    height: 85px;
    background: linear-gradient(135deg, 
      rgba(78, 205, 196, 0.9), 
      rgba(78, 205, 196, 0.5),
      rgba(78, 205, 196, 0.9)
    );
    border: 3px solid #4ECDC4;
    box-shadow: 0 0 30px rgba(78, 205, 196, 0.8),
                0 0 60px rgba(78, 205, 196, 0.4),
                inset 0 0 20px rgba(255, 255, 255, 0.3);
    top: 65%;
    left: 40%;
    margin-top: -42px;
    margin-left: -42px;
  }
  
  &.ring-2 {
    width: 85px;
    height: 85px;
    background: linear-gradient(135deg, 
      rgba(69, 183, 209, 0.9), 
      rgba(69, 183, 209, 0.5),
      rgba(69, 183, 209, 0.9)
    );
    border: 3px solid #45B7D1;
    box-shadow: 0 0 30px rgba(69, 183, 209, 0.8),
                0 0 60px rgba(69, 183, 209, 0.4),
                inset 0 0 20px rgba(255, 255, 255, 0.3);
    top: 65%;
    left: 60%;
    margin-top: -42px;
    margin-left: -42px;
  }
}

.ring-content {
  text-align: center;
  width: 80%;
  position: relative;
  z-index: 10;
}

.ring-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, var(--ring-color), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  transition: all 0.5s ease;
  z-index: 1;
}

.ring-name {
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.8),
               0 0 16px var(--ring-color);
  position: relative;
  z-index: 10;
  letter-spacing: 1px;
}

.ring-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, var(--ring-color), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.satellite-node {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transform: scale(1);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 8;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    border: 1px solid var(--node-color);
    opacity: 0.5;
    animation: orbit-ring 6s ease-in-out infinite;
  }
  
  &:hover {
    transform: scale(1.2);
    
    .node-glow {
      opacity: 1;
      transform: scale(1.5);
    }
  }
  
  &.node-0 {
    background: radial-gradient(circle at 30% 30%, var(--node-color), rgba(0, 255, 200, 0.3));
    box-shadow: 0 0 30px var(--node-color);
    top: 10%;
    left: 50%;
    margin-top: -35px;
    margin-left: -35px;
  }
  
  &.node-1 {
    background: radial-gradient(circle at 30% 30%, var(--node-color), rgba(255, 0, 170, 0.3));
    box-shadow: 0 0 30px var(--node-color);
    top: 25%;
    left: 15%;
    margin-top: -35px;
    margin-left: -35px;
  }
  
  &.node-2 {
    background: radial-gradient(circle at 30% 30%, var(--node-color), rgba(255, 215, 0, 0.3));
    box-shadow: 0 0 30px var(--node-color);
    top: 75%;
    left: 15%;
    margin-top: -35px;
    margin-left: -35px;
  }
  
  &.node-3 {
    background: radial-gradient(circle at 30% 30%, var(--node-color), rgba(157, 78, 221, 0.3));
    box-shadow: 0 0 30px var(--node-color);
    top: 75%;
    left: 85%;
    margin-top: -35px;
    margin-left: -35px;
  }
  
  &.node-4 {
    background: radial-gradient(circle at 30% 30%, var(--node-color), rgba(0, 180, 216, 0.3));
    box-shadow: 0 0 30px var(--node-color);
    top: 25%;
    left: 85%;
    margin-top: -35px;
    margin-left: -35px;
  }
}

.node-content {
  text-align: center;
  color: white;
  padding: 2px;
}

.node-name {
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 8px var(--node-color);
  z-index: 10;
  position: relative;
}

.node-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--node-color), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.6;
  transition: all 0.5s ease;
  z-index: 1;
}

.node-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 90px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
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
  }
  100% {
    stroke-dashoffset: -20;
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