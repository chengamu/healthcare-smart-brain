<template>
    <div class="loading" v-show="visible">
        <!-- 全屏扫描雷达 -->
        <div class="radar-scanner">
            <div class="radar-sweep"></div>
            <div class="radar-rings">
                <div class="radar-ring" v-for="n in 6" :key="n" :style="`--size: ${n * 80}px; --delay: ${n * 0.3}s`"></div>
            </div>
        </div>
        
        <!-- 科技感扫描线 -->
        <div class="scan-line"></div>
        
        <!-- 高密度科技网格 -->
        <div class="tech-grid">
            <div class="grid-line horizontal" v-for="n in 16" :key="'h' + n" :style="`--delay: ${n * 0.15}s; --position: ${n * 6.25}%`"></div>
            <div class="grid-line vertical" v-for="n in 24" :key="'v' + n" :style="`--delay: ${n * 0.1}s; --position: ${n * 4.17}%`"></div>
            <div class="grid-nodes">
                <div class="node" v-for="n in 50" :key="n" :style="`--x: ${Math.random() * 100}%; --y: ${Math.random() * 100}%; --delay: ${n * 0.1}s`"></div>
            </div>
        </div>
        
        <!-- 3D全息投影边框 -->
        <div class="hologram-border">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            <div class="edge edge-top"></div>
            <div class="edge edge-bottom"></div>
            <div class="edge edge-left"></div>
            <div class="edge edge-right"></div>
        </div>
        
        <!-- 3D全息文字效果 -->
        <div class="holographic-text">
            <div class="main-text">
                <span v-for="(letter, index) in letters" 
                      :key="index" 
                      :style="`--index: ${index + 1}; --char-code: ${letter.charCodeAt(0)}`"
                      :data-text="letter" 
                      class="holo-char">{{ letter }}</span>
            </div>
            <div class="text-glitch" aria-hidden="true">
                <span v-for="(letter, index) in letters" 
                      :key="'glitch' + index" 
                      :style="`--index: ${index + 1}`"
                      class="glitch-char">{{ letter }}</span>
            </div>
            <div class="text-reflection" aria-hidden="true">
                <span v-for="(letter, index) in letters" 
                      :key="'reflect' + index" 
                      :style="`--index: ${index + 1}`"
                      class="reflect-char">{{ letter }}</span>
            </div>
        </div>
        
        <!-- 科技副标题 -->
        <div class="tech-subtitle">
            <div class="subtitle-container">
                <span class="subtitle-text">银发经济生命健康产业大脑</span>
                <div class="subtitle-effects">
                    <div class="typing-cursor"></div>
                    <div class="scan-overlay"></div>
                </div>
            </div>
            <div class="subtitle-decorations">
                <div class="deco-line left"></div>
                <div class="deco-line right"></div>
                <div class="deco-dots">
                    <div class="dot" v-for="n in 5" :key="n" :style="`--delay: ${n * 0.2}s`"></div>
                </div>
            </div>
        </div>
        
        <!-- 高科技进度显示 -->
        <div class="advanced-progress" :style="`--progress: ${progress / 100}`">
            <div class="progress-display">
                <div class="progress-wrapper">
                    <div class="digital-counter">
                        <span class="value">{{ progress.toString().padStart(3, '0') }}</span>
                        <span class="unit">%</span>
                    </div>
                    <div class="loading-status">
                        <span class="status-text">{{ getLoadingStatus(progress) }}</span>
                    </div>
                </div>
            </div>
            
            <!-- 3D进度环 -->
            <div class="progress-ring-container">
                <svg class="progress-ring" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#3b82f6" />
                            <stop offset="50%" stop-color="#06b6d4" />
                            <stop offset="100%" stop-color="#8b5cf6" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/> 
                            </feMerge>
                        </filter>
                    </defs>
                    <circle class="progress-ring-bg" cx="100" cy="100" r="85" 
                            fill="none" stroke="rgba(59, 130, 246, 0.2)" stroke-width="2"/>
                    <circle class="progress-ring-fill" cx="100" cy="100" r="85" 
                            fill="none" stroke="url(#progressGradient)" stroke-width="3"
                            stroke-linecap="round" filter="url(#glow)"
                            :stroke-dasharray="534" 
                            :stroke-dashoffset="534 - (534 * progress / 100)"/>
                </svg>
                <div class="ring-particles">
                    <div class="ring-particle" v-for="n in 12" :key="n" 
                         :style="`--angle: ${n * 30}deg; --delay: ${n * 0.1}s`"></div>
                </div>
            </div>
            
            <!-- 数据流进度条 -->
            <div class="data-progress-bar">
                <div class="progress-track">
                    <div class="track-segments">
                        <div class="segment" v-for="n in 20" :key="n" 
                             :class="{ active: n <= Math.floor(progress / 5) }"
                             :style="`--delay: ${n * 0.05}s`"></div>
                    </div>
                    <div class="progress-runner" :style="`--progress: ${progress / 100}`"></div>
                    <div class="energy-particles">
                        <div class="energy-particle" v-for="n in 8" :key="n" 
                             :style="`--delay: ${n * 0.15}s; --speed: ${1 + n * 0.1}s`"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 3D科技装饰环系统 -->
        <div class="orbital-system">
            <div class="orbit-ring orbit-1">
                <div class="orbit-path"></div>
                <div class="orbit-nodes">
                    <div class="node" v-for="n in 8" :key="n" :style="`--angle: ${n * 45}deg`"></div>
                </div>
            </div>
            <div class="orbit-ring orbit-2">
                <div class="orbit-path"></div>
                <div class="orbit-nodes">
                    <div class="node" v-for="n in 12" :key="n" :style="`--angle: ${n * 30}deg`"></div>
                </div>
            </div>
            <div class="orbit-ring orbit-3">
                <div class="orbit-path"></div>
                <div class="orbit-nodes">
                    <div class="node" v-for="n in 16" :key="n" :style="`--angle: ${n * 22.5}deg`"></div>
                </div>
            </div>
            <div class="orbit-ring orbit-4">
                <div class="orbit-path"></div>
                <div class="orbit-satellites">
                    <div class="satellite" v-for="n in 6" :key="n" :style="`--angle: ${n * 60}deg; --delay: ${n * 0.3}s`">
                        <div class="satellite-trail"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 数据流效果 -->
        <div class="data-stream">
            <div class="stream-line" v-for="n in 8" :key="n" :style="`--delay: ${n * 0.15}s; --position: ${n * 12.5}%`"></div>
        </div>
        
        <!-- 3D全息图标群 -->
        <div class="holographic-icons">
            <div class="icon-cluster" v-for="(icon, index) in techIcons" :key="index" 
                 :style="`--x: ${icon.x}%; --y: ${icon.y}%; --delay: ${index * 0.3}s; --scale: ${icon.scale}`">
                <div class="holo-icon">
                    <div class="icon-core">{{ icon.symbol }}</div>
                    <div class="icon-glow"></div>
                    <div class="icon-scan-line"></div>
                    <div class="icon-data-stream">
                        <div class="data-bit" v-for="n in 4" :key="n" :style="`--delay: ${n * 0.2}s`"></div>
                    </div>
                </div>
                <div class="icon-label">{{ icon.label }}</div>
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

