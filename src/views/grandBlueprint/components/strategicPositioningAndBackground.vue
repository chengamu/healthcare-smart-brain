<script setup>
import { ref, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"
import gsap from "gsap"

const showBackgroundText = ref(false)
const showCoreText = ref(false)
const particlesRef = ref(null)

onMounted(() => {
  // 延迟显示背景文字
  setTimeout(() => {
    showBackgroundText.value = true
    // 添加打字机效果
    animateTypewriter()
  }, 500)
  
  // 延迟显示核心定位文字
  setTimeout(() => {
    showCoreText.value = true
    // 添加核心定位动画
    animateCorePositioning()
  }, 1500)
  
  // 创建粒子效果
  setTimeout(() => {
    createParticleEffect()
  }, 2000)
})

const animateTypewriter = () => {
  const textElement = document.querySelector('.background-text')
  if (textElement) {
    gsap.from(textElement, {
      opacity: 0,
      duration: 2,
      ease: "power2.out"
    })
  }
}

const animateCorePositioning = () => {
  gsap.from('.core-text-left', {
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
  })
  
  gsap.from('.core-text-right', {
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.3
  })
}

const createParticleEffect = () => {
  const container = document.querySelector('.content-wrapper')
  if (!container) return
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div')
    particle.className = 'floating-particle'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 100 + '%'
    particle.style.animationDelay = Math.random() * 4 + 's'
    container.appendChild(particle)
  }
}
</script>

<template>
    <div class="left-card">
        <m-card title="战略定位与背景">
            <div class="content-wrapper">
                <!-- 背景光效 -->
                <div class="ambient-glow"></div>
                
                <div class="content-left" :class="{ show: showBackgroundText }">
                    <div class="section-title">
                        <span class="title-icon">📚</span>
                        背景
                        <div class="title-underline"></div>
                    </div>
                    <div class="background-text">
                        学习贯彻习近平总书记关于科技创新、产业创新的重要论述精神，全面落实浙江省<span class="highlight">加快建设创新浙江、因地制宜发展新质生产力</span>的决策部署，大力推进<span class="highlight">产城人文深度融合发展</span>。
                    </div>
                    <div class="scroll-indicator"></div>
                </div>
                
                <div class="divider">
                    <div class="divider-glow"></div>
                    <div class="divider-pulse"></div>
                </div>
                
                <div class="content-right" :class="{ show: showCoreText }">
                    <div class="core-text">
                        <div class="positioning-title">
                            <span class="title-icon">🎯</span>
                            核心定位
                        </div>
                        <div class="core-text-row">
                            <div class="core-text-left">
                                <div class="positioning-badge">示范窗口</div>
                                <div class="positioning-text">创绍兴产城人文献示范窗口</div>
                                <div class="glow-ring"></div>
                            </div>
                            <div class="positioning-connector"></div>
                            <div class="core-text-right">
                                <div class="positioning-badge">产业高地</div>
                                <div class="positioning-text">建杭州湾生命健康产业新高地</div>
                                <div class="glow-ring"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<style scoped lang="scss">
.content-wrapper {
  padding: 0 20px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.ambient-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle, rgba(48, 220, 255, 0.05) 0%, transparent 70%);
  animation: ambientPulse 8s ease-in-out infinite;
  pointer-events: none;
}

.floating-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, #30DCFF, transparent);
  border-radius: 50%;
  animation: floatParticle 6s ease-in-out infinite;
  pointer-events: none;
}

.content-left, .content-right {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transition: all 1.5s ease-in-out;
  
  &.show {
    opacity: 1;
  }
}

.content-left {
  width: 55%;
  position: relative;
  margin-right: auto;
  &.show {
    transform: translateX(0);
  }
}

.content-right {
  width: calc(100% - 60%); 
  margin-left: auto;
  &.show {
    transform: translateX(0);
  }
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #30DCFF;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  .title-icon {
    font-size: 20px;
    animation: iconPulse 2s ease-in-out infinite;
  }
  
  .title-underline {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #30DCFF, transparent);
    animation: underlineGlow 3s ease-in-out infinite;
  }
}

