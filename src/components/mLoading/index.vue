<template>
    <div class="loading" v-show="visible">
        <!-- 科技感扫描线 -->
        <div class="scan-line"></div>
        
        <!-- 多层扫描网格 -->
        <div class="scan-grid">
            <div class="grid-line horizontal" v-for="n in 8" :key="'h' + n" :style="`--delay: ${n * 0.3}s`"></div>
            <div class="grid-line vertical" v-for="n in 12" :key="'v' + n" :style="`--delay: ${n * 0.2}s`"></div>
        </div>
        
        <!-- 主要加载文本 -->
        <div class="loading-text">
            <span v-for="(letter, index) in letters" 
                  :key="index" 
                  :style="`--index: ${index + 1}`"
                  :data-text="letter">{{ letter }}</span>
        </div>
        
        <!-- 副标题文本 -->
        <div class="loading-subtitle">
            <span>医疗健康产业大脑</span>
            <div class="subtitle-line"></div>
        </div>
        
        <!-- 进度显示 -->
        <div class="loading-progress" :style="`--progress: ${progress / 100}`">
            <div class="progress-wrapper">
                <span class="value">{{ progress }}</span>
                <span class="unit">%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-bg"></div>
                <div class="progress-bar-fill"></div>
                <div class="progress-particles">
                    <div class="particle" v-for="n in 5" :key="n" :style="`--delay: ${n * 0.2}s`"></div>
                </div>
            </div>
        </div>
        
        <!-- 科技感装饰环 -->
        <div class="tech-rings">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <div class="ring ring-3"></div>
            <div class="ring ring-4"></div>
        </div>
        
        <!-- 数据流效果 -->
        <div class="data-stream">
            <div class="stream-line" v-for="n in 8" :key="n" :style="`--delay: ${n * 0.15}s; --position: ${n * 12.5}%`"></div>
        </div>
        
        <!-- 浮动装饰元素 -->
        <div class="floating-elements">
            <div class="float-icon" v-for="n in 6" :key="n" :style="`--delay: ${n * 0.8}s; --rotation: ${n * 60}deg`">
                <div class="icon-content">{{ ['⚛', '🧬', '💡', '🔬', '📊', '🎯'][n-1] }}</div>
            </div>
        </div>
        
        <!-- 脉冲波纹 -->
        <div class="pulse-waves">
            <div class="wave" v-for="n in 4" :key="n" :style="`--delay: ${n * 0.5}s`"></div>
        </div>
        
        <!-- 能量光束 -->
        <div class="energy-beams">
            <div class="beam" v-for="n in 8" :key="n" :style="`--angle: ${n * 45}deg; --delay: ${n * 0.3}s`"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineExpose, computed, onMounted } from 'vue'
import gsap from 'gsap'

// 定义props
const props = defineProps({
    progress: {
        type: Number,
        default: 0
    }
})

// 控制组件显示隐藏
const visible = ref(true)

// LOADING文字分解
const letters = computed(() => 'LOADING'.split(''))