// 科技图标数据
const techIcons = ref([
    { symbol: '⚛', label: 'AI', x: 15, y: 25, scale: 1.2 },
    { symbol: '🧬', label: 'DNA', x: 85, y: 20, scale: 1.0 },
    { symbol: '💊', label: 'DRUG', x: 20, y: 75, scale: 1.1 },
    { symbol: '🔬', label: 'LAB', x: 80, y: 80, scale: 1.0 },
    { symbol: '📊', label: 'DATA', x: 50, y: 15, scale: 0.9 },
    { symbol: '🎯', label: 'TARGET', x: 50, y: 85, scale: 1.0 },
    { symbol: '🧠', label: 'BRAIN', x: 10, y: 50, scale: 1.3 },
    { symbol: '💡', label: 'IDEA', x: 90, y: 50, scale: 1.1 }
])

// 获取加载状态文本
function getLoadingStatus(progress) {
    if (progress < 20) return 'INITIALIZING SYSTEM...'
    if (progress < 40) return 'LOADING CORE MODULES...'
    if (progress < 60) return 'CONNECTING TO NETWORK...'
    if (progress < 80) return 'SYNCING DATA...'
    if (progress < 95) return 'FINALIZING...'
    return 'READY TO LAUNCH'
}

// 创建科技感入场动画
function createEntranceAnimation() {
    const tl = gsap.timeline()
    
    // 雷达扫描启动
    tl.fromTo('.radar-scanner', {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out'
    })
    
    // 全息边框激活
    tl.fromTo('.hologram-border .corner', {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=1')
    
    tl.fromTo('.hologram-border .edge', {
        scaleX: 0,
        scaleY: 0,
        opacity: 0
    }, {
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.6')
    
    // 科技网格展开
    tl.fromTo('.tech-grid .grid-line', {
        scaleX: 0,
        scaleY: 0,
        opacity: 0
    }, {
        scaleX: 1,
        scaleY: 1,
        opacity: 0.4,
        duration: 1.2,
        stagger: 0.03,
        ease: 'power2.out'
    }, '-=0.8')
    
    // 网格节点激活
    tl.fromTo('.tech-grid .node', {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 0.6,
        duration: 0.6,
        stagger: 0.02,
        ease: 'back.out(1.2)'
    }, '-=0.6')
    
    // 轨道系统启动
    tl.fromTo('.orbital-system .orbit-ring', {
        scale: 0,
        opacity: 0,
        rotation: -180
    }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.3)'
    }, '-=1')
    
    // 全息文字效果
    tl.fromTo('.holographic-text .holo-char', {
        y: 150,
        opacity: 0,
        rotationX: -90,
        scale: 0.3,
        filter: 'blur(10px)'
    }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.08,
        ease: 'back.out(1.7)'
    }, '-=1')
    
    // 科技副标题
    tl.fromTo('.tech-subtitle', {
        y: 60,
        opacity: 0,
        filter: 'blur(5px)'
    }, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
    }, '-=0.8')
    
    // 进度环系统
    tl.fromTo('.advanced-progress', {
        scale: 0.5,
        opacity: 0,
        rotationY: 180
    }, {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: 'power2.out'
    }, '-=0.6')
    
    // 全息图标群
    tl.fromTo('.holographic-icons .icon-cluster', {
        scale: 0,
        opacity: 0,
        y: 100,
        rotationY: -180
    }, {
        scale: 1,
        opacity: 0.9,
        y: 0,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'back.out(1.2)'
    }, '-=0.8')
    
    // 扫描线启动
    tl.fromTo('.scan-line', {
        scaleX: 0,
        opacity: 0
    }, {
        scaleX: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out'
    }, '-=1')
    
    return tl
}