.background-text {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  text-align: justify;
  text-indent: 2em;
  transition: all 1.5s ease-in-out;
  text-shadow: 0 0 8px rgba(48, 220, 255, 0.5);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -10px;
    right: -10px;
    bottom: -5px;
    background: linear-gradient(135deg, 
      rgba(48, 220, 255, 0.05) 0%, 
      rgba(48, 220, 255, 0.02) 50%, 
      rgba(48, 220, 255, 0.05) 100%);
    border-radius: 8px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
}

.scroll-indicator {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, #30DCFF, transparent);
  animation: scrollIndicator 2s ease-in-out infinite;
}

.divider {
  width: 1px;
  height: 80%;
  background: linear-gradient(to bottom, transparent, #30DCFF, transparent);
  position: relative;
  
  .divider-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #30DCFF;
    box-shadow: 0 0 15px #30DCFF, 0 0 30px #30DCFF;
    animation: dividerPulse 3s ease-in-out infinite;
  }
  
  .divider-pulse {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(48, 220, 255, 0),
      rgba(48, 220, 255, 0.8),
      rgba(48, 220, 255, 0));
    animation: pulseFlow 4s ease-in-out infinite;
  }
}

.highlight {
  font-weight: bold;
  color: #30DCFF;
  text-shadow: 0 0 12px rgba(48, 220, 255, 0.8);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #30DCFF, transparent);
    animation: highlightGlow 2s ease-in-out infinite;
  }
}

.core-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.positioning-title {
  font-size: 16px;
  font-weight: bold;
  color: #30DCFF;
  margin-bottom: 25px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .title-icon {
    font-size: 18px;
    animation: iconPulse 2s ease-in-out infinite;
  }
}

.core-text-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
}

.core-text-left, .core-text-right {
  position: relative;
  text-align: center;
  transition: all 1.5s ease-in-out;
  padding: 12px 10px;
  border-radius: 12px;
  background: linear-gradient(135deg, 
    rgba(48, 220, 255, 0.1) 0%, 
    rgba(48, 220, 255, 0.05) 50%, 
    rgba(48, 220, 255, 0.1) 100%);
  border: 1px solid rgba(48, 220, 255, 0.3);
  backdrop-filter: blur(10px);
  flex: 1;
  margin: 0 5%;
  cursor: pointer;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 20px rgba(48, 220, 255, 0.3);
    
    .glow-ring {
      opacity: 1;
      animation: ringRotate 3s linear infinite;
    }
  }
}

.positioning-badge {
  font-size: 12px;
  color: #00FF88;
  font-weight: bold;
  margin-bottom: 8px;
  padding: 4px 12px;
  background: rgba(0, 255, 136, 0.2);
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 136, 0.4);
  display: inline-block;
}

.positioning-text {
  font-size: 12px;
  font-weight: bold;
  color: #30DCFF;
  text-shadow: 0 0 12px rgba(48, 220, 255, 0.8),
               0 0 24px rgba(48, 220, 255, 0.6),
               0 0 36px rgba(48, 220, 255, 0.4);
  line-height: 1.3;
}

.positioning-connector {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  width: 10%;
  height: 2px;
  background: linear-gradient(90deg, #30DCFF, #00FF88, #30DCFF);
  z-index: 10;
  
  &::before {
    content: '⚡';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FFD700;
    font-size: 16px;
    animation: sparkle 1.5s ease-in-out infinite;
  }
}

.glow-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  border: 2px solid rgba(48, 220, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

// 动画定义
@keyframes ambientPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@keyframes floatParticle {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
  50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes underlineGlow {
  0%, 100% { box-shadow: 0 0 5px #30DCFF; }
  50% { box-shadow: 0 0 15px #30DCFF, 0 0 25px #30DCFF; }
}

@keyframes scrollIndicator {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes dividerPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.7; }
}

@keyframes pulseFlow {
  0% { opacity: 0; transform: translateX(-50%) scaleY(0); }
  50% { opacity: 1; transform: translateX(-50%) scaleY(1); }
  100% { opacity: 0; transform: translateX(-50%) scaleY(0); }
}

@keyframes highlightGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes sparkle {
  0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
  50% { transform: translate(-50%, -50%) scale(1.3) rotate(180deg); }
}

@keyframes ringRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>