// 创建科技感入场动画
function createEntranceAnimation() {
    const tl = gsap.timeline()
    
    // 扫描网格效果
    tl.fromTo('.scan-grid .grid-line', {
        scaleX: 0,
        scaleY: 0,
        opacity: 0
    }, {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.3,
        duration: 1,
        stagger: 0.05,
        ease: 'power2.out'
    })
    
    // 扫描线效果
    tl.fromTo('.scan-line', {
        scaleX: 0,
        opacity: 0
    }, {
        scaleX: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out'
    }, '-=0.5')
    
    // 脉冲波纹
    tl.fromTo('.pulse-waves .wave', {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 0.4,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=1')
    
    // 文字逐个出现
    tl.fromTo('.loading-text span', {
        y: 100,
        opacity: 0,
        rotationX: -90,
        scale: 0.5
    }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.8')
    
    // 副标题出现
    tl.fromTo('.loading-subtitle', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4')
    
    // 装饰环动画
    tl.fromTo('.tech-rings .ring', {
        scale: 0,
        opacity: 0,
        rotation: -180
    }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'elastic.out(1, 0.5)'
    }, '-=0.6')
    
    // 浮动装饰元素
    tl.fromTo('.floating-elements .float-icon', {
        scale: 0,
        opacity: 0,
        y: 100
    }, {
        scale: 1,
        opacity: 0.8,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'back.out(1.2)'
    }, '-=0.8')
    
    // 能量光束
    tl.fromTo('.energy-beams .beam', {
        scaleY: 0,
        opacity: 0
    }, {
        scaleY: 1,
        opacity: 0.6,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power2.out'
    }, '-=0.6')
    
    // 数据流效果
    tl.fromTo('.data-stream .stream-line', {
        scaleY: 0,
        opacity: 0
    }, {
        scaleY: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out'
    }, '-=0.8')
    
    // 进度条出现
    tl.fromTo('.loading-progress', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.4')
    
    return tl
}

// 隐藏loading动画
async function hide() {
    return new Promise((resolve) => {
        const tl = gsap.timeline()
        
        // 扫描线消失
        tl.to('.scan-line', {
            scaleX: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        })
        
        // 扫描网格消失
        tl.to('.scan-grid .grid-line', {
            scaleX: 0,
            scaleY: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: 'power2.in'
        }, '-=0.3')
        
        // 能量光束消失
        tl.to('.energy-beams .beam', {
            scaleY: 0,
            opacity: 0,
            duration: 0.3,
            stagger: 0.03,
            ease: 'power2.in'
        }, '-=0.3')
        
        // 浮动元素消失
        tl.to('.floating-elements .float-icon', {
            scale: 0,
            opacity: 0,
            y: -100,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.in(1.2)'
        }, '-=0.4')
        
        // 脉冲波纹消失
        tl.to('.pulse-waves .wave', {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.in'
        }, '-=0.4')
        
        // 数据流消失
        tl.to('.data-stream .stream-line', {
            scaleY: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: 'power2.in'
        }, '-=0.3')
        
        // 装饰环消失
        tl.to('.tech-rings .ring', {
            scale: 0,
            opacity: 0,
            rotation: 180,
            duration: 0.6,
            stagger: 0.08,
            ease: 'back.in(1.7)'
        }, '-=0.2')
        
        // 副标题消失
        tl.to('.loading-subtitle', {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        }, '-=0.4')
        
        // 文字消失
        tl.to('.loading-text span', {
            y: -100,
            opacity: 0,
            rotationX: 90,
            scale: 0.5,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power4.in'
        }, '-=0.4')
        
        // 进度条消失
        tl.to('.loading-progress', {
            opacity: 0,
            scale: 0.8,
            y: 30,
            duration: 0.6,
            ease: 'power2.in'
        }, '-=0.6')
        
        // 整体淡出
        tl.to('.loading', {
            opacity: 0,
            scale: 1.1,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                visible.value = false
                resolve()
            }
        }, '-=0.3')
    })
}

// 显示loading动画
function show() {
    visible.value = true
    // 重置所有元素状态
    gsap.set('.loading', { opacity: 1, scale: 1 })
    
    // 延迟执行入场动画，确保DOM已渲染
    gsap.delayedCall(0.1, () => {
        createEntranceAnimation()
    })
}

// 组件挂载时执行入场动画
onMounted(() => {
    if (visible.value) {
        createEntranceAnimation()
    }
})

// 暴露方法给父组件
defineExpose({
    hide,
    show
})
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at center, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 0.98) 100%);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  
  // 科技感背景网格
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: grid-move 20s linear infinite;
    opacity: 0.3;
  }
  
  // 科技感粒子效果
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    background: #3b82f6;
    border-radius: 50%;
    box-shadow: 
      100px 200px 0 #3b82f6,
      300px 100px 0 #06b6d4,
      500px 300px 0 #8b5cf6,
      700px 150px 0 #3b82f6,
      900px 250px 0 #06b6d4,
      200px 400px 0 #8b5cf6,
      600px 450px 0 #3b82f6,
      800px 350px 0 #06b6d4,
      1100px 200px 0 #8b5cf6,
      1300px 400px 0 #3b82f6;
    animation: particles-float 15s ease-in-out infinite;
  }
}

.loading-text {
  font-family: 'Orbitron', 'Arial', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 0.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  span {
    display: inline-block;
    color: transparent;
    background: linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    animation: 
      text-glow calc(0.5s + var(--index) * 0.1s) ease-in-out infinite alternate,
      gradient-shift 3s ease-in-out infinite;
    text-shadow: 
      0 0 20px rgba(59, 130, 246, 0.5),
      0 0 40px rgba(59, 130, 246, 0.3),
      0 0 60px rgba(59, 130, 246, 0.2);
    position: relative;
    
    &::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      filter: blur(2px);
      z-index: -1;
      animation: gradient-shift 3s ease-in-out infinite;
    }
  }
}

// 副标题样式
.loading-subtitle {
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 1.2rem;
  color: #06b6d4;
  margin-bottom: 3rem;
  position: relative;
  text-align: center;
  
  span {
    position: relative;
    z-index: 2;
    text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
  }
  
  .subtitle-line {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #06b6d4, transparent);
    animation: subtitle-pulse 2s ease-in-out infinite;
  }
}