// 隐藏loading动画
async function hide() {
    return new Promise((resolve) => {
        const tl = gsap.timeline()
        
        // 雷达扫描停止
        tl.to('.radar-scanner', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in'
        })
        
        // 全息图标消失
        tl.to('.holographic-icons .icon-cluster', {
            scale: 0,
            opacity: 0,
            y: -150,
            rotationY: 180,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.in(1.7)'
        }, '-=0.6')
        
        // 轨道系统关闭
        tl.to('.orbital-system .orbit-ring', {
            scale: 0,
            opacity: 0,
            rotation: 360,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.in'
        }, '-=0.6')
        
        // 科技网格收缩
        tl.to('.tech-grid .grid-line', {
            scaleX: 0,
            scaleY: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power2.in'
        }, '-=0.8')
        
        // 全息边框消失
        tl.to('.hologram-border .edge', {
            scaleX: 0,
            scaleY: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.in'
        }, '-=0.5')
        
        tl.to('.hologram-border .corner', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.in(1.7)'
        }, '-=0.4')
        
        // 进度系统消失
        tl.to('.advanced-progress', {
            scale: 0.3,
            opacity: 0,
            rotationY: -180,
            y: 50,
            duration: 0.8,
            ease: 'power2.in'
        }, '-=0.6')
        
        // 科技副标题消失
        tl.to('.tech-subtitle', {
            y: -60,
            opacity: 0,
            filter: 'blur(10px)',
            duration: 0.6,
            ease: 'power2.in'
        }, '-=0.5')
        
        // 全息文字消失
        tl.to('.holographic-text .holo-char', {
            y: -150,
            opacity: 0,
            rotationX: 90,
            scale: 0.3,
            filter: 'blur(15px)',
            duration: 1,
            stagger: 0.04,
            ease: 'power4.in'
        }, '-=0.4')
        
        // 扫描线消失
        tl.to('.scan-line', {
            scaleX: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        }, '-=0.8')
        
        // 整体淡出
        tl.to('.loading', {
            opacity: 0,
            scale: 1.2,
            filter: 'blur(20px)',
            duration: 1.2,
            ease: 'power2.inOut',
            onComplete: () => {
                visible.value = false
                resolve()
            }
        }, '-=0.6')
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
  background: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(2, 6, 23, 0.99) 100%);
  backdrop-filter: blur(30px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  perspective: 1000px;
  
  // 高科技背景网格
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
      radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 80px 80px;
    animation: grid-matrix 25s linear infinite;
    opacity: 0.4;
  }
  
  // 3D粒子效果
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.8) 1px, transparent 1px),
      radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.6) 1px, transparent 1px),
      radial-gradient(circle at 30% 80%, rgba(139, 92, 246, 0.7) 1px, transparent 1px),
      radial-gradient(circle at 70% 70%, rgba(34, 197, 94, 0.5) 1px, transparent 1px);
    background-size: 150px 150px, 200px 200px, 180px 180px, 220px 220px;
    animation: particles-drift 20s ease-in-out infinite;
  }
}

