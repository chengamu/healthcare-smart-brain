<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";

// 状态管理
const currentPhase = ref('intro');     // 'intro' | 'main'
const showDecorations = ref(false);    // 是否显示红色装饰元素
const minPlayTime = 3000;              // 最小播放时间（毫秒）
let introStartTime = 0;                // 开场动画开始时间

const introVideoRef = ref(null);
const backgroundVideoRef = ref(null);
const containerRef = ref(null);

let animationTimeline = null;
let decorationAnimations = [];

function handlePageLoadComplete() {
    // 页面加载完成后启动动画
    nextTick(() => {
        startIntroAnimation();
        startBackgroundVideo();
    });
}

function startBackgroundVideo() {
    // 立即开始播放背景视频循环
    if (backgroundVideoRef.value) {
        backgroundVideoRef.value.play();
    }
}

function startIntroAnimation() {
    console.log('开始播放开场动画 ini.mp4');
    introStartTime = Date.now(); // 记录开始时间
    
    // 播放开场动画
    if (introVideoRef.value) {
        // 添加更多事件监听来调试
        introVideoRef.value.addEventListener('loadstart', () => {
            console.log('开场视频开始加载');
        });
        
        introVideoRef.value.addEventListener('canplay', () => {
            console.log('开场视频可以播放了');
        });
        
        introVideoRef.value.addEventListener('playing', () => {
            console.log('开场视频正在播放');
        });
        
        introVideoRef.value.addEventListener('timeupdate', (e) => {
            const current = e.target.currentTime;
            const duration = e.target.duration;
            if (duration) {
                console.log(`开场视频播放进度: ${current.toFixed(1)}s / ${duration.toFixed(1)}s`);
            }
        });
        
        // 监听开场动画结束事件
        introVideoRef.value.addEventListener('ended', handleIntroEnd);
        
        // 确保视频能够播放
        introVideoRef.value.play().catch(error => {
            console.error('开场视频播放失败:', error);
            // 如果自动播放失败，延迟3秒后自动切换
            setTimeout(() => {
                console.log('开场视频播放失败，自动切换到主界面');
                handleIntroEnd();
            }, 3000);
        });
    } else {
        console.error('开场视频元素未找到');
        // 如果视频元素不存在，直接切换
        setTimeout(handleIntroEnd, 2000);
    }
}

function onIntroEnded() {
    console.log('开场动画播放完毕，切换到主界面');
    
    // 开场动画结束，切换到主背景并显示装饰元素
    currentPhase.value = 'main';
    
    // 延迟一点时间再显示装饰元素，让背景视频先稳定
    setTimeout(() => {
        showDecorations.value = true;
        
        // 启动装饰元素动画
        nextTick(() => {
            initDecorationAnimations();
            
            // 通知其他组件页面加载完成
            const event = new CustomEvent('pageLoaded');
            window.dispatchEvent(event);
        });
    }, 500);
    
    // 清理事件监听器
    if (introVideoRef.value) {
        introVideoRef.value.removeEventListener('ended', handleIntroEnd);
    }
}

function handleIntroEnd() {
    const playedTime = Date.now() - introStartTime;
    console.log(`开场动画播放时长: ${playedTime}ms`);
    
    // 确保至少播放了最小时间
    const remainingTime = Math.max(0, minPlayTime - playedTime);
    
    if (remainingTime > 0) {
        console.log(`等待剩余时间: ${remainingTime}ms 以确保开场动画充分展示`);
        setTimeout(() => {
            onIntroEnded();
        }, remainingTime);
    } else {
        onIntroEnded();
    }
}