.loading-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: 'Orbitron', 'Arial', sans-serif;
  position: relative;
  
  .progress-wrapper {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    
    .value {
      font-size: 3rem;
      font-weight: 600;
      color: #3b82f6;
      text-shadow: 
        0 0 20px rgba(59, 130, 246, 0.8),
        0 0 40px rgba(59, 130, 246, 0.4);
      animation: progress-pulse 2s ease-in-out infinite;
    }
    
    .unit {
      font-size: 1.5rem;
      color: #06b6d4;
      text-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
    }
  }
  
  .progress-bar-container {
    position: relative;
    width: 300px;
    height: 6px;
    
    .progress-bar-bg {
      width: 100%;
      height: 100%;
      background: rgba(59, 130, 246, 0.2);
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(59, 130, 246, 0.4) 50%, 
          transparent 100%
        );
        animation: progress-scan 2s ease-in-out infinite;
      }
    }
    
    .progress-bar-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6);
      border-radius: 10px;
      width: calc(var(--progress, 0) * 300px);
      box-shadow: 
        0 0 10px rgba(59, 130, 246, 0.6),
        0 0 20px rgba(59, 130, 246, 0.3);
      transition: width 0.3s ease;
    }
    
    .progress-particles {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      transform: translateY(-50%);
      
      .particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: #3b82f6;
        border-radius: 50%;
        animation: particle-flow 3s ease-in-out infinite;
        animation-delay: var(--delay, 0s);
        box-shadow: 0 0 6px rgba(59, 130, 246, 0.8);
        
        &:nth-child(1) { left: 10%; }
        &:nth-child(2) { left: 25%; }
        &:nth-child(3) { left: 50%; }
        &:nth-child(4) { left: 75%; }
        &:nth-child(5) { left: 90%; }
      }
    }
  }
}

// 科技感扫描线
.scan-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    #3b82f6 20%, 
    #06b6d4 50%, 
    #8b5cf6 80%, 
    transparent 100%
  );
  transform: translateY(-50%);
  animation: scan-sweep 3s ease-in-out infinite;
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.8),
    0 0 40px rgba(59, 130, 246, 0.4);
}

// 科技感装饰环
.tech-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  
  .ring {
    position: absolute;
    border: 1px solid;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    &.ring-1 {
      width: 300px;
      height: 300px;
      border-color: rgba(59, 130, 246, 0.3);
      animation: ring-rotate 20s linear infinite;
    }
    
    &.ring-2 {
      width: 400px;
      height: 400px;
      border-color: rgba(6, 182, 212, 0.2);
      animation: ring-rotate 25s linear infinite reverse;
    }
    
    &.ring-3 {
      width: 500px;
      height: 500px;
      border-color: rgba(139, 92, 246, 0.15);
      animation: ring-rotate 30s linear infinite;
    }
    
    &.ring-4 {
      width: 600px;
      height: 600px;
      border-color: rgba(34, 197, 94, 0.1);
      animation: ring-rotate 35s linear infinite reverse;
      border-style: dashed;
    }
  }
}

// 扫描网格
.scan-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .grid-line {
    position: absolute;
    background: rgba(59, 130, 246, 0.2);
    animation: grid-line-scan 4s ease-in-out infinite;
    animation-delay: var(--delay, 0s);
    
    &.horizontal {
      width: 100%;
      height: 1px;
      top: calc(12.5% * var(--index, 1));
      left: 0;
    }
    
    &.vertical {
      width: 1px;
      height: 100%;
      left: calc(8.33% * var(--index, 1));
      top: 0;
    }
  }
}

// 浮动装饰元素
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .float-icon {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateY(-200px);
    animation: float-orbit 8s ease-in-out infinite;
    animation-delay: var(--delay, 0s);
    
    .icon-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 50%;
      backdrop-filter: blur(10px);
      animation: icon-pulse 2s ease-in-out infinite;
      box-shadow: 
        0 0 15px rgba(59, 130, 246, 0.3),
        inset 0 0 15px rgba(59, 130, 246, 0.1);
    }
  }
}

// 脉冲波纹
.pulse-waves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  
  .wave {
    position: absolute;
    border: 2px solid rgba(59, 130, 246, 0.3);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: wave-pulse 3s ease-out infinite;
    animation-delay: var(--delay, 0s);
    
    &:nth-child(1) { width: 100px; height: 100px; }
    &:nth-child(2) { width: 150px; height: 150px; }
    &:nth-child(3) { width: 200px; height: 200px; }
    &:nth-child(4) { width: 250px; height: 250px; }
  }
}