// 雷达扫描系统
.radar-scanner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  pointer-events: none;
  
  .radar-sweep {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 400px;
    background: linear-gradient(
      to top,
      transparent 0%,
      rgba(59, 130, 246, 0.8) 20%,
      rgba(6, 182, 212, 1) 50%,
      transparent 100%
    );
    transform-origin: center bottom;
    transform: translate(-50%, 0) rotate(0deg);
    animation: radar-sweep 4s linear infinite;
    filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.8));
  }
  
  .radar-rings {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    .radar-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--size);
      height: var(--size);
      border: 1px solid rgba(6, 182, 212, 0.3);
      border-radius: 50%;
      animation: 
        radar-ring-pulse 3s ease-in-out infinite,
        radar-ring-fade 6s ease-in-out infinite;
      animation-delay: var(--delay);
      
      &::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 50%;
        animation: ring-glow 2s ease-in-out infinite alternate;
      }
    }
  }
}

// 3D全息边框
.hologram-border {
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
  bottom: 10%;
  pointer-events: none;
  
  .corner {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 2px solid #06b6d4;
    
    &.corner-tl {
      top: 0;
      left: 0;
      border-right: none;
      border-bottom: none;
      animation: corner-glow 3s ease-in-out infinite;
    }
    
    &.corner-tr {
      top: 0;
      right: 0;
      border-left: none;
      border-bottom: none;
      animation: corner-glow 3s ease-in-out infinite 0.5s;
    }
    
    &.corner-bl {
      bottom: 0;
      left: 0;
      border-right: none;
      border-top: none;
      animation: corner-glow 3s ease-in-out infinite 1s;
    }
    
    &.corner-br {
      bottom: 0;
      right: 0;
      border-left: none;
      border-top: none;
      animation: corner-glow 3s ease-in-out infinite 1.5s;
    }
  }
  
  .edge {
    position: absolute;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(6, 182, 212, 0.6) 50%, 
      transparent 100%
    );
    
    &.edge-top {
      top: 0;
      left: 40px;
      right: 40px;
      height: 1px;
      animation: edge-scan 4s ease-in-out infinite;
    }
    
    &.edge-bottom {
      bottom: 0;
      left: 40px;
      right: 40px;
      height: 1px;
      animation: edge-scan 4s ease-in-out infinite 2s;
    }
    
    &.edge-left {
      left: 0;
      top: 40px;
      bottom: 40px;
      width: 1px;
      background: linear-gradient(180deg, 
        transparent 0%, 
        rgba(6, 182, 212, 0.6) 50%, 
        transparent 100%
      );
      animation: edge-scan 4s ease-in-out infinite 1s;
    }
    
    &.edge-right {
      right: 0;
      top: 40px;
      bottom: 40px;
      width: 1px;
      background: linear-gradient(180deg, 
        transparent 0%, 
        rgba(6, 182, 212, 0.6) 50%, 
        transparent 100%
      );
      animation: edge-scan 4s ease-in-out infinite 3s;
    }
  }
}