function initDecorationAnimations() {
    // 创建装饰元素动画时间线
    animationTimeline = gsap.timeline();
    
    // 星星闪烁动画
    animationTimeline.to('.decoration-star', {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // 粒子漂浮动画
    animationTimeline.to('.floating-particle', {
        opacity: 0.8,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.5");
    
    // 光环脉冲动画
    animationTimeline.to('.pulse-ring', {
        opacity: 0.6,
        scale: 1.2,
        duration: 2,
        ease: "power2.out"
    }, "-=1");
    
    // 启动持续动画
    startContinuousAnimations();
}

function startContinuousAnimations() {
    // 星星持续闪烁
    gsap.to('.decoration-star', {
        opacity: 0.3,
        duration: 2,
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
        ease: "power2.inOut"
    });
    
    // 粒子漂浮
    gsap.to('.floating-particle', {
        y: -20,
        x: 10,
        rotation: 360,
        duration: 4,
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
        ease: "power1.inOut"
    });
    
    // 光环脉冲
    gsap.to('.pulse-ring', {
        scale: 1.5,
        opacity: 0.2,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
    });
}

onMounted(() => {
    window.addEventListener('pageLoaded', handlePageLoadComplete);
});

// 在组件卸载前清理
onBeforeUnmount(() => {
    window.removeEventListener('pageLoaded', handlePageLoadComplete);
    
    // 清理视频事件监听器
    if (introVideoRef.value) {
        introVideoRef.value.removeEventListener('ended', handleIntroEnd);
    }
    
    if (animationTimeline) {
        animationTimeline.kill();
    }
});
</script>

<template>
    <div ref="containerRef" class="center-container">
        <!-- 背景视频层 - 全屏循环播放 -->
        <div class="background-layer">
            <video 
                ref="backgroundVideoRef"
                class="fullscreen-video" 
                loop 
                muted
                autoplay
                playsinline
                preload="auto"
            >
                <source src="@/assets/images/redCore/bg.mp4" type="video/mp4">
            </video>
        </div>
        
        <!-- 开场动画视频层 -->
        <div 
            class="intro-layer" 
            :class="{ 'active': currentPhase === 'intro' }"
        >
            <video 
                ref="introVideoRef"
                class="fullscreen-video" 
                muted 
                playsinline
                preload="auto"
                :controls="false"
            >
                <source src="@/assets/images/redCore/ini.mp4" type="video/mp4">
            </video>
        </div>
        
        <!-- 红色装饰元素层 -->
        <div 
            class="decorations-layer"
            :class="{ 'active': showDecorations }"
        >
            <!-- 星星装饰 -->
            <div class="decoration-star star-1">⭐</div>
            <div class="decoration-star star-2">✦</div>
            <div class="decoration-star star-3">★</div>
            <div class="decoration-star star-4">✧</div>
            <div class="decoration-star star-5">⋆</div>
            
            <!-- 党徽装饰 -->
            <div class="party-symbol symbol-1">🚩</div>
            <div class="party-symbol symbol-2">🎯</div>
            
            <!-- 漂浮粒子 -->
            <div class="floating-particle particle-1"></div>
            <div class="floating-particle particle-2"></div>
            <div class="floating-particle particle-3"></div>
            <div class="floating-particle particle-4"></div>
            <div class="floating-particle particle-5"></div>
            
            <!-- 脉冲光环 -->
            <div class="pulse-ring ring-1"></div>
            <div class="pulse-ring ring-2"></div>
            <div class="pulse-ring ring-3"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.center-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #000;
}

// 背景视频层 - 始终播放
.background-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

// 开场动画层
.intro-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    opacity: 1;
    transition: opacity 0.8s ease-out; /* 稍微放慢切换速度 */
    background: rgba(0, 0, 0, 0.9); /* 添加黑色背景确保对比 */
    
    &:not(.active) {
        opacity: 0;
        pointer-events: none;
    }
    
    &.active {
        opacity: 1;
    }
}

// 装饰元素层
.decorations-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    pointer-events: none;
    
    &.active {
        opacity: 1;
    }
}

.fullscreen-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
}

// 星星装饰样式
.decoration-star {
    position: absolute;
    font-size: 24px;
    color: #dc2626;
    opacity: 0;
    transform: scale(0.5);
    filter: drop-shadow(0 0 8px #dc2626);
    animation: twinkle 3s infinite;
    
    &.star-1 {
        top: 15%;
        left: 20%;
        font-size: 32px;
        animation-delay: 0s;
    }
    
    &.star-2 {
        top: 25%;
        right: 25%;
        font-size: 28px;
        animation-delay: 0.5s;
    }
    
    &.star-3 {
        bottom: 30%;
        left: 15%;
        font-size: 36px;
        animation-delay: 1s;
    }
    
    &.star-4 {
        bottom: 20%;
        right: 20%;
        font-size: 24px;
        animation-delay: 1.5s;
    }
    
    &.star-5 {
        top: 40%;
        left: 50%;
        transform: translateX(-50%) scale(0.5);
        font-size: 30px;
        animation-delay: 2s;
    }
}

// 党徽装饰
.party-symbol {
    position: absolute;
    font-size: 28px;
    opacity: 0;
    filter: drop-shadow(0 0 10px #dc2626);
    animation: float 4s ease-in-out infinite;
    
    &.symbol-1 {
        top: 10%;
        left: 10%;
        animation-delay: 0s;
    }
    
    &.symbol-2 {
        bottom: 15%;
        right: 10%;
        animation-delay: 2s;
    }
}

// 漂浮粒子
.floating-particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #dc2626 0%, #ef4444 50%, transparent 100%);
    border-radius: 50%;
    opacity: 0;
    box-shadow: 0 0 12px #dc2626;
    
    &.particle-1 {
        top: 20%;
        left: 30%;
    }
    
    &.particle-2 {
        top: 60%;
        right: 30%;
    }
    
    &.particle-3 {
        bottom: 40%;
        left: 40%;
    }
    
    &.particle-4 {
        top: 35%;
        right: 15%;
    }
    
    &.particle-5 {
        bottom: 25%;
        left: 60%;
    }
}

// 脉冲光环
.pulse-ring {
    position: absolute;
    border: 2px solid rgba(220, 38, 38, 0.6);
    border-radius: 50%;
    opacity: 0;
    transform: scale(0.8);
    
    &.ring-1 {
        top: 30%;
        left: 25%;
        width: 80px;
        height: 80px;
    }
    
    &.ring-2 {
        bottom: 35%;
        right: 30%;
        width: 60px;
        height: 60px;
    }
    
    &.ring-3 {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        width: 100px;
        height: 100px;
    }
}

// 动画定义
@keyframes twinkle {
    0%, 100% {
        opacity: 0.3;
        transform: scale(0.8);
    }
    50% {
        opacity: 1;
        transform: scale(1.2);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.6;
    }
    50% {
        transform: translateY(-10px) rotate(180deg);
        opacity: 1;
    }
}

// 硬件加速优化
.decorations-layer,
.fullscreen-video {
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: opacity, transform;
}

.center-container {
    transform: translateZ(0);
    backface-visibility: hidden;
}
</style>