// 能量光束
.energy-beams {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  
  .beam {
    position: absolute;
    width: 2px;
    height: 300px;
    background: linear-gradient(to top, 
      transparent 0%, 
      rgba(59, 130, 246, 0.6) 30%, 
      rgba(6, 182, 212, 0.8) 50%, 
      rgba(59, 130, 246, 0.6) 70%, 
      transparent 100%
    );
    top: 50%;
    left: 50%;
    transform-origin: center bottom;
    transform: translate(-50%, 0) rotate(var(--angle, 0deg));
    animation: beam-rotate 6s linear infinite, beam-intensity 2s ease-in-out infinite;
    animation-delay: var(--delay, 0s);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
  }
}

// 数据流效果
.data-stream {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .stream-line {
    position: absolute;
    width: 2px;
    height: 120px;
    background: linear-gradient(to bottom, 
      transparent 0%, 
      #3b82f6 20%,
      #06b6d4 50%, 
      #8b5cf6 80%,
      transparent 100%
    );
    animation: stream-flow 4s ease-in-out infinite;
    animation-delay: var(--delay, 0s);
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
    
    &:nth-child(1) { left: var(--position, 10%); top: 5%; }
    &:nth-child(2) { left: var(--position, 20%); top: 10%; }
    &:nth-child(3) { right: var(--position, 25%); top: 8%; }
    &:nth-child(4) { right: var(--position, 15%); top: 15%; }
    &:nth-child(5) { left: var(--position, 35%); bottom: 20%; }
    &:nth-child(6) { right: var(--position, 35%); bottom: 15%; }
    &:nth-child(7) { left: var(--position, 70%); top: 25%; }
    &:nth-child(8) { right: var(--position, 55%); bottom: 25%; }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background: #3b82f6;
      border-radius: 50%;
      animation: stream-particle 4s ease-in-out infinite;
      animation-delay: var(--delay, 0s);
      box-shadow: 0 0 12px rgba(59, 130, 246, 0.8);
    }
  }
}

// 动画关键帧
@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}

@keyframes particles-float {
  0%, 100% { 
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

@keyframes text-glow {
  0% {
    filter: brightness(1) saturate(1);
    transform: scale(1);
  }
  100% {
    filter: brightness(1.3) saturate(1.5);
    transform: scale(1.05);
  }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes progress-pulse {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.1);
    filter: brightness(1.3);
  }
}

@keyframes progress-bar {
  0% {
    box-shadow: 0 0 0 rgba(59, 130, 246, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  }
  100% {
    box-shadow: 0 0 0 rgba(59, 130, 246, 0);
  }
}

// 新增科技感动画
@keyframes scan-sweep {
  0% {
    transform: translateY(-50%) scaleX(0);
    opacity: 0;
  }
  20% {
    transform: translateY(-50%) scaleX(1);
    opacity: 1;
  }
  80% {
    transform: translateY(-50%) scaleX(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-50%) scaleX(0);
    opacity: 0;
  }
}

@keyframes ring-rotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes stream-flow {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(50px);
    opacity: 0;
  }
}

// 新增动画关键帧
@keyframes subtitle-pulse {
  0%, 100% {
    opacity: 0.6;
    transform: translateX(-50%) scaleX(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scaleX(1.2);
  }
}

@keyframes progress-scan {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes particle-flow {
  0% {
    transform: translateX(-10px) scale(0);
    opacity: 0;
  }
  20% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  80% {
    transform: translateX(10px) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(20px) scale(0);
    opacity: 0;
  }
}

@keyframes grid-line-scan {
  0%, 100% {
    opacity: 0.1;
    box-shadow: none;
  }
  50% {
    opacity: 0.6;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
  }
}

@keyframes float-orbit {
  0% {
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateY(-200px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateY(-200px) rotate(360deg);
  }
}

@keyframes icon-pulse {
  0%, 100% {
    transform: scale(1);
    background: rgba(59, 130, 246, 0.1);
  }
  50% {
    transform: scale(1.1);
    background: rgba(59, 130, 246, 0.2);
  }
}

@keyframes wave-pulse {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

@keyframes beam-rotate {
  0% {
    transform: translate(-50%, 0) rotate(var(--angle, 0deg));
  }
  100% {
    transform: translate(-50%, 0) rotate(calc(var(--angle, 0deg) + 360deg));
  }
}

@keyframes beam-intensity {
  0%, 100% {
    opacity: 0.4;
    filter: blur(1px);
  }
  50% {
    opacity: 0.8;
    filter: blur(0px);
  }
}

@keyframes stream-particle {
  0% {
    transform: translateX(-50%) translateY(-10px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(120px);
    opacity: 0;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .loading-text {
    font-size: 2.5rem;
    letter-spacing: 0.3rem;
    margin-bottom: 2rem;
  }
  
  .loading-progress .value {
    font-size: 2rem;
  }
  
  .loading-progress .unit {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .loading-text {
    font-size: 2rem;
    letter-spacing: 0.2rem;
  }
  
  .loading-progress .value {
    font-size: 1.5rem;
  }
}
</style>