// 高密度科技网格
.tech-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .grid-line {
    position: absolute;
    background: rgba(59, 130, 246, 0.2);
    animation: 
      grid-pulse 3s ease-in-out infinite,
      grid-scan 8s linear infinite;
    animation-delay: var(--delay);
    
    &.horizontal {
      width: 100%;
      height: 1px;
      top: var(--position);
      left: 0;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 20%;
        height: 100%;
        background: linear-gradient(90deg, 
          rgba(6, 182, 212, 0.8) 0%, 
          transparent 100%
        );
        animation: line-runner 4s linear infinite;
      }
    }
    
    &.vertical {
      width: 1px;
      height: 100%;
      left: var(--position);
      top: 0;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(180deg, 
          rgba(6, 182, 212, 0.8) 0%, 
          transparent 100%
        );
        animation: line-runner-vertical 4s linear infinite;
        animation-delay: calc(var(--delay) + 1s);
      }
    }
  }
  
  .grid-nodes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    .node {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #3b82f6;
      border-radius: 50%;
      left: var(--x);
      top: var(--y);
      animation: 
        node-pulse 2s ease-in-out infinite,
        node-drift 8s ease-in-out infinite;
      animation-delay: var(--delay);
      box-shadow: 
        0 0 10px rgba(59, 130, 246, 0.8),
        0 0 20px rgba(59, 130, 246, 0.4);
      
      &::before {
        content: '';
        position: absolute;
        top: -8px;
        left: -8px;
        width: 20px;
        height: 20px;
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        animation: node-ring 3s linear infinite;
      }
    }
  }
}

// 3D全息文字效果
.holographic-text {
  position: relative;
  font-family: 'Orbitron', 'Arial', sans-serif;
  font-size: 4.5rem;
  font-weight: 800;
  letter-spacing: 0.8rem;
  margin-bottom: 2rem;
  transform-style: preserve-3d;
  
  .main-text {
    position: relative;
    z-index: 3;
    
    .holo-char {
      display: inline-block;
      color: transparent;
      background: linear-gradient(
        45deg, 
        #3b82f6 0%, 
        #06b6d4 25%, 
        #8b5cf6 50%, 
        #06b6d4 75%, 
        #3b82f6 100%
      );
      background-size: 400% 400%;
      background-clip: text;
      -webkit-background-clip: text;
      animation: 
        holo-text-glow calc(1s + var(--index) * 0.1s) ease-in-out infinite alternate,
        holo-gradient-shift 4s ease-in-out infinite,
        holo-3d-float calc(3s + var(--index) * 0.2s) ease-in-out infinite;
      text-shadow: 
        0 0 30px rgba(59, 130, 246, 0.8),
        0 0 60px rgba(59, 130, 246, 0.5),
        0 0 90px rgba(59, 130, 246, 0.3);
      position: relative;
      transform-style: preserve-3d;
      
      &::before {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(
          45deg, 
          rgba(59, 130, 246, 0.8) 0%, 
          rgba(6, 182, 212, 0.8) 50%, 
          rgba(139, 92, 246, 0.8) 100%
        );
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        filter: blur(3px);
        z-index: -1;
        transform: translateZ(-10px);
        animation: holo-gradient-shift 4s ease-in-out infinite;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(6, 182, 212, 0.3) 45%,
          rgba(6, 182, 212, 0.6) 50%,
          rgba(6, 182, 212, 0.3) 55%,
          transparent 100%
        );
        animation: text-scanner calc(3s + var(--char-code, 65) * 0.02s) linear infinite;
        z-index: 2;
      }
    }
  }
  
  .text-glitch {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    
    .glitch-char {
      display: inline-block;
      color: rgba(255, 0, 100, 0.5);
      animation: 
        glitch-effect calc(4s + var(--index) * 0.3s) linear infinite,
        glitch-shift calc(2s + var(--index) * 0.1s) ease-in-out infinite;
      text-shadow: 
        2px 0 0 rgba(0, 255, 255, 0.3),
        -2px 0 0 rgba(255, 0, 100, 0.3);
    }
  }
  
  .text-reflection {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    transform: scaleY(-1) rotateX(15deg);
    opacity: 0.2;
    
    .reflect-char {
      display: inline-block;
      background: linear-gradient(
        180deg,
        rgba(59, 130, 246, 0.3) 0%,
        transparent 70%
      );
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      animation: reflection-wave calc(3s + var(--index) * 0.2s) ease-in-out infinite;
    }
  }
}

// 科技副标题
.tech-subtitle {
  position: relative;
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 1.4rem;
  margin-bottom: 3.5rem;
  
  .subtitle-container {
    position: relative;
    display: inline-block;
    
    .subtitle-text {
      color: #06b6d4;
      text-shadow: 
        0 0 15px rgba(6, 182, 212, 0.8),
        0 0 30px rgba(6, 182, 212, 0.4);
      animation: subtitle-glow 3s ease-in-out infinite alternate;
      position: relative;
      z-index: 2;
    }
    
    .subtitle-effects {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      
      .typing-cursor {
        position: absolute;
        right: -10px;
        top: 0;
        width: 2px;
        height: 100%;
        background: #06b6d4;
        animation: cursor-blink 1.5s infinite;
        box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
      }
      
      .scan-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(6, 182, 212, 0.3) 48%,
          rgba(6, 182, 212, 0.6) 50%,
          rgba(6, 182, 212, 0.3) 52%,
          transparent 100%
        );
        animation: subtitle-scan 4s ease-in-out infinite;
      }
    }
  }
  
  .subtitle-decorations {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 40px;
    
    .deco-line {
      position: absolute;
      top: 50%;
      width: 60px;
      height: 1px;
      background: linear-gradient(
        90deg,
        rgba(6, 182, 212, 0.8) 0%,
        transparent 100%
      );
      
      &.left {
        left: -80px;
        animation: deco-expand 2s ease-in-out infinite alternate;
      }
      
      &.right {
        right: -80px;
        transform: scaleX(-1);
        animation: deco-expand 2s ease-in-out infinite alternate 0.5s;
      }
    }
    
    .deco-dots {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      
      .dot {
        width: 4px;
        height: 4px;
        background: #06b6d4;
        border-radius: 50%;
        animation: 
          dot-pulse 2s ease-in-out infinite,
          dot-float 3s ease-in-out infinite;
        animation-delay: var(--delay);
        box-shadow: 0 0 8px rgba(6, 182, 212, 0.6);
      }
    }
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
  height: 3px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(59, 130, 246, 0.3) 10%,
    rgba(6, 182, 212, 1) 30%, 
    rgba(139, 92, 246, 1) 50%, 
    rgba(6, 182, 212, 1) 70%,
    rgba(59, 130, 246, 0.3) 90%,
    transparent 100%
  );
  transform: translateY(-50%);
  animation: 
    scan-line-sweep 4s ease-in-out infinite,
    scan-line-intensity 2s ease-in-out infinite alternate;
  box-shadow: 
    0 0 30px rgba(6, 182, 212, 0.8),
    0 0 60px rgba(6, 182, 212, 0.4),
    0 0 90px rgba(6, 182, 212, 0.2);
  border-radius: 2px;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 30%;
    width: 40%;
    height: 23px;
    background: radial-gradient(ellipse, 
      rgba(6, 182, 212, 0.3) 0%, 
      transparent 70%
    );
    animation: scan-aura 4s ease-in-out infinite;
  }
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

// 3D全息图标群
.holographic-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .icon-cluster {
    position: absolute;
    left: var(--x);
    top: var(--y);
    transform: scale(var(--scale, 1));
    animation: 
      icon-float 6s ease-in-out infinite,
      icon-drift 12s ease-in-out infinite;
    animation-delay: var(--delay);
    
    .holo-icon {
      position: relative;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .icon-core {
        font-size: 28px;
        background: rgba(59, 130, 246, 0.1);
        border: 2px solid rgba(59, 130, 246, 0.4);
        border-radius: 50%;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        animation: 
          icon-core-pulse 3s ease-in-out infinite,
          icon-core-rotate 8s linear infinite;
        box-shadow: 
          0 0 20px rgba(59, 130, 246, 0.4),
          inset 0 0 20px rgba(59, 130, 246, 0.1);
      }
      
      .icon-glow {
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 1px solid rgba(6, 182, 212, 0.3);
        border-radius: 50%;
        animation: 
          glow-pulse 2s ease-in-out infinite alternate,
          glow-rotate 6s linear infinite reverse;
      }
      
      .icon-scan-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(6, 182, 212, 0.8) 50%, 
          transparent 100%
        );
        animation: scan-sweep-icon 3s ease-in-out infinite;
        border-radius: 1px;
      }
      
      .icon-data-stream {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        .data-bit {
          position: absolute;
          width: 2px;
          height: 8px;
          background: rgba(139, 92, 246, 0.8);
          border-radius: 1px;
          animation: data-bit-flow 2s ease-in-out infinite;
          animation-delay: var(--delay);
          
          &:nth-child(1) { top: 10%; left: 90%; }
          &:nth-child(2) { top: 90%; left: 10%; }
          &:nth-child(3) { top: 50%; left: 5%; }
          &:nth-child(4) { top: 20%; left: 95%; }
        }
      }
    }
    
    .icon-label {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.7rem;
      color: rgba(6, 182, 212, 0.8);
      text-shadow: 0 0 8px rgba(6, 182, 212, 0.6);
      margin-top: 8px;
      white-space: nowrap;
      animation: label-glow 3s ease-in-out infinite alternate;
      font-family: 'Orbitron', monospace;
      letter-spacing: 0.1rem;
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

// 在文件的最后添加完整的动画关键帧
@keyframes holo-text-glow {
  0% {
    filter: brightness(1) saturate(1);
    transform: scale(1) rotateY(0deg);
  }
  100% {
    filter: brightness(1.5) saturate(1.8);
    transform: scale(1.08) rotateY(5deg);
  }
}

@keyframes holo-gradient-shift {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}

@keyframes holo-3d-float {
  0%, 100% {
    transform: translateZ(0px) rotateX(0deg);
  }
  50% {
    transform: translateZ(20px) rotateX(10deg);
  }
}

@keyframes text-scanner {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes glitch-effect {
  0%, 90%, 100% {
    transform: translateX(0);
    opacity: 0;
  }
  1%, 3%, 5% {
    transform: translateX(-2px);
    opacity: 0.7;
  }
  2%, 4% {
    transform: translateX(2px);
    opacity: 0.5;
  }
}

@keyframes glitch-shift {
  0% {
    clip-path: inset(0 0 0 0);
  }
  20% {
    clip-path: inset(0 0 90% 0);
  }
  40% {
    clip-path: inset(80% 0 0 0);
  }
  60% {
    clip-path: inset(0 0 70% 0);
  }
  80% {
    clip-path: inset(60% 0 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes reflection-wave {
  0%, 100% {
    opacity: 0.2;
    transform: scaleY(-1) rotateX(15deg) translateY(0);
  }
  50% {
    opacity: 0.4;
    transform: scaleY(-1) rotateX(15deg) translateY(5px);
  }
}

@keyframes subtitle-glow {
  0% {
    text-shadow: 0 0 15px rgba(6, 182, 212, 0.8);
    color: #06b6d4;
  }
  100% {
    text-shadow: 0 0 25px rgba(6, 182, 212, 1);
    color: #3b82f6;
  }
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes subtitle-scan {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes deco-expand {
  0% {
    transform: scaleX(1);
    opacity: 0.6;
  }
  100% {
    transform: scaleX(1.5);
    opacity: 1;
  }
}

@keyframes dot-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

@keyframes dot-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes digital-flicker {
  0%, 98%, 100% {
    opacity: 1;
    filter: brightness(1);
  }
  1%, 3% {
    opacity: 0.8;
    filter: brightness(1.2);
  }
  2% {
    opacity: 0.9;
    filter: brightness(0.9);
  }
}

@keyframes progress-glow {
  0% {
    filter: brightness(1) drop-shadow(0 0 20px rgba(59, 130, 246, 0.8));
  }
  100% {
    filter: brightness(1.3) drop-shadow(0 0 40px rgba(59, 130, 246, 1));
  }
}

@keyframes unit-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes status-typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes status-glow {
  0% {
    text-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
  }
  100% {
    text-shadow: 0 0 20px rgba(139, 92, 246, 1);
  }
}

@keyframes ring-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 40px rgba(59, 130, 246, 1));
  }
}

@keyframes particle-orbit {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-85px) translateZ(10px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-85px) translateZ(10px) rotate(360deg);
  }
}

@keyframes particle-glow {
  0% {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
    transform: scale(1);
  }
  100% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 1);
    transform: scale(1.3);
  }
}

@keyframes segment-standby {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes segment-active {
  0% {
    transform: scaleY(0.5);
    filter: brightness(0.5);
  }
  100% {
    transform: scaleY(1);
    filter: brightness(1.5);
  }
}

@keyframes runner-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.8);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 40px rgba(6, 182, 212, 1);
  }
}

@keyframes runner-ring {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(2) rotate(180deg);
    opacity: 0;
  }
}

@keyframes runner-trail {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scaleX(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scaleX(0);
  }
}

@keyframes energy-flow {
  0% {
    left: 0%;
    opacity: 0;
    transform: translateY(-50%) scale(0.5);
  }
  20% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  80% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  100% {
    left: 100%;
    opacity: 0;
    transform: translateY(-50%) scale(0.5);
  }
}

@keyframes energy-intensity {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5);
  }
}

@keyframes orbit-rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes node-orbit {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-175px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-175px) rotate(-360deg);
  }
}

@keyframes node-glow {
  0% {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
    opacity: 0.8;
  }
  100% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 1);
    opacity: 1;
  }
}

@keyframes satellite-orbit {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-325px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-325px) rotate(-360deg);
  }
}

@keyframes satellite-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes trail-fade {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scaleX(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scaleX(0.5);
  }
}

@keyframes icon-float {
  0%, 100% {
    transform: scale(var(--scale, 1)) translateY(0) rotateZ(0deg);
  }
  50% {
    transform: scale(var(--scale, 1)) translateY(-20px) rotateZ(180deg);
  }
}

@keyframes icon-drift {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

@keyframes icon-core-pulse {
  0%, 100% {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.4);
  }
  50% {
    background: rgba(59, 130, 246, 0.3);
    border-color: rgba(59, 130, 246, 0.8);
  }
}

@keyframes icon-core-rotate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

@keyframes glow-pulse {
  0% {
    border-color: rgba(6, 182, 212, 0.3);
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
  }
  100% {
    border-color: rgba(6, 182, 212, 0.8);
    box-shadow: 0 0 40px rgba(6, 182, 212, 0.6);
  }
}

@keyframes glow-rotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  100% {
    transform: rotate(-360deg) scale(1.1);
  }
}

@keyframes scan-sweep-icon {
  0% {
    top: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@keyframes data-bit-flow {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  20% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes label-glow {
  0% {
    color: rgba(6, 182, 212, 0.8);
    text-shadow: 0 0 8px rgba(6, 182, 212, 0.6);
  }
  100% {
    color: rgba(6, 182, 212, 1);
    text-shadow: 0 0 15px rgba(6, 182, 212, 1);
  }
}

@keyframes scan-line-sweep {
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

@keyframes scan-line-intensity {
  0% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(1.5);
  }
}

@keyframes scan-aura {
  0%, 100% {
    opacity: 0.3;
    transform: scaleY(1);
  }
  50% {
    opacity: 0.8;
    transform: scaleY(1.5);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .holographic-text {
    font-size: 3rem;
    letter-spacing: 0.4rem;
    margin-bottom: 2rem;
  }
  
  .tech-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
  
  .advanced-progress .digital-counter .value {
    font-size: 2.5rem;
  }
  
  .advanced-progress .digital-counter .unit {
    font-size: 1.5rem;
  }
  
  .orbital-system .orbit-ring {
    &.orbit-1 .orbit-path { width: 250px; height: 250px; }
    &.orbit-2 .orbit-path { width: 320px; height: 320px; }
    &.orbit-3 .orbit-path { width: 400px; height: 400px; }
    &.orbit-4 .orbit-path { width: 480px; height: 480px; }
  }
  
  .holographic-icons .icon-cluster {
    .holo-icon {
      width: 45px;
      height: 45px;
      
      .icon-core {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 480px) {
  .holographic-text {
    font-size: 2.2rem;
    letter-spacing: 0.3rem;
  }
  
  .tech-subtitle {
    font-size: 1rem;
  }
  
  .advanced-progress .digital-counter .value {
    font-size: 2rem;
  }
  
  .orbital-system .orbit-ring {
    &.orbit-1 .orbit-path { width: 200px; height: 200px; }
    &.orbit-2 .orbit-path { width: 260px; height: 260px; }
    &.orbit-3 .orbit-path { width: 320px; height: 320px; }
    &.orbit-4 .orbit-path { width: 380px; height: 380px; }
  }
  
  .radar-scanner {
    width: 600px;
    height: 600px;
    
    .radar-sweep {
      height: 300px;
    }
  }
  
  .data-progress-bar {
    width: 300px;
  }
}
